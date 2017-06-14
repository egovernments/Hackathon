package com.iiitb.egov;

import android.Manifest;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.Location;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.v4.content.FileProvider;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.OnProgressListener;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.iiitb.egov.ApiHandlers.CloudantApiHandler;
import com.iiitb.egov.ApiHandlers.LocationApiHandler;
import com.iiitb.egov.ApiHandlers.WatsonApiHandler;
import com.iiitb.egov.base.BaseAppCompatActivity;
import com.iiitb.egov.base.BaseConstants;
import com.iiitb.egov.bottomsheet.SelectImageUsingBottomSheet;
import com.iiitb.egov.service.LocationService;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import butterknife.BindView;
import cz.msebera.android.httpclient.Header;
import cz.msebera.android.httpclient.entity.StringEntity;
import pub.devrel.easypermissions.AppSettingsDialog;
import pub.devrel.easypermissions.EasyPermissions;

public class MainActivity extends BaseAppCompatActivity implements EasyPermissions.PermissionCallbacks, SelectImageUsingBottomSheet.OnSelectUsingListener {

    // extras for camera
    Button btnCamera;
    String imageFileName;
    @BindView(R.id.ivImage)
    ImageView mImageView;

    // for firebase
    private StorageReference mStorageRef;
    private Uri mUploadImageUri;
    private Button btnUploadImage;

    private BroadcastReceiver mBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (action.equals(LocationService.ACTION_LOCATION_UPDATE)) {
                Bundle bundle = intent.getExtras();
                Location location = bundle.getParcelable(LocationService.ARG_LOCATION);
                showToast("Latitude: " + location.getLatitude() + "\n" + "Longitude: " + location.getLongitude());
                uploadFile(mUploadImageUri);
            }
        }
    };


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mStorageRef = FirebaseStorage.getInstance().getReference();

        btnCamera = (Button) findViewById(R.id.btnSelectImage);
        btnCamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                checkStoragePermission();
            }
        });

        btnUploadImage = (Button) findViewById(R.id.btnUploadImage);
        btnUploadImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                checkLocationPermission();
                uploadFile(mUploadImageUri);
            }
        });
    }


    private void checkLocationPermission() {
        String[] perms = {Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION};
        if (EasyPermissions.hasPermissions(this, perms)) {
            // Already have permission, do the thing
            initializeSingleLocation();
        } else {
            // Do not have permissions, request them now
            EasyPermissions.requestPermissions(this, getString(R.string.rationale_location), BaseConstants.REQUEST_CODE_PERMISSION_LOCATION, perms);
        }
    }

    private void initializeSingleLocation() {
        LocationService.startServiceForSingleLocation(this);
    }

    @Override
    protected int getLayoutResource() {
        return R.layout.activity_main;
    }

    private void uploadFile(Uri uri) {

        final JSONObject cloudant = new JSONObject();

        // actual code for uploading to Firebase
        StorageReference uploadStorageReference = mStorageRef.child(uri.getLastPathSegment());
        final UploadTask uploadTask = uploadStorageReference.putFile(uri);
        showHorizontalProgressDialog("Uploading", "Please wait...");
        uploadTask
                .addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                    @Override
                    public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                        hideProgressDialog();
                        Uri downloadUrl = taskSnapshot.getDownloadUrl();
                        Log.d("MainActivity", downloadUrl.toString());
                        try {
                            cloudant.put("imageUrl", downloadUrl.toString());
                            uploadToCloudant(cloudant);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                        Glide.with(MainActivity.this)
                                .load(downloadUrl)
                                .into(mImageView);
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception exception) {
                        exception.printStackTrace();
                        // Handle unsuccessful uploads
                        hideProgressDialog();
                    }
                })
                .addOnProgressListener(MainActivity.this, new OnProgressListener<UploadTask.TaskSnapshot>() {
                    @Override
                    public void onProgress(UploadTask.TaskSnapshot taskSnapshot) {
                        int progress = (int) (100 * (float) taskSnapshot.getBytesTransferred() / taskSnapshot.getTotalByteCount());
                        Log.i("Progress", progress + "");
                        updateProgress(progress);
                    }
                });
    }

    public void uploadToCloudant(final JSONObject cloudant) throws JSONException {

        cloudant.put("status","pending");

        JSONObject location = new JSONObject();
        location.put("latitude","12.8474");
        location.put("longitude","77.6583");
        cloudant.put("location", location);
        cloudant.put("area", "Electronic city");

        Log.i("final cloudant", cloudant.toString(2));
        StringEntity entity = null;
        try {
            entity = new StringEntity(cloudant.toString());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        CloudantApiHandler.post(getApplicationContext(), "issues", entity, "application/json",new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                Log.i("ISSUE POST","Got JSON response");
                try {
                    Log.d("Object::::",response.toString(2));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

    }

    private void checkStoragePermission() {
        String[] perms = {android.Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE};
        if (EasyPermissions.hasPermissions(this, perms)) {
            // Already have permission, do the thing
            initializeSelectImage();
        } else {
            // Do not have permissions, request them now
            EasyPermissions.requestPermissions(this, getString(R.string.rationale_storage),
                    BaseConstants.REQUEST_CODE_PERMISSION_STORAGE, perms);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        // Forward results to EasyPermissions
        EasyPermissions.onRequestPermissionsResult(requestCode, permissions, grantResults, this);
    }

    @Override
    public void onPermissionsGranted(int requestCode, List<String> perms) {
        if (requestCode == BaseConstants.REQUEST_CODE_PERMISSION_STORAGE) {
            initializeSelectImage();
        } else if (requestCode == BaseConstants.REQUEST_CODE_PERMISSION_LOCATION) {
            initializeSingleLocation();
        }
    }

    @Override
    public void onPermissionsDenied(int requestCode, List<String> perms) {
        if (EasyPermissions.somePermissionPermanentlyDenied(this, perms)) {
            if (requestCode == BaseConstants.REQUEST_CODE_PERMISSION_STORAGE) {
                new AppSettingsDialog.Builder(this, getString(R.string.rationale_never_ask_storage))
                        .setTitle(getString(R.string.title_settings_dialog))
                        .setPositiveButton(getString(R.string.title_settings_button_setting))
                        .setNegativeButton(getString(R.string.title_settings_button_cancel), null /* click listener */)
                        .setRequestCode(BaseConstants.REQUEST_CODE_SETTINGS_PERMISSION_STORAGE)
                        .build()
                        .show();
            } else if (requestCode == BaseConstants.REQUEST_CODE_PERMISSION_LOCATION) {
                new AppSettingsDialog.Builder(this, getString(R.string.rationale_never_ask_location))
                        .setTitle(getString(R.string.title_settings_dialog))
                        .setPositiveButton(getString(R.string.title_settings_button_setting))
                        .setNegativeButton(getString(R.string.title_settings_button_cancel), null /* click listener */)
                        .setRequestCode(BaseConstants.REQUEST_CODE_SETTINGS_PERMISSION_LOCATION)
                        .build()
                        .show();
            }
        }
    }

    public void initializeSelectImage() {
        showDialogFragment(new SelectImageUsingBottomSheet());
    }

    public void pickImage() {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("image/*");
        startActivityForResult(intent, BaseConstants.REQUEST_CODE_PICK_IMAGE);
    }

    @Override
    public void onCameraClick() {
        captureImage();
    }

    @Override
    public void onGalleryClick() {
        pickImage();
    }

    private void captureImage() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        // Ensure that there's a camera activity to handle the intent
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            // Create the File where the photo should go
            File photoFile = null;
            try {
                photoFile = createImageFile();
            } catch (IOException ex) {
                // Error occurred while creating the File

            }
            // Continue only if the File was successfully created
            if (photoFile != null) {
                mUploadImageUri = FileProvider.getUriForFile(this, "com.iiitb.egov", photoFile);
                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, mUploadImageUri);
                startActivityForResult(takePictureIntent, BaseConstants.REQUEST_CODE_CAPTURE_IMAGE);
            }
        }
    }

    private File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        File image = File.createTempFile(
                imageFileName, /* prefix */
                ".jpg",/* suffix */
                storageDir/* directory */
        );
        return image;
    }

    private void galleryAddPic() {
        Intent mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        mediaScanIntent.setData(mUploadImageUri);
        this.sendBroadcast(mediaScanIntent);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == BaseConstants.REQUEST_CODE_CAPTURE_IMAGE && resultCode == RESULT_OK) {
            galleryAddPic();
            Glide.with(MainActivity.this)
                    .load(mUploadImageUri)
                    .into(mImageView);
        } else if (requestCode == BaseConstants.REQUEST_CODE_SETTINGS_PERMISSION_STORAGE) {
            checkStoragePermission();
        } else if (requestCode == BaseConstants.REQUEST_CODE_SETTINGS_PERMISSION_LOCATION) {
            checkLocationPermission();
        } else if (requestCode == BaseConstants.REQUEST_CODE_PICK_IMAGE && resultCode == RESULT_OK) {
            if (data != null) {
                mUploadImageUri = data.getData();
                Glide.with(MainActivity.this)
                        .load(mUploadImageUri)
                        .into(mImageView);
            }
        }
    }


    @Override
    protected void onStart() {
        super.onStart();
        registerBroadCastReceiver();
    }

    private void registerBroadCastReceiver() {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(LocationService.ACTION_LOCATION_UPDATE);
        LocalBroadcastManager.getInstance(this).registerReceiver(mBroadcastReceiver, intentFilter);
    }

    @Override
    protected void onStop() {
        super.onStop();
        unRegisterBroadCastReceiver();
    }

    private void unRegisterBroadCastReceiver() {
        LocalBroadcastManager.getInstance(this).unregisterReceiver(mBroadcastReceiver);
    }
}

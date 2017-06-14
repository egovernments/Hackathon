package com.iiitb.egov.base;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.app.AppCompatDialogFragment;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Toast;

import butterknife.ButterKnife;


public abstract class BaseAppCompatActivity extends AppCompatActivity {

    protected int DEFAULT_REQUEST_CODE = 100;

    private ProgressDialog mProgressDialog;

    private int FRAGMENT_TRANSACTION_ADD = 200;
    private int FRAGMENT_TRANSACTION_REPLACE = 300;

    public void finishWithResultOk() {
        finishWithResultOk(null);
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(getLayoutResource());
        ButterKnife.bind(this);
    }

    protected abstract int getLayoutResource();

    public void launchActivity(Intent intent) {
        launchActivity(intent, false);
    }

    public void launchActivity(Intent intent, boolean finishCurrent) {
        launchActivity(intent, DEFAULT_REQUEST_CODE, finishCurrent);
    }

    public void launchActivity(Intent intent, int requestCode, boolean finishCurrent) {
        if (requestCode != DEFAULT_REQUEST_CODE) {
            startActivityForResult(intent, requestCode);
        } else {
            if (finishCurrent) {
                finish();
            }
            startActivity(intent);
        }
    }

    public void showDialogFragment(AppCompatDialogFragment appCompatDialogFragment) {
        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        fragmentTransaction.add(appCompatDialogFragment, appCompatDialogFragment.getClass().getSimpleName());
        fragmentTransaction.commitAllowingStateLoss();
    }

    public void showDialogFragment(BaseFragment targetFragment, BaseDialogFragment appCompatDialogFragment, int requestCode) {
        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        appCompatDialogFragment.setTargetFragment(targetFragment, requestCode);
        fragmentTransaction.add(appCompatDialogFragment, appCompatDialogFragment.getClass().getSimpleName());
        fragmentTransaction.commitAllowingStateLoss();
    }

    protected void hideKeyboard() {
        View view = this.getCurrentFocus();
        if (view != null) {
            InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
        }
    }

    public void showToast(int resourceId) {
        Toast.makeText(this, resourceId, Toast.LENGTH_SHORT).show();
    }

    public void showToast(String resource) {
        Toast.makeText(this, resource, Toast.LENGTH_SHORT).show();
    }

    public void startApiService(Intent intent) {
        startService(intent);
    }

    private void finishWithResultOk(Intent intent) {
        if (intent == null)
            setResult(RESULT_OK);
        else
            setResult(RESULT_OK, intent);
        finish();
    }

    protected void finishWithResultCancel() {
        finishWithResultCancel(null);
    }

    protected void finishWithResultCancel(Intent intent) {
        if (intent == null)
            setResult(RESULT_CANCELED);
        else
            setResult(RESULT_CANCELED, intent);
        finish();
    }

    private void showProgressDialog(String title, String message) {

        if (mProgressDialog != null && mProgressDialog.isShowing())

            mProgressDialog.setMessage(message);

        else

            mProgressDialog = ProgressDialog.show(this, title, message, true, false);

    }

    protected void hideProgressDialog() {

        if (mProgressDialog != null && mProgressDialog.isShowing()) {

            mProgressDialog.dismiss();

        }

    }

    public void showHorizontalProgressDialog(String title, String body) {


        if (mProgressDialog != null && mProgressDialog.isShowing()) {

            mProgressDialog.setTitle(title);

            mProgressDialog.setMessage(body);

        } else {

            mProgressDialog = new ProgressDialog(this);

            mProgressDialog.setTitle(title);

            mProgressDialog.setMessage(body);

            mProgressDialog.setIndeterminate(false);

            mProgressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);

            mProgressDialog.setProgress(0);

            mProgressDialog.setMax(100);

            mProgressDialog.setCancelable(false);

            mProgressDialog.show();

        }

    }

    public void updateProgress(int progress) {

        if (mProgressDialog != null && mProgressDialog.isShowing()) {

            mProgressDialog.setProgress(progress);

        }

    }
}

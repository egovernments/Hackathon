package com.iiitb.egov.service;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.content.LocalBroadcastManager;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;

public class LocationService extends Service implements GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener, LocationListener {

    public static final String ACTION_LOCATION_UPDATE = "LocationUpdate";
    public static final String ARG_LOCATION = "Location";
    private static final String ACTION_START_SINGLE_LOCATION = "SingleLocation";
    private static final String ACTION_START_CONTINUOUS_LOCATION = "StartContinuousLocation";
    private static final String ACTION_STOP_CONTINUOUS_LOCATION = "StopContinuousLocation";
    private GoogleApiClient mGoogleApiClient;
    private String mAction;

    public LocationService() {
    }

    public static void startServiceForSingleLocation(Context context) {
        Intent intent = new Intent(ACTION_START_SINGLE_LOCATION);
        intent.setClass(context, LocationService.class);
        context.startService(intent);
    }

    public static void startServiceForContinuousLocation(Context context) {
        Intent intent = new Intent(ACTION_START_CONTINUOUS_LOCATION);
        intent.setClass(context, LocationService.class);
        context.startService(intent);
    }

    public static void stopServiceForContinuousLocation(Context context) {
        Intent intent = new Intent(ACTION_STOP_CONTINUOUS_LOCATION);
        intent.setClass(context, LocationService.class);
        context.stopService(intent);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        buildGoogleApiClient();
    }

    protected synchronized void buildGoogleApiClient() {
        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .addApi(LocationServices.API)
                .build();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        stopLocationUpdates();

        if (mGoogleApiClient != null && mGoogleApiClient.isConnected()) {
            mGoogleApiClient.disconnect();
        }
    }

    private Location getLastKnownLocation() {
        return LocationServices.FusedLocationApi.getLastLocation(mGoogleApiClient);
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public void onConnected(@Nullable Bundle bundle) {
        if (mAction.equals(ACTION_START_SINGLE_LOCATION)) {
            getSingleLocation();
        } else {
            getContinuousLocation();
        }
    }

    private void getContinuousLocation() {
        startLocationUpdates();
    }

    private void getSingleLocation() {
        Location location = getLastKnownLocation();
        if (location == null) {
            startLocationUpdates();
        } else {
            sendLocationBroadcast(location);
        }
    }

    protected void startLocationUpdates() {
        LocationRequest mLocationRequest = new LocationRequest();
        mLocationRequest.setInterval(10000);
        mLocationRequest.setFastestInterval(5000);
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        LocationServices.FusedLocationApi.requestLocationUpdates(mGoogleApiClient, mLocationRequest, this);
    }

    private void stopLocationUpdates() {
        LocationServices.FusedLocationApi.removeLocationUpdates(mGoogleApiClient, this);
    }

    @Override
    public void onConnectionSuspended(int i) {

    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {

    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        mAction = intent.getAction();
        mGoogleApiClient.connect();
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onLocationChanged(Location location) {
        sendLocationBroadcast(location);
        if (mAction.equals(ACTION_START_SINGLE_LOCATION)) {
            stopEveryThing();
        }
    }

    private void stopEveryThing() {
        stopLocationUpdates();
        stopSelf();
    }

    private void sendLocationBroadcast(Location location) {
        Intent intent = new Intent(ACTION_LOCATION_UPDATE);
        Bundle bundle = new Bundle();
        bundle.putParcelable(ARG_LOCATION, location);
        intent.putExtras(bundle);
        LocalBroadcastManager.getInstance(this).sendBroadcast(intent);
    }
}

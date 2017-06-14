package com.iiitb.egov.base;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatDialogFragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import butterknife.ButterKnife;

public abstract class BaseFragment extends Fragment {

    protected BaseAppCompatActivity mBaseAppCompatActivity;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        View view = inflater.inflate(getResourceLayout(), container, false);
        ButterKnife.bind(this, view);
        return view;
    }

    protected abstract int getResourceLayout();

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        mBaseAppCompatActivity = (BaseAppCompatActivity) context;
    }

    protected void launchActivity(Intent intent) {
        mBaseAppCompatActivity.launchActivity(intent);
    }

    public void launchActivity(Intent intent, boolean finishCurrent) {
        launchActivity(intent, mBaseAppCompatActivity.DEFAULT_REQUEST_CODE, finishCurrent);
    }

    protected void launchActivity(Intent intent, int requestCode, boolean finishCurrent) {
        mBaseAppCompatActivity.launchActivity(intent, requestCode, finishCurrent);
    }

    public void showDialogFragment(AppCompatDialogFragment appCompatDialogFragment) {
        mBaseAppCompatActivity.showDialogFragment(appCompatDialogFragment);
    }

    public void showDialogFragment(BaseFragment targetFragment, BaseDialogFragment appCompatDialogFragment) {
        mBaseAppCompatActivity.showDialogFragment(targetFragment, appCompatDialogFragment, mBaseAppCompatActivity.DEFAULT_REQUEST_CODE);
    }

    protected void showToast(String message) {
        mBaseAppCompatActivity.showToast(message);
    }
}

package com.iiitb.egov.base;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatDialogFragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import butterknife.ButterKnife;

/**
 * Created by chint on 13-02-2016.
 */
public abstract class BaseDialogFragment extends AppCompatDialogFragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(getLayoutResource(), null);
        ButterKnife.bind(this, view);
        return view;
    }

    protected abstract int getLayoutResource();

    protected void hideKeyBoard() {
        ((BaseAppCompatActivity) getActivity()).hideKeyboard();
    }

    public void showDialogFragment(AppCompatDialogFragment appCompatDialogFragment) {
        ((BaseAppCompatActivity) getActivity()).showDialogFragment(appCompatDialogFragment);
    }

    public void launchActivity(Intent intent, int requestCode) {
        ((BaseAppCompatActivity) getActivity()).launchActivity(intent, requestCode, false);
    }

    public void showToast(int resourceId) {
        ((BaseAppCompatActivity) getActivity()).showToast(resourceId);
    }
}

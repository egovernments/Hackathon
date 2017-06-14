package com.iiitb.egov.bottomsheet;

import android.content.Context;

import com.iiitb.egov.R;
import com.iiitb.egov.base.BaseBottomSheetDialogFragment;

import butterknife.OnClick;

public class SelectImageUsingBottomSheet extends BaseBottomSheetDialogFragment {

    private OnSelectUsingListener mOnSelectUsingListener;

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnSelectUsingListener)
            mOnSelectUsingListener = (OnSelectUsingListener) context;
    }

    @OnClick(R.id.btn_bottom_sheet_select_image_using_camera)
    void onCameraClick() {
        if (mOnSelectUsingListener != null)
            mOnSelectUsingListener.onCameraClick();
        dismiss();
    }

    @OnClick(R.id.btn_bottom_sheet_select_image_using_gallery)
    void onGalleryClick() {
        if (mOnSelectUsingListener != null)
            mOnSelectUsingListener.onGalleryClick();
        dismiss();
    }

    @Override
    protected int getLayoutResource() {
        return R.layout.bottom_sheet_select_image_using;
    }

    public interface OnSelectUsingListener {
        void onCameraClick();

        void onGalleryClick();
    }
}

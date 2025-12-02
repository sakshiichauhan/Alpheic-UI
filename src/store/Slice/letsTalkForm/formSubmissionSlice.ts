import { createSlice } from '@reduxjs/toolkit';
import { submitConsultingForm } from '@/store/Slice/letsTalkForm/consultingThunk';
import { submitInquiryForm } from '@/store/Slice/letsTalkForm/inquiryThunk';
import { submitSupportForm } from '@/store/Slice/letsTalkForm/supportThunk';

interface FormSubmissionState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: FormSubmissionState = {
  loading: false,
  error: null,
  success: false,
};

const formSubmissionSlice = createSlice({
  name: 'formSubmission',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    resetFormState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Consulting form
    builder
      .addCase(submitConsultingForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitConsultingForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(submitConsultingForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });

    // Inquiry form
    builder
      .addCase(submitInquiryForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitInquiryForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(submitInquiryForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });

    // Support form
    builder
      .addCase(submitSupportForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitSupportForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(submitSupportForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { clearError, clearSuccess, resetFormState } = formSubmissionSlice.actions;
export default formSubmissionSlice.reducer;


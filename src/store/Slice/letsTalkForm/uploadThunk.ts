import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';

export interface UploadFileResponse {
  message: {
    file_url: string;
    file_name: string;
  };
}

export const uploadFile = createAsyncThunk(
  'form/uploadFile',
  async (file: File, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('is_private', '0');
      formData.append('folder', 'Home');

      const response = await fetch('/api/method/uploadfile', {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to upload file: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to upload file'
      );
    }
  }
);


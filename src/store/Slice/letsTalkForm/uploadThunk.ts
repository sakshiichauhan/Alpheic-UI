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
      // Frappe expects 'file' as the field name for file uploads
      formData.append('file', file);
      formData.append('is_private', '0');
      formData.append('folder', 'Home');

      // Use Frappe's standard file upload endpoint through the proxy
      const response = await fetch('/api/method/upload_file', {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          // Don't set Content-Type - browser will set it automatically with boundary for FormData
        },
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = `Failed to upload file: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error?.message || errorData.exc || errorMessage;
          console.error('Upload error details:', errorData);
        } catch (e) {
          // If response is not JSON, try to get text
          try {
            const errorText = await response.text();
            if (errorText) {
              errorMessage = `Failed to upload file: ${errorText}`;
            }
            console.error('Upload error response:', errorText);
          } catch (textError) {
            console.error('Could not parse error response');
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      // Handle different response formats
      if (data.message) {
        return data.message;
      } else if (data.file_url || data.file_name) {
        return data;
      } else {
        return data;
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to upload file'
      );
    }
  }
);


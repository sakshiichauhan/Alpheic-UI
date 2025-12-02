import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';

export interface ConsultingFormData {
  full_name: string;
  email_address: string;
  country_code: string;
  phone_number: string;
  company_name: string;
  message: string;
  select_services: string[];
  attachments?: string[];
}

export const submitConsultingForm = createAsyncThunk(
  'form/submitConsulting',
  async (formData: ConsultingFormData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch(
        '/api/resource/LetsTalkForm Consulting',
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to submit form: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to submit consulting form'
      );
    }
  }
);
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import servicesReducer from './Slice/letsTalkForm/services';
import formSubmissionReducer from './Slice/letsTalkForm/formSubmissionSlice';
import servicePageReducer from './Slice/UxDesgin/UxDesgin';

const rootReducer = combineReducers({
  auth: authReducer,
  services: servicesReducer,
  formSubmission: formSubmissionReducer,
  servicePage: servicePageReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;


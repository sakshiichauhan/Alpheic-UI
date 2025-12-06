import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import servicesReducer from './Slice/letsTalkForm/services';
import formSubmissionReducer from './Slice/letsTalkForm/formSubmissionSlice';
import servicePageReducer from './Slice/UxDesgin/UxDesgin';
import designPageL2Reducer from './Slice/UxDesgin/DesginPageThunk';
import servicePageL1Reducer from './Slice/UxDesgin/ServiceThunk';

const rootReducer = combineReducers({
  auth: authReducer,
  services: servicesReducer,
  formSubmission: formSubmissionReducer,
  servicePage: servicePageReducer,
  designPageL2: designPageL2Reducer,
  servicePageL1: servicePageL1Reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;


import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import servicesReducer from './Slice/letsTalkForm/services';
import formSubmissionReducer from './Slice/letsTalkForm/formSubmissionSlice';
import servicePageReducer from './Slice/UxDesgin/UxDesgin';
import designPageL2Reducer from './Slice/UxDesgin/DesginPageThunk';
import servicePageL1Reducer from './Slice/UxDesgin/ServiceThunk';
import caseStudyReducer from './Slice/CaseStudy/CaseStudyThunk';
import latestInsightsReducer from './Slice/LatestInsights/LatestInsightThunk';

const rootReducer = combineReducers({
  auth: authReducer,
  services: servicesReducer,
  formSubmission: formSubmissionReducer,
  servicePage: servicePageReducer,
  designPageL2: designPageL2Reducer,
  servicePageL1: servicePageL1Reducer,
  caseStudy: caseStudyReducer,
  latestInsights: latestInsightsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;


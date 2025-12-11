import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import servicesReducer from './Slice/letsTalkForm/services';
import formSubmissionReducer from './Slice/letsTalkForm/formSubmissionSlice';
import servicePageReducer from './Slice/UxDesgin/UxDesgin';
import designPageL2Reducer from './Slice/UxDesgin/DesginPageThunk';
import servicePageL1Reducer from './Slice/UxDesgin/ServiceThunk';
import caseStudyReducer from './Slice/CaseStudy/CaseStudyThunk';
import latestInsightsReducer from './Slice/LatestInsights/LatestInsightThunk';
import technologyPageReducer from './Slice/IndustryPage/TechnologyPageThunk';
import industryPageReducer from './Slice/IndustryPage/IndustryThunk';
import brandClientReducer from './Slice/BrandClientThunk';
import pilotPageReducer from './Slice/Pilot/PilotPageThunk';
import pilotReducer from './Slice/Pilot/PilotThunk';
import subPilotReducer from './Slice/Pilot/SubPilotThunk';

const rootReducer = combineReducers({
  auth: authReducer,
  services: servicesReducer,
  formSubmission: formSubmissionReducer,
  servicePage: servicePageReducer,
  designPageL2: designPageL2Reducer,
  servicePageL1: servicePageL1Reducer,
  caseStudy: caseStudyReducer,
  latestInsights: latestInsightsReducer,
  technologyPage: technologyPageReducer,
  industryPage: industryPageReducer,
  brandClient: brandClientReducer,
  pilotPage: pilotPageReducer,
  pilot: pilotReducer,
  subPilot: subPilotReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;


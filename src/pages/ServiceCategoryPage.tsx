import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchServicePageL1Data } from "@/store/Slice/UxDesgin/ServiceThunk";
import { fetchDesignPageL2Data } from "@/store/Slice/UxDesgin/DesginPageThunk";
import { cleanNameForUrl } from "@/utils/urlMapping";
import { DesignPage } from "@/pages/DesignPage";
// Future service category pages can be imported here:
// import { BuildPage } from "@/pages/BuildPage";
// import { HostPage } from "@/pages/HostPage";

/**
 * Dynamic Service Category Page Component
 * Handles routing for /Services/:servicename
 * Maps cleaned URL service name back to original name for API calls
 */
export const ServiceCategoryPage = () => {
  const { servicename } = useParams<{ servicename?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data: servicePageL1Data } = useSelector((state: RootState) => state.servicePageL1);
  const { data: designPageL2Data, loading, serviceName: fetchedServiceName } = useSelector((state: RootState) => state.designPageL2);

  // Fetch service page L1 data if not loaded (needed for mapping)
  useEffect(() => {
    if (!servicePageL1Data && !loading) {
      dispatch(fetchServicePageL1Data());
    }
  }, [dispatch, servicePageL1Data, loading]);

  // Map cleaned URL service name back to original service name for API calls
  const currentServiceName = useMemo(() => {
    if (!servicename) return 'Design'; // Default to Design
    
    // Get list of original service category names from Redux
    const serviceNames = servicePageL1Data?.select_service_categories
      ?.map(cat => cat.select)
      .filter(Boolean) as string[] || [];
    
    // Find original name that matches when cleaned
    const originalName = serviceNames.find(name => 
      cleanNameForUrl(name) === servicename
    );
    
    // If found, use it; otherwise fallback to the cleaned name
    return originalName || servicename;
  }, [servicename, servicePageL1Data]);

  // Fetch service page L2 data when service name changes
  useEffect(() => {
    if (!designPageL2Data || fetchedServiceName !== currentServiceName) {
      if (!loading && currentServiceName) {
        dispatch(fetchDesignPageL2Data(currentServiceName));
      }
    }
  }, [dispatch, designPageL2Data, fetchedServiceName, loading, currentServiceName]);

  // For now, only Design is supported
  // In the future, you can add conditional rendering based on currentServiceName:
  // if (currentServiceName === 'Build') return <BuildPage />;
  // if (currentServiceName === 'Host') return <HostPage />;
  
  return <DesignPage />;
};


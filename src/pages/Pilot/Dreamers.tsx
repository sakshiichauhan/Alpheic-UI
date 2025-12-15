import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store";
import { fetchPilots, selectPilots } from "@/store/Slice/Pilot/PilotThunk";
import DreamersHomepage from "@/pages/Dreamers/Homepage";
import WhoItHelpsSection from "@/pages/Dreamers/WhoItHelps";
import OutcomesSection from "@/pages/Dreamers/OutcomesSection";
import DreamerTable from "@/pages/Dreamers/DreamerTable";

export const Dreamers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pilots = useSelector(selectPilots);
  
  // Default pilot names
  const defaultPilotNames = ['Dreamer', 'Startups', 'SMBs', 'Enterprises'];
  
  // Fetch pilots if not loaded (needed for mapping)
  useEffect(() => {
    if (Object.keys(pilots).length === 0) {
      dispatch(fetchPilots(defaultPilotNames));
    }
  }, [dispatch, pilots]);

  return (
    <> 
      <DreamersHomepage />
      <WhoItHelpsSection />
      <OutcomesSection />
      <DreamerTable />
    </>
  );
};



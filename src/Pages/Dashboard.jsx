import Card from "../Atom/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BatteryChart from "../Components/BatteryChart";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [evtols, setEvtols] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/dashboard"
        );

        setDashboardData(response.data);
      } catch (error) {

      }
    };

    const fetchEvtolData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/evtol");
        setEvtols(response.data);
      } catch (error) {

      }
    };

    fetchEvtolData();
    fetchDashboardData();
  }, []);

  if (!dashboardData || !evtols) {
    return (
      <div className="min-h-screen bg-slate-50 grid place-items-center lg:ml-[15rem]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="p-6 bg-slate-50 min-h-screen lg:ml-[15rem] font-poppins">
        <div className="flex justify-between items-center">
          <div className="grid gap-2 align-middle mb-4">
            <span className="text-gray-400 cursor-pointer lg:hidden">
              <MenuIcon />
            </span>
            <h2 className="text-xl font-bold inline">
              Welcome To Evtol Management
            </h2>
          </div>

          <div className="text-md text-gray-500 flex items-center gap-3">
            <CalendarMonthIcon />
            <p>{new Date().toJSON().slice(0, 10)}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-12 gap-3 mt-2">
          <Card
            title="Total EVTOLS"
            color="#774499"
            content={dashboardData.totalEvtols}
          />
          <Card
            title="Available EVTOLS"
            color="#1e90ff"
            content={dashboardData.availableEvtolsCount}
          />
          <Card
            title="Loaded EVTOLS"
            color="#00c000"
            content={dashboardData.loadedEvtols}
          />
          <Card
            title="Total Deliveries"
            color="#FFA600"
            content={dashboardData.totalDeliveries}
          />
        </div>

        <div className="bg-white rounded-lg p-5 mt-5 mx-auto h-96 grid place-items-center">
          <BatteryChart evtols={evtols} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

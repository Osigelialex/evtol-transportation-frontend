import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Link } from "react-router-dom";
import FlightIcon from '@mui/icons-material/Flight';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TbDrone } from "react-icons/tb";

const Sidenav = () => {
  return (
    <>
      <div className="lg:block hidden bg-white text-gray-900 z-20 fixed min-h-screen w-[15rem] border-r-2">
        <div>
          <div className="p-2 h-[100px] flex gap-1 items-center justify-left mx-5">
            <TbDrone className="text-gray-400" style={{ fontSize: "35px" }} />
            <h2 className="text-left text-2xl text-md text-blue-500 p-2 font-extrabold">Evtol</h2>
          </div>
          <hr className="border"/>
          <div className="p-3">
            <Link to="delivery">
              <div className="rounded-md mb-2 flex gap-4 text-left text-sm text-blue-500 bg-[#ADD8E6] p-5 cursor-pointer hover:text-white">
                <AddCircleIcon />
                <h2>New delivery</h2>
              </div>
            </Link>
            <Link to="/">
              <div className="rounded-md mb-2 flex gap-4 text-left text-sm text-gray-500 p-5 cursor-pointer hover:bg-[#ADD8E6] hover:text-white">
                <DashboardIcon />
                <h2>Dashboard</h2>
              </div>
            </Link>
            <Link to="evtol-management">
              <div className="rounded-md mb-2 flex gap-4 text-left text-sm text-gray-500 p-5 cursor-pointer hover:bg-[#ADD8E6] hover:text-white">
                <SettingsIcon />
                <h2>Manage evtols</h2>
              </div>
            </Link>
            <Link to="medications">
              <div className="rounded-md mb-2 flex gap-4 text-left text-sm text-gray-500 p-5 cursor-pointer hover:bg-[#ADD8E6] hover:text-white">
                <MedicalServicesIcon />
                <h2>Medications</h2>
              </div>
            </Link>
            <Link to="load-medications">
              <div className="rounded-md mb-2 flex gap-4 text-left text-sm text-gray-500 p-5 cursor-pointer hover:bg-[#ADD8E6] hover:text-white">
                <FlightIcon />
                <h2>Load EVTOL</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;

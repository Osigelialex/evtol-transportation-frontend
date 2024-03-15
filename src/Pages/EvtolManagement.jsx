import { useState, useEffect } from "react";
import EvtolTable from "../Components/EvtolTable";
import CircularProgress from "@mui/material/CircularProgress";
import EvtolRegistrationForm from "../Components/EvtolRegistrationForm";
import axios from "axios";

const EvtolManagement = () => {
  const [evtols, setEvtols] = useState(null);
  const [registeredNew, setRegisteredNew] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/evtol");

        setEvtols(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [registeredNew]);

  const updateRegisteredNew = () => {
    setRegisteredNew(true);
  };

  if (!evtols) {
    return (
      <div className="min-h-screen bg-slate-50 grid place-items-center lg:ml-[15rem]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="p-6 bg-slate-50 min-h-screen lg:ml-[15rem] font-poppins">
        <div className="flex justify-between items-center align-middle mb-10">
          <h2 className="font-bold text-xl mb-10 inline-block">
            EVTOL Aircrafts
          </h2>
          <EvtolRegistrationForm onRegister={updateRegisteredNew} />
        </div>
        <EvtolTable data={evtols} />
      </div>
    </>
  );
};

export default EvtolManagement;

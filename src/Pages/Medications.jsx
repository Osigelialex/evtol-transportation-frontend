import { useEffect, useState } from "react";
import MedicationTable from "../Components/MedicationsTable";
import CircularProgress from "@mui/material/CircularProgress";
import MedicationForm from "../Components/MedicationForm";
import axios from "axios";


const Medications = () => {
  const [medications, setMedications] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/medications"
        );

        setMedications(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!medications) {
    return (
      <div className="min-h-screen bg-slate-100 grid place-items-center lg:ml-[12rem]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="p-6 bg-slate-50 min-h-screen lg:ml-[15rem] font-poppins">
        <div className="flex justify-between items-center align-middle mb-5">
          <div className="flex gap-3 items-center align-middle">
            <h2 className="font-bold text-xl inline">
              Stored Medications
            </h2>
          </div>
          <MedicationForm />
        </div>
        <MedicationTable data={medications} />
      </div>
    </>
  );
};

export default Medications;

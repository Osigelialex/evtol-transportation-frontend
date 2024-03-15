import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";

const LoadMedications = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [name, setName] = useState("");
  const [medName, setMedName] = useState("");
  const [weight, setWeight] = useState("");
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [medications, setMedications] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/medications`
        );
        setMedications(response.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/api/v1/medications/${serialNumber}/load`,
        {
          name: medName,
          weight,
          code,
        }
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.log(error);
      setHasError(true);
      setErrorMessage(error.response.data.message);
      setTimeout(() => setHasError(false), 3000)
    }
  };

  if (!medications) {
    return (
      <div className="min-h-screen bg-slate-50 grid place-items-center lg:ml-[15rem]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="p-6 bg-slate-50 min-h-screen lg:ml-[15rem] font-poppins">
        <div className="bg-white p-8 w-3/4 mx-auto border-2">
          {success && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Medications loaded successfully
            </Alert>
          )}
          {hasError && (
            <Alert severity="error">
              {errorMessage}
            </Alert>
          )}
          <h2 className="font-bold text-xl mb-10 text-center">
            Load EVTOL with medications
          </h2>
          <form
            className="grid sm:grid-cols-12 gap-3 mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="col-span-12">
              <label htmlFor="address">Serial Number</label>
              <input
                id="address"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                type="text"
                className="p-3 border-2 w-full"
                required
              />
            </div>
            <div className="col-span-12">
              <label htmlFor="name">Medication Name</label>
              <select
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  const parsedData = JSON.parse(e.target.value);
                  setCode(parsedData.code);
                  setWeight(parsedData.weight);
                  setMedName(parsedData.name);
                  setName(e.target.value);
                }}
                className="p-3 border-2 w-full"
                required
              >
                <option value="">Select Medication</option>
                {medications.map((medication) => {
                  return (
                    <option value={JSON.stringify(medication)}>
                      {medication.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-span-12">
              <label htmlFor="weight">Weight</label>
              <div id="weight" className="border p-6 mt-1">
                {weight}
              </div>
            </div>
            <div className="col-span-12 mt-10 grid place-items-center">
              <input
                type="submit"
                value="Load Medications"
                className="bg-[#00c000] text-white p-3 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoadMedications;

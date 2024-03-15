import { useState } from "react";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';

const Register = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [model, setModel] = useState("Lightweight");
  const [weightLimit, setWeightLimit] = useState("");
  const [hasSuccess, setHasSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/v1/evtol/register",
        {
          serialNumber,
          model,
          weightLimit,
        }
      );

      setHasSuccess(true);
      setTimeout(() => setHasSuccess(false), 3000);
    } catch (error) {
      if (error.response) {
        setHasError(true)
        setErrorMessage(error.response.data.message || "An error occurred.");
      } else {
        setErrorMessage("An error occurred during submission.");
      }
      setTimeout(() => setHasError(false), 3000);
    }
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen lg:ml-[12rem] flex justify-center items-center">
      <div className="rounded-lg shadow-md bg-white min-h-screen w-full p-5">
        <div className="flex items-center gap-3">
          <AddIcon />
          <h2 className="text-left text-lg font-bold text-gray-800">
            Register an evtol
          </h2>
        </div>

        <hr className="w-full my-5" />
        {hasError && (
          <div className="bg-red-500 text-center text-white p-3">
            {errorMessage}
          </div>
        )}
        {hasSuccess && (
          <div className="bg-green-500 text-center text-white p-3">
            Successfully registered evtol
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* Serial number input */}
          <label className="text-gray-700 font-medium block text-left">
            Serial Number <span className="text-red-500"> *</span>
          </label>
          <input
            className="w-full p-3 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="minimum length of 7"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            id="serialnumber"
            type="text"
            minLength={7}
            required
          />

          {/* EVTOL model input */}
          <label className="text-gray-700 font-medium block text-left">
            EVTOL model <span className="text-red-500"> *</span>
          </label>
          <select
            className="w-full p-3 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="serialnumber"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          >
            <option value="Lightweight">Lightweight</option>
            <option value="Middleweight">Middleweight</option>
            <option value="Cruiserweight">Cruiserweight</option>
            <option value="Heavyweight">Heavyweight</option>
          </select>

          {/* EVTOL weight limit */}
          <label className="text-gray-700 font-medium block text-left">
            weight limit (500 max) <span className="text-red-500"> *</span>
          </label>
          <input
            className="w-full p-3 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="maximum 500"
            id="weightlimit"
            type="number"
            name="number"
            value={weightLimit}
            onChange={(e) => setWeightLimit(Number(e.target.value))}
            min="1"
            max="500"
            required
          />

          <button
            className="bg-blue-500 p-3 sm:w-1/3 w-full mt-5 rounded-md text-white font-bold shadow-md hover:bg-blue-700"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

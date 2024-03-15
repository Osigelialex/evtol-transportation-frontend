import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const Delivery = () => {
  const [loadedEvtol, setLoadedEvtol] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [address, setAddress] = useState("");
  const [selectedEvtol, setSelectedEvtol] = useState("");
  const [success, setSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/loaded-evtols"
        );
        setLoadedEvtol(response.data);
      } catch (error) {
        setHasError(true);
        setErrorMessage(error.response.data.message);
        setTimeout(() => setHasError(false), 3000);
      }
    };

    fetchData();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/v1/delivery", {
        recipientName: recipient,
        address,
        evtolSerialNumber: selectedEvtol,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  if (!loadedEvtol) {
    return (
      <div className="grid place-items-center p-6 bg-slate-50 min-h-screen lg:ml-[15rem] font-poppins">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="p-6 bg-slate-50 min-h-screen lg:ml-[15rem] font-poppins">
        <h2 className="font-bold text-xl mb-5 text-left">Evtol delivery</h2>
        <div className="bg-white border grid sm:grid-cols-12">
          <div className="sm:col-span-6 border-r p-5">
          {success && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              EVTOL successfully set for delivery
            </Alert>
          )}
          {hasError && (
            <Alert severity="error">
              {errorMessage}
            </Alert>
          )}
            <h2 className="font-bold text-lg mb-5">Delivery options</h2>
            <div className="border p-3">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="name" className="mb-5">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    name="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="p-3 border block w-full mt-2"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="address" className="mb-5">
                    Address
                  </label>
                  <textarea
                    id="address"
                    required
                    name="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="p-3 border block w-full mt-2 h-20"
                  />
                </div>
                <label htmlFor="loaded" className="mb-5">
                  Loaded Evtol
                </label>
                <select
                  id="loaded"
                  name="text"
                  value={selectedEvtol}
                  onChange={(e) => setSelectedEvtol(e.target.value)}
                  className="p-3 w-full mt-2 h-20"
                  required
                >
                  <option value="">Select a loaded evtol for delivery</option>
                  {loadedEvtol.map((evtol) => (
                    <option value={evtol.serialNumber}>
                      {evtol.serialNumber}
                    </option>
                  ))}
                </select>
                <input
                  type="submit"
                  value="Done"
                  className="mx-auto bg-[#00c000] text-white p-3 w-full mt-5"
                />
              </form>
            </div>
          </div>
          <div className="sm:col-span-6 bg-[#00c000]">
            <div className="p-5">
              <h2 className="font-bold text-lg text-white text-left">
                Delivery Summary
              </h2>
              <div className="mt-5">
                <div className="grid sm:grid-cols-12 mt-5 text-white border-b border-dashed pb-2">
                  <h2 className="col-span-12 font-bold">Recipient info</h2>
                  <div className="col-span-6 mt-3">
                    <h2>Name:</h2>
                  </div>
                  <div className="col-span-6 mt-3">
                    <h2>{recipient}</h2>
                  </div>
                  <div className="col-span-6 mt-3">
                    <h2>Address:</h2>
                  </div>
                  <div className="col-span-6 mt-3">
                    <h2>{address}</h2>
                  </div>
                </div>

                <div className="grid sm:grid-cols-12 mt-5 text-white relative mb-1 border-b border-dashed pb-2">
                  <h2 className="col-span-12 font-bold mb-2">
                    Date time Information
                  </h2>
                  <div className="col-span-6">
                    <h2>Date:</h2>
                  </div>
                  <div className="col-span-6">
                    <h2>{new Date().toJSON().slice(0, 10)}</h2>
                  </div>

                  <div className="col-span-6 mt-3">
                    <h2>Estimated time:</h2>
                  </div>
                  <div className="col-span-6 mt-3">
                    <h2>2 hours</h2>
                  </div>
                </div>

                <div className="grid sm:grid-cols-12 mt-5 text-white mb-1 border-b border-dashed pb-2">
                  <div className="col-span-6">
                    <h2>Amount:</h2>
                  </div>
                  <div className="col-span-6">
                    <h2>$20</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;

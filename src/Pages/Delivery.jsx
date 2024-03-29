import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

const Delivery = () => {
  const [loadedEvtol, setLoadedEvtol] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [address, setAddress] = useState("");
  const [selectedEvtol, setSelectedEvtol] = useState("");
  const { enqueueSnackbar } = useSnackbar();

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

      enqueueSnackbar("EVTOL set for delivery", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" })
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
        <div className="bg-white border grid sm:grid-cols-12 w-3/4 mx-auto">
          <div className="sm:col-span-12 border-r p-5">
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
                  className="mx-auto bg-blue-500 text-white p-3 w-full mt-5"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;

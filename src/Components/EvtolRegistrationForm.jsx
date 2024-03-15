import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import axios from "axios";
import { useSnackbar } from "notistack";


export default function EvtolRegistrationForm({ onRegister }) {
  const [open, setOpen] = React.useState(false);
  const [model, setModel] = React.useState("");
  const [weightLimit, setWeightLimit] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    setModel(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (data) => {
    const URL = 'http://localhost:8080/api/v1/evtol/register';
    try {
      await axios.post(URL, data);
      onRegister();
      enqueueSnackbar("EVTOL Successfully registered", { variant: 'success' });
    } catch(error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  }

  return (
    <>
      <button className="bg-blue-500 text-white p-3" onClick={handleClickOpen}>
        + Add New
      </button>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            await handleFormSubmit(formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle className="font-bold text-lg">EVTOL Regsitration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in details to register an evtol on the system.
          </DialogContentText>
          <InputLabel id="serialNumber" className="mt-5">EVTOL Model</InputLabel>
          <TextField
            autoFocus
            required
            margin="dense"
            id="serialNumber"
            name="serialNumber"
            fullWidth
            placeholder="Serial Number"
            variant="outlined"
          />
          <InputLabel id="model" className="mt-5 mb-2">EVTOL Model</InputLabel>
          <Select
            required
            labelId="model"
            id="model"
            name="model"
            value={model}
            fullWidth
            onChange={handleChange}
          >
            <MenuItem value={"Lightweight"}>Lightweight</MenuItem>
            <MenuItem value={"Middleweight"}>Middleweight</MenuItem>
            <MenuItem value={"Cruiserweight"}>Cruiserweight</MenuItem>
            <MenuItem value={"Heavyweight"}>Heavyweight</MenuItem>
          </Select>
          <InputLabel id="weightLimit" className="mt-5 mb-2">Weight Limit</InputLabel>
          <input
            type="number"
            id="weightLimit"
            required
            min="50"
            max="500"
            margin="dense"
            name="weightLimit"
            placeholder="Minimum weight of 50"
            value={weightLimit}
            onChange={(e) => setWeightLimit(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-md"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Register</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

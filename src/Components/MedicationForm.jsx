import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { useSnackbar } from "notistack";

export default function MedicationForm() {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (data) => {
    const URL = "http://localhost:8080/api/v1/medications";
    try {
      await axios.post(URL, data);
      enqueueSnackbar("Medication added successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

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
        <DialogTitle className="font-bold text-lg">Add Medication</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in medication details.
          </DialogContentText>
          <InputLabel id="serialNumber" className="mt-5">
            Medication name
          </InputLabel>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            fullWidth
            placeholder="Name of medication"
            variant="outlined"
            inputProps={{
              pattern: "^[a-zA-Z0-9_]*",
              title: "Enter only alphanumeric characters",
            }}
          />
          <InputLabel id="code" className="mt-5 mb-2">
            Code
          </InputLabel>
          <TextField
            required
            labelId="code"
            id="code"
            name="code"
            fullWidth
            variant="outlined"
            placeholder="Medication Code"
            inputProps={{
              pattern: "^[A-Z0-9]*",
              title: "Enter uppercase letters and digits only",
            }}
          />
          <InputLabel id="weight" className="mt-5 mb-2">
            Weight
          </InputLabel>
          <input
            type="number"
            id="weight"
            required
            min="1"
            max="500"
            margin="dense"
            name="weight"
            placeholder="Weight of medication"
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

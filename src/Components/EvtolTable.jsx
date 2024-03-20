import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const stateColorMap = {
  IDLE: "#ff474c",
  LOADING: "yellow",
  LOADED: "lime",
  DELIVERED: "#5ced73",
};

const renderStateCell = (params) => {
  const state = params.value;
  const color = stateColorMap[state];

  return (
    <span style={{ backgroundColor: color, padding: '3px', borderRadius: '10px' }}>{state}</span>
  );
};

const columns = [
  {
    field: "serialNumber",
    align: "left",
    headerName: "SerialNumber",
    width: 135,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "model",
    headerName: "Model",
    width: 135,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "weightLimit",
    headerName: "WeightLimit",
    type: "number",
    width: 135,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "percentage",
    align: "right",
    headerName: "Battery",
    type: "number",
    width: 135,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "state",
    headerName: "State",
    width: 160,
    headerClassName: "super-app-theme--header",
    renderCell: renderStateCell,
  },
];

const getRowId = (row) => {
  return row.serialNumber;
};

const EvtolTable = ({ data }) => {
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        stripedRows
        getRowId={getRowId}
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </Box>
  );
};

export default EvtolTable;

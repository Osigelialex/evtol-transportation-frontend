import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


const columns = [
  { field: 'name', align: 'left', headerName: 'Name', width: 135,  headerClassName: 'super-app-theme--header', },
  { field: 'code', headerName: 'Code', width: 135, headerClassName: 'super-app-theme--header' },
  { field: 'weight', headerName: 'Weight', type: 'number',  width: 135, headerClassName: 'super-app-theme--header' },
];

const getRowId = (row) => {
  return row.code;
} 

const MedicationTable = ({data}) => {
  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
      }}
    >
      <DataGrid
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
}

export default MedicationTable;

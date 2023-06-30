import React from "react";
import { connect } from "react-redux";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Manifest({ manifest }) {

  return (
      <TableContainer style={{ maxWidth: 400, margin: 'auto', marginTop: 40, backgroundColor: 'gray', color: 'white' }} component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
           <TableRow>
            <TableCell>Mision:</TableCell>
            <TableCell align="right">{manifest && manifest?.photo_manifest.name.toUpperCase()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Status:</TableCell>
            <TableCell align="right">{manifest && manifest?.photo_manifest.status.toUpperCase()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Landind Date:</TableCell>
            <TableCell align="right">{manifest && manifest?.photo_manifest.landing_date}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Launch Date:</TableCell>
            <TableCell align="right">{manifest && manifest?.photo_manifest.launch_date}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Max Sol:</TableCell>
            <TableCell align="right">{manifest && manifest?.photo_manifest.max_sol}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Max Date:</TableCell>
            <TableCell align="right">{manifest && manifest?.photo_manifest.max_date}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Photos:</TableCell>
            <TableCell align="right">{manifest && manifest?.photo_manifest.total_photos}</TableCell>
          </TableRow>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    manifest: state.manifest,
  };
};

export default connect(mapStateToProps, null)(Manifest);

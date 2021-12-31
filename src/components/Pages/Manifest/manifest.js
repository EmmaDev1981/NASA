import React from "react";
import { connect } from "react-redux";
import { Table } from 'react-bootstrap'
import "./manifest.css";

function Manifest({ manifest }) {
  return (
    <div>
      <div className="title-div">
        <h3>{manifest && manifest?.photo_manifest.name.toUpperCase()}</h3>
      </div>
      <Table striped bordered hover className="wrapper-title-div">
        <tbody>
          <tr>
            <td>Status:</td>
            <td>{manifest && manifest?.photo_manifest.status.toUpperCase()}</td>
          </tr>
          <tr>
          
            <td>Landind D:</td>
            <td>{manifest && manifest?.photo_manifest.landing_date}</td>
          </tr>
          <tr>
            <td>Launch D:</td>
            <td>{manifest && manifest?.photo_manifest.launch_date}</td>
          </tr>
          <tr>
            <td>Max Sol: </td>
            <td>{manifest && manifest?.photo_manifest.max_sol}</td>
          </tr>
          <tr>
            <td>Max Date:</td>
            <td>{manifest && manifest?.photo_manifest.max_date}</td>
          </tr>
          <tr>
            <td>Total Photos:</td>
            <td>{manifest && manifest?.photo_manifest.total_photos}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    manifest: state.manifest,
  };
};

export default connect(mapStateToProps, null)(Manifest);

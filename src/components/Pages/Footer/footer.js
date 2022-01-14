import React from "react";
import { CFooter } from "@coreui/react";
import "./FooterStyles.css";

function Footer() {
  return (
    <div className="footer-div">
      <CFooter>
        <span>&copy; 2022 NASA API - </span>
        <span>EmmaDev1981</span>
      </CFooter>
    </div>
  );
}
export default Footer;

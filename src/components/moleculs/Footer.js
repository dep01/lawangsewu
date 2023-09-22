import React from "react";

function Footer() {
  const date = new Date();
  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6">
            <p>Copyright © {date.getFullYear()}</p>
          </div>
          <div className="col-6 text-end"></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

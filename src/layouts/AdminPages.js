import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function AdminPages({
  children,
  label="",
  withHeader = true,
  withFooter = true,
}) {
  return (
    <React.Fragment>
      {withHeader && <Header />}
      <div className="main main-app p-3 p-lg-4">
      <h3>{label}</h3>
        {children}
        {withFooter && <Footer />}
      </div>
    </React.Fragment>
  );
}

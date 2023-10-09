import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function AdminPages({
  children,
  label="",
  withHeader = true,
  withFooter = false,
  menus =[]
}) {
  return (
    <div>
      {withHeader && <Header menu={menus} label={label} />}
      <div className="col-md-12 p-3 p-lg-4">
      {/* <h3>{label}</h3> */}
        
        {children}
        {withFooter && <Footer />}
      </div>
    </div>
  );
}

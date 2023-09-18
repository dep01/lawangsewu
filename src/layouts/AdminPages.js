import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function AdminPages({
  children,
  withHeader = true,
  withFooter = true,
}) {
  return (
    <React.Fragment>
      {withHeader && <Header />}
      <div className="main main-app p-3 p-lg-4">
        {children}
        {withFooter && <Footer />}
      </div>
    </React.Fragment>
  );
}

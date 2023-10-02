import React from "react";
import { sys_images, sys_labels } from "lawangsewu-utils/constants";
import { STATIC_ROUTES } from "lawangsewu-routes";
import AdminPages from "lawangsewu-layouts";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    label: sys_labels.menus.dashboard,
    link: STATIC_ROUTES.DASHBOARD,
    icon: sys_images.img_chart,
  },
  {
    label: sys_labels.menus.transaction,
    icon: sys_images.img_credit,
    link: STATIC_ROUTES.TRANSACTION.INVOICE,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <AdminPages>
      <div className="d-flex justify-content-center">
        <div className="col-md-6">
          <div className="col-lg-12">
            <div className="row">
              {modules.map((val) => {
                return (
                  <div className="col-md-3 mb-4">
                    <div
                      onClick={() => navigate(val.link)}
                      className="module-card m-auto shadow"
                    >
                      <div className="row">
                        <div className="d-flex justify-content-center col-md-12">
                          <img
                            src={val.icon}
                            style={{
                              backgroundSize: "contain",
                              width: "60%",
                            }}
                          />
                        </div>

                        <div className="d-flex justify-content-center col-md-12">
                            <h5>{val.label}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminPages>
  );
}

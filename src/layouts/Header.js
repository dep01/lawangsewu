import React from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import userAvatar from "../assets/img/img1.jpg";
import notification from "../data/Notification";
import { STATIC_ROUTES } from "../routes/static_routes";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function Header({menu = [],label=""}) {
  const location = useLocation();
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="dropdown-link"
    >
      {children}
    </Link>
  ));

  const toggleSidebar = () => {
    window.history.back();
  };

  function NotificationList() {
    const notiList = notification.map((item, key) => {
      return (
        <li className="list-group-item" key={key}>
          <div
            className={item.status === "online" ? "avatar online" : "avatar"}
          >
            {item.avatar}
          </div>
          <div className="list-group-body">
            <p>{item.text}</p>
            <span>{item.date}</span>
          </div>
        </li>
      );
    });

    return <ul className="list-group">{notiList}</ul>;
  }

  return (
    <div className="header-main flex-row justify-content-center align-item-center">
      <div className="col-md-6">
        <div className="d-flex flex-row">
          <div className="col-md-1">
            {location.pathname != "/" && (
              <Link onClick={toggleSidebar} className="menu-link me-3 me-lg-4">
                <ArrowLeftOutlined />{" "}
              </Link>
            )}
          </div>
          <h5 style={{marginRight:15}}>{label}</h5>
          {menu.length > 0 &&
            menu.map((val, index) => {
              return val.sub_menu && (val.sub_menu.length > 0) ? (
                <Dropdown
                  title={val.label}
                  style={{ marginRight: 10 }}
                >
                  <Dropdown.Toggle as={CustomToggle}>
                    <h5>{val.label}</h5>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className="dropdown-menu-body">
                      <nav className="nav">
                        {val.sub_menu.map((value) => {
                          return (
                            <a className="dropdown-item" href={value.link}>
                              {value.label}
                            </a>
                          );
                        })}
                      </nav>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link style={{marginRight:10}} to={val.link}><h5>{val.label}</h5></Link>
              );
              //  : (
              //   <a className="btn" href={val.link}>
              //     {val.label}
              //   </a>
              // );
            })}
        </div>
      </div>
      <div className="col-md-6">
        <div className="d-flex flex-row justify-content-end align-item-center">
          <Dropdown
            className="dropdown-notification ms-3 ms-xl-4 pl-3"
            align="end"
          >
            <Dropdown.Toggle as={CustomToggle}>
              <small>3</small>
              <i className="ri-notification-3-line"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="mt-10-f me--10-f">
              <div className="dropdown-menu-header">
                <h6 className="dropdown-menu-title">Notifications</h6>
              </div>
              {NotificationList()}
              <div className="dropdown-menu-footer">
                <Link to="#">Show all Notifications</Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="dropdown-profile ms-3 ms-xl-4" align="end">
            <Dropdown.Toggle as={CustomToggle}>
              <div className="avatar online">
                <img src={userAvatar} alt="" />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="mt-10-f">
              <div className="dropdown-menu-body">
                <div className="avatar avatar-xl online mb-3">
                  <img src={userAvatar} alt="" />
                </div>
                <h5 className="mb-1 text-dark fw-semibold">Shaira Diaz</h5>
                <p className="fs-sm text-secondary">Premium Member</p>

                <nav className="nav">
                  <Link to="">
                    <i className="ri-edit-2-line"></i> Edit Profile
                  </Link>
                  <Link to="">
                    <i className="ri-profile-line"></i> View Profile
                  </Link>
                </nav>
                <hr />
                <nav className="nav">
                  <Link to="">
                    <i className="ri-question-line"></i> Help Center
                  </Link>
                  <Link to="">
                    <i className="ri-lock-line"></i> Privacy Settings
                  </Link>
                  <Link to="">
                    <i className="ri-user-settings-line"></i> Account Settings
                  </Link>
                  <Link to={STATIC_ROUTES.AUTH.LOGIN}>
                    <i className="ri-logout-box-r-line"></i> Log Out
                  </Link>
                </nav>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

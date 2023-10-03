import React from "react";
import AdminDashboard from "lawangsewu-layouts";
import { Link, useNavigate } from "react-router-dom";
import * as providers from "lawangsewu-providers/example";
import { STATIC_ROUTES } from "lawangsewu-routes/static_routes";
import { sys_labels } from "lawangsewu-utils/constants";
import DataTable from "lawangsewu-components/moleculs/DataTable";
import { Button,Popconfirm } from "antd";
import {
  SysCurrencyTransform,
  SysDateTransform,
} from "lawangsewu-utils/global_store";
import { action } from "./store";
const ExampleList = () => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      route:STATIC_ROUTES.EXAMPLE.DETAIL,
      key_index:'id'
    },
    
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render :(val)=>val?"DONE":"PROGRESS"
    },
    {
      title: "Aksi",
      dataIndex: "id",
      key: "action",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <Button
            onClick={() =>
              navigate(`${STATIC_ROUTES.EXAMPLE.DETAIL}${val}`)
            }
            className="btn btn-primary btn-mr"
          >
            <i className="ri-file-list-line"></i>
          </Button>
          <Button
            onClick={() =>
              navigate(`${STATIC_ROUTES.EXAMPLE.EDIT}${val}`)
            }
            className="btn btn-info btn-mr"
          >
            <i className="ri-pencil-line"></i>
          </Button>

          <Popconfirm
            title={`Confirmation delete`}
            onConfirm={() => action.deleteData(val)}
          >
            <Button className="btn btn-danger btn-mr">
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  
  ];
  const form_action = [
    <Button>
      <Link
        to={STATIC_ROUTES.EXAMPLE.CREATE}
        className="icon icon-left"
      >
        <i className="ri-add-line" />
        {sys_labels.action.add}
      </Link>
    </Button>
  ];
  return (
    <AdminDashboard label={sys_labels.menus.transaction}>
      <DataTable
        fetchDataFunc={providers.getData}
        columns={columns}
        title={sys_labels.menus.invoice}
        action={form_action}
      />
    </AdminDashboard>
  );
};

export default ExampleList;

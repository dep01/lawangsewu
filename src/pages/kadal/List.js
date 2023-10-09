import React from "react";
  import AdminDashboard from "lawangsewu-layouts";
  import { Link, useNavigate } from "react-router-dom";
  import { STATIC_ROUTES } from "lawangsewu-routes";
  import { sys_labels } from "lawangsewu-utils/constants";
  import DataTable from "lawangsewu-components/moleculs/DataTable";
  import { Button, Popconfirm } from "antd";
  import { action } from "./store";
  const KadalList = () => {
    const navigate = useNavigate();
    const columns = [
      
          {
            title:"Time:string",
            dataIndex:"time:string",
            key:"time:string",
          }
          ,
          {
            title:"Name:string",
            dataIndex:"name:string",
            key:"name:string",
          }
          ,
          {
            title:"Age:int",
            dataIndex:"age:int",
            key:"age:int",
          }
          
      ,{
        title: "Aksi",
        dataIndex: "id",
        key: "action",
        render: (val, record) => (
          <div className="btn-group" role="group">
            <Button
              onClick={() =>
                navigate('')
              }
              className="btn btn-primary btn-mr"
            >
              <i className="ri-file-list-line"></i>
            </Button>
            <Button
              onClick={() =>
                navigate('')
              }
              className="btn btn-info btn-mr"
            >
              <i className="ri-pencil-line"></i>
            </Button>
  
            <Popconfirm
              title={'Confirmation delete'}
              onConfirm={() => action.deleteData(val)}
            >
              <Button className="btn btn-danger btn-mr">
                <i className="ri-delete-bin-line"></i>
              </Button>
            </Popconfirm>
          </div>
        ),
      }
    ];
    const form_action = [
      <Button>
        <Link
          to={''}
          className="icon icon-left"
        >
          <i className="ri-add-line" />
          {sys_labels.action.add}
        </Link>
      </Button>,
    ];
    return (
      <AdminDashboard label={''}>
        <DataTable
          fetchDataFunc={thisFuckingProvider}
          columns={columns}
          title={''}
          action={form_action}
        />
      </AdminDashboard>
    );
  };
  
  export default KadalList;
  
  
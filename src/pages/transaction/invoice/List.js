import React, { useEffect, useState } from "react";
import AdminDashboard from "lawangsewu-layouts";
import { Link, useNavigate } from "react-router-dom";
import * as providers from "lawangsewu-providers/transaction/invoice";
import { STATIC_ROUTES } from "lawangsewu-routes";
import { sys_labels } from "lawangsewu-utils/constants";
import DataTable from "lawangsewu-components/moleculs/DataTable";
import { Button, Popconfirm } from "antd";
import {
  SysCurrencyTransform,
  SysDateTransform,
} from "lawangsewu-utils/global_store";
import { action } from "./store";
const InvoiceList = () => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "No Invoice",
      dataIndex: "no_invoice",
      key: "no_invoice",
    },
    {
      title: "Pelanggan",
      dataIndex: "nama_pelanggan",
      key: "nama_pelanggan",
      route:STATIC_ROUTES.TRANSACTION.INVOICE_EDIT,
      key_index:'id'
    },
    {
      title: "Tanggal Invoice",
      dataIndex: "tanggal_invoice",
      key: "tanggal_invoice",
      render: (val) =>
        SysDateTransform({
          date: val,
          type: "short",
          withTime: false,
          lang: "in",
        }),
    },
    {
      title: "Tanggal Batas Akhir",
      dataIndex: "tanggal_batas_akhir",
      key: "tanggal_batas_akhir",
      render: (val) =>
        SysDateTransform({
          date: val,
          type: "short",
          withTime: false,
          lang: "in",
        }),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Tagihan",
      dataIndex: "total_tagihan",
      key: "total_tagihan",
      render: (val) => SysCurrencyTransform({ num: val, currency: "" }),
    },
    // {
    //   title: "Aksi",
    //   dataIndex: "id",
    //   key: "action",
    //   render: (val, record) => (
    //     <div className="btn-group" role="group">
    //       <Button
    //         onClick={() =>
    //           navigate(`${STATIC_ROUTES.TRANSACTION.INVOICE_SHOW}${val}`)
    //         }
    //         className="btn btn-primary btn-mr"
    //       >
    //         <i className="ri-file-list-line"></i>
    //       </Button>
    //       <Button
    //         onClick={() =>
    //           navigate(`${STATIC_ROUTES.TRANSACTION.INVOICE_EDIT}${val}`)
    //         }
    //         className="btn btn-info btn-mr"
    //       >
    //         <i className="ri-pencil-line"></i>
    //       </Button>

    //       <Popconfirm
    //         title={`Confirmation delete ${record.no_invoice}?`}
    //         onConfirm={() => action.deleteData(val)}
    //       >
    //         <Button className="btn btn-danger btn-mr">
    //           <i className="ri-delete-bin-line"></i>
    //         </Button>
    //       </Popconfirm>
    //     </div>
    //   ),
    // },
  ];
  const form_action = [
    <Button>
      <Link
        to={STATIC_ROUTES.TRANSACTION.INVOICE_CREATE}
        className="icon icon-left"
      >
        <i className="ri-add-line" />
        {sys_labels.action.add}
      </Link>
    </Button>,
    // ,
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

export default InvoiceList;

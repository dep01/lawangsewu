import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import AdminDashboard from "lawangsewu-layouts";
import { useNavigate } from "react-router-dom";
import { sys_labels } from "lawangsewu-utils/constants";
import { Button } from "antd";
import { CustomInput } from "lawangsewu-components";
import { Card, Col, Container, Form, Nav, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FORM_SCHEMA } from "./store/schema_form";
import { action, base_state, setter, useStore } from "./store";
import useValidationSchema from "lawangsewu-utils/resolver";
import {
  SysCurrencyTransform,
  SysDateTransform,
} from "lawangsewu-utils/global_store";
import { onlyNumber } from "lawangsewu-utils/validation";
import CustomDatePicker from "lawangsewu-components/atoms/DatePicker";

const InvoiceForm = ({ readonly = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const label =
    id && readonly
      ? `${sys_labels.action.detail} ${sys_labels.menus.invoice}`
      : `${sys_labels.action.form} ${sys_labels.menus.invoice}`;
  const resolver = useValidationSchema(FORM_SCHEMA);

  const state = {
    ...useStore((state) => base_state(state)),
  };
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver });
  useEffect(() => {
    action.initialized(id, setValue);
    return () => {
      action.cleanUp();
    };
  }, []);
  return (
    <AdminDashboard label={label}>
      <Card className={`card`}>
        <Card.Body>
          <div className="row">
            <div className="col-6">
              <CustomInput
                type="text"
                control={control}
                placeholder="No Invoice"
                classname="form-control"
                name="no_invoice"
                label="No Invoice"
                errors={errors.no_invoice}
                readonly={readonly}
                id="no_invoice"
              />
            </div>
            <div className="col-6">
              <CustomInput
                type="text"
                control={control}
                placeholder="Total Tagihan"
                required={true}
                classname="form-control"
                onKeydown={onlyNumber}
                onChange={(val) =>
                  setter.data({ ...state.data, total_tagihan: val })
                }
                name="total_tagihan"
                label={`Total Tagihan (${SysCurrencyTransform({
                  num: state.data?.total_tagihan ?? null,
                  currency: "",
                })})`}
                errors={errors.total_tagihan}
                readonly={readonly}
                id="total_tagihan"
              />
            </div>

            <div className="col-6">
              {/* <CustomDatePicker
                control={control}
                placeholder="Tanggal Invoice"
                required={true}
                classname="form-control"
                name="tanggal_invoice"
                onChange={(val) =>
                  // console.log(val)
                  setter.data({ ...state.data, tanggal_invoice: val })
                }
                label={`Tanggal Invoice (${SysDateTransform({
                  date: state.data?.tanggal_invoice ?? null,
                  checkIsToDay: true,
                })})`}
                errors={errors.tanggal_invoice}
                readonly={readonly}
                id="tanggal_invoice"
              /> */}
            </div>

            <div className="col-6">
              <CustomInput
                type="text"
                control={control}
                placeholder="Tanggal Batas Akhir"
                required={true}
                classname="form-control"
                name="tanggal_batas_akhir"
                label={`Tanggal Batas Akhir (${SysDateTransform({
                  date: state.data?.tanggal_batas_akhir ?? null,
                  checkIsToDay: true,
                })})`}
                errors={errors.tanggal_batas_akhir}
                readonly={readonly}
                id="tanggal_batas_akhir"
              />
            </div>
          </div>
        </Card.Body>
        {!readonly && (
          <Card.Footer>
            <Button onClick={handleSubmit(action.handleSubmit)}>
              {id ? sys_labels.action.edit : sys_labels.action.add}
            </Button>
          </Card.Footer>
        )}
      </Card>
    </AdminDashboard>
  );
};

export default InvoiceForm;

import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import AdminDashboard from "lawangsewu-layouts";
import { useNavigate } from "react-router-dom";
import { sys_labels } from "lawangsewu-utils/constants";
import { Button } from "antd";
import { CustomInput } from "lawangsewu-components";
import { Card} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FORM_SCHEMA } from "./store/schema_form";
import { action, base_state, setter, useStore } from "./store";
import useValidationSchema from "lawangsewu-utils/resolver";
import {
  SysCurrencyTransform,
  SysDateTransform,
} from "lawangsewu-utils/global_store";
import { onlyNumber } from "lawangsewu-utils/validation";

const InvoiceForm = ({ readonly = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const label =
    id && readonly
      ? `${sys_labels.action.detail} ${sys_labels.menus.example}`
      : `${sys_labels.action.form} ${sys_labels.menus.example}`;
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
                placeholder="ID"
                classname="form-control"
                name="id"
                label="ID"
                errors={errors.id}
                readonly={readonly}
                id="id"
              />
            </div>
            <div className="col-6">
              <CustomInput
                type="text"
                control={control}
                placeholder="User ID"
                required={true}
                classname="form-control"
                onKeydown={onlyNumber}
                name="userId"
                label={`User ID`}
                errors={errors.userId}
                readonly={readonly}
                id="userId"
              />
            </div>
            
            <div className="col-6">
              <CustomInput
                type="text"
                control={control}
                placeholder="Title"
                required={true}
                classname="form-control"
                onKeydown={onlyNumber}
                name="title"
                label={`Title`}
                errors={errors.title}
                readonly={readonly}
                id="title"
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

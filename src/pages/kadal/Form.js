import {  useParams } from "react-router-dom";
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
  import { onlyNumber } from "lawangsewu-utils/validation";
  
  const KadalForm = ({ readonly = false }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const label ="";
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
      action.initialized();
      return () => {
        action.cleanUp();
      };
    }, []);
    return (
      <AdminDashboard label={label}>
        <Card className={'card'}>
          <Card.Body>
            <div className="row">
            
                <div className="col-6">
                  <CustomInput
                    type="text"
                    control={control}
                    placeholder="Time"
                    classname="form-control"
                    
                    name="time"
                    label="Time"
                    errors={errors.time}
                    readonly={readonly}
                    id="time"
                  />
                </div>
                
                <div className="col-6">
                  <CustomInput
                    type="text"
                    control={control}
                    placeholder="Name"
                    classname="form-control"
                    
                    name="name"
                    label="Name"
                    errors={errors.name}
                    readonly={readonly}
                    id="name"
                  />
                </div>
                
                <div className="col-6">
                  <CustomInput
                    type="text"
                    control={control}
                    placeholder="Age"
                    classname="form-control"
                    onKeyDown={onlyNumber}
                    name="age"
                    label="Age"
                    errors={errors.age}
                    readonly={readonly}
                    id="age"
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
  
  export default KadalForm;  
  
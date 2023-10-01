import React,{useEffect} from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { action, base_state, useStore } from "./store";
import useValidationSchema from "lawangsewu-utils/resolver";
import { CustomInput } from "lawangsewu-components";
import { useForm } from "react-hook-form";
import { FORM_SCHEMA } from "./store/schema_form";
export default function Signin() {
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
    <div className="page-sign">
      <Card className="card-sign">
        <Card.Header>
          <Link to="/" className="header-logo mb-4">
            LawangSewu
          </Link>
          <Card.Title>Sign In</Card.Title>
          <Card.Text>Welcome back! Please signin to continue.</Card.Text>
        </Card.Header>
        <Card.Body>
          <div className="mb-4">
            <CustomInput
              type="email"
              control={control}
              placeholder="Email"
              classname="form-control"
              name="email"
              label="Email"
              errors={errors.email}
              id="email"
            />
          </div>
          <div className="mb-4">
            <CustomInput
              type="password"
              control={control}
              placeholder="Password"
              classname="form-control"
              name="password"
              label="Password"
              errors={errors.password}
              id="password"
            />
          </div>
          <Button
            onClick={handleSubmit(action.doLogin)}
            variant="primary"
            className="btn-sign"
          >
            Sign In
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

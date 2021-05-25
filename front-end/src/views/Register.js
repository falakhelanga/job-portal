import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import * as actions from "../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Spinner,
  FormGroup,
  FormLabel,
  FormControl,
  Col,
  Container,
  Button,
  Form,
  Row,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const Register = ({ history, location }) => {
  const parsed = queryString.parse(location.search);
  const redirect = parsed.redirect ? parsed.redirect : "/";

  const dispatch = useDispatch();
  const registerState = useSelector((state) => state.userRegiter);
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    isEmployer: false,
  };

  const { loading, error } = registerState;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("invalid email")
      .required("this field is required"),
    name: Yup.string().required("this field is required"),
    password: Yup.string()
      .min(6, "Password is too short, it should be 4 chars minimum.")
      .matches(/[a-zA-Z]/, "Password must contain Latin letters.")
      .required("this feild is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "The Passwords must match")
      .required("this feild is required"),
  });
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (error !== null) setShowAlert(true);
  }, [error]);
  const redirectHandler = () => {
    history.push(redirect);
  };
  const onSubmit = (values) => {
    dispatch(
      actions.userRegister(
        values.name,
        values.email,
        values.password,
        values.isEmployer,
        redirectHandler
      )
    );
  };

  return (
    <Container
      className=""
      style={{
        height: "90vh",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          const {
            touched,
            errors,
            isValid,
            handleSubmit,
            handleChange,
            handleBlur,
          } = formik;
          return (
            <Row
              className=" d-flex justify-content-center align-items-center mt-5"
              style={{ height: "100%" }}
            >
              <Col sm={12} md={8} lg={4}>
                {showAlert && (
                  <Alert variant="danger" dismissible>
                    <p>{error}</p>
                  </Alert>
                )}

                <Form
                  onSubmit={handleSubmit}
                  className="mx-auto justify-content-center  d-flex align-items-center flex-column border rounded py-3"
                >
                  <FormGroup as={Col} sm={12} md={12} lg={12}>
                    <FormLabel>name</FormLabel>
                    <FormControl
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.name && errors.name}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.name}
                    </FormControl.Feedback>
                  </FormGroup>
                  <FormGroup as={Col} sm={12} md={12} lg={12}>
                    <FormLabel>email</FormLabel>
                    <FormControl
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && errors.email}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.email}
                    </FormControl.Feedback>
                  </FormGroup>

                  <FormGroup as={Col} sm={12} md={12} lg={12}>
                    <FormLabel>password</FormLabel>
                    <FormControl
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && errors.password}
                    />

                    <FormControl.Feedback type="invalid">
                      {errors.password}
                    </FormControl.Feedback>
                  </FormGroup>

                  <FormGroup as={Col} sm={12} md={12} lg={12}>
                    <FormLabel>confirm password</FormLabel>
                    <FormControl
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />

                    <FormControl.Feedback type="invalid">
                      {errors.confirmPassword}
                    </FormControl.Feedback>
                  </FormGroup>

                  <FormGroup as={Col} sm={12} md={12} lg={12}>
                    <Form.Check
                      name="isEmployer"
                      label="Register as an employer?"
                      onChange={handleChange}
                      isInvalid={!!errors.terms}
                      feedback={errors.terms}
                      id="validationFormik0"
                    />
                  </FormGroup>
                  <Col sm={12} md={12} lg={12}>
                    <Button
                      type="submit"
                      variant="dark"
                      disabled={!isValid || loading}
                      className="btn-block"
                    >
                      {loading ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        "register"
                      )}
                    </Button>
                    <div className="mt-2">
                      Already have an account?
                      <Link to="/login" className="ml-1">
                        Sign in
                      </Link>
                    </div>
                  </Col>
                </Form>
              </Col>
            </Row>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Register;

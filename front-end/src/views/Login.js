import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as actions from "../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import {
  Spinner,
  Alert,
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

const Login = ({ history, location }) => {
  const parsed = queryString.parse(location.search);
  const redirect = parsed.redirect ? parsed.redirect : "/";

  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.userLogin);
  const { loading, error } = loginState;
  const initialValues = {
    email: "",
    password: "",
  };
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    setShowAlert(false);
    // if (error !== null) {
    //   setShowAlert(true);
    // } else {
    //   setShowAlert(false);
    // }
  }, []);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("invalid email")
      .required("this field is required"),

    password: Yup.string().required("this feild is required"),
  });
  const redirectHandler = () => {
    history.push(redirect);
  };
  const onSubmit = (values) => {
    dispatch(actions.userlogin(values.password, values.email, redirectHandler));
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
              className=" d-flex justify-content-center align-items-center"
              style={{ height: "100%" }}
            >
              <Col sm={12} md={8} lg={4}>
                {error && (
                  <Alert variant="danger" dismissible>
                    <p>{error}</p>
                  </Alert>
                )}
                <Form
                  onSubmit={handleSubmit}
                  className="mx-auto justify-content-center  d-flex align-items-center flex-column border rounded py-3"
                >
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
                  <Col sm={12} md={12} lg={12}>
                    <Button
                      type="submit"
                      variant="dark"
                      disabled={!isValid}
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
                        "Sign in"
                      )}
                    </Button>
                    <div className="mt-2">
                      Dont't have an account?
                      <Link to={`/register${redirect}`} className="ml-1">
                        Sign Up
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

export default Login;

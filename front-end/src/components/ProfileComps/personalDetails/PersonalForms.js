import React, { useState } from "react";
import FormContainer from "../FormContainer";
import { Image, Form, Col, Row, Spinner } from "react-bootstrap";
import { Formik, Field } from "formik";
import { personalSchema } from "../fromik/validationSchemas";
import { personalInit } from "../fromik/initialvalues";
import axios from "axios";
import { personal } from "../fromik/selectorsOption";
import { SelectorInput, TextInput } from "../formutils/FormGroups";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../../store/actions/user";

import "react-datepicker/dist/react-datepicker.css";
import FormBtn from "../SaveBtn";
import CancelBtn from "../CancelBtn";

const PersonalForms = ({
  showForm,
  setShowForm,
  populatedValues,
  setShowSnackBar,
}) => {
  const [image, setImage] = useState("");

  const profileState = useSelector((state) => state.fetchProfile);
  const createProfileState = useSelector((state) => state.userProfile);
  const { personal: PersonalState } = profileState;
  const { loading } = createProfileState;
  // IMAGE HANDLER
  const imageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const url = "http://localhost:5000/api/uploads/";
      const { data } = await axios.post(url, formData, config);

      setImage(data);
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useDispatch();
  const personalForm = (values, onSubmitProps) => {
    const profile_url = image;

    const {
      gender,
      title,
      ethnicity,
      firstName,
      surname,
      phoneNumber,
      citizeship,
      saId,
      dob,
      relocate,
      currCity,
      disability,
      introduction,
      email,
    } = values;
    dispatch(
      userProfile(
        profile_url,
        gender,
        title,
        ethnicity,
        firstName,
        surname,
        phoneNumber,
        citizeship,
        saId,
        dob,
        relocate,
        currCity,
        disability,
        introduction,
        email,

        onSubmitProps,
        setShowForm,
        setShowSnackBar
      )
    );
  };
  return (
    (PersonalState?.complete !== 1 || showForm) && (
      <div>
        <FormContainer title="personal details">
          <div className="d-flex flex-column">
            {/* PROFILE PIC ROW */}
            <div>
              <div
                style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                className="mb-2"
              >
                Photo
              </div>
              <div className="d-flex flex-column flex-lg-row">
                <div className="d-flex   align-items-center justify-content-center profile_pic mr-2">
                  <Image
                    src={image !== "" ? image : "/uploads/profile.png"}
                    alt="profile pic"
                    fluid
                    className="p-2"
                    style={{
                      height: "150px",
                      width: "150px",
                      border: "1px solid #D8D8D8",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <input
                  type="file"
                  className="custom_input ml-5"
                  onChange={(e) => {
                    imageHandler(e);
                  }}
                />
              </div>
            </div>
            <hr />
            {/* FORM ROW */}
            <div>
              <Formik
                initialValues={populatedValues || personalInit}
                validationSchema={personalSchema}
                onSubmit={personalForm}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  touched,
                  isValid,
                  isSubmitting,
                  errors,
                  values,
                  setFieldValue,
                }) => {
                  const fieldProps = {
                    handleChange,
                    handleBlur,
                    touched,
                    errors,
                  };

                  return (
                    <Form onSubmit={handleSubmit} className="">
                      {/* FIRST FIELDS */}
                      <Row className="no-gutters">
                        {/* GENEDER FEILD */}
                        <Col lg={4}>
                          <SelectorInput
                            feildProps={fieldProps}
                            options={personal.gender}
                            name="gender"
                            label="Gender"
                            value={values.gender}
                            req
                          />
                        </Col>

                        {/* Title FEILD */}

                        <Col lg={4}>
                          <SelectorInput
                            feildProps={fieldProps}
                            value={values.title}
                            options={personal.title}
                            name="title"
                            label="title"
                            req
                          />
                        </Col>
                        {/* Etnicty FEILD */}
                        <Col lg={4}>
                          <SelectorInput
                            feildProps={fieldProps}
                            value={values.ethnicity}
                            options={personal.ethnicity}
                            name="ethnicity"
                            label="ethnicity"
                            req
                          />
                        </Col>
                      </Row>

                      {/* SECOND FEILDS */}

                      <Row className="no-gutters">
                        {/* NAME */}
                        <Col lg={6}>
                          <TextInput
                            feildProps={fieldProps}
                            name="firstName"
                            label="First name"
                            placeholder="Your name"
                            type="text"
                            value={values.firstName}
                          />
                        </Col>

                        {/* SURNAME */}
                        <Col lg={6}>
                          <TextInput
                            value={values.surname}
                            feildProps={fieldProps}
                            name="surname"
                            label="Surname"
                            placeholder="Your surname"
                          />
                        </Col>
                      </Row>

                      {/* THIRD FEILDS */}

                      <Row className="no-gutters">
                        {/*   EMAIL */}
                        <Col lg={6}>
                          <TextInput
                            feildProps={fieldProps}
                            value={values.email}
                            name="email"
                            label="Email"
                            placeholder="Your email"
                            type="email"
                          />
                        </Col>

                        {/* PHONE NUMBER */}
                        <Col lg={6}>
                          <TextInput
                            value={values.phoneNumber}
                            feildProps={fieldProps}
                            name="phoneNumber"
                            label="phone number"
                            placeholder="Your phone neumber"
                          />
                        </Col>
                      </Row>

                      {/* FOURTH FEILDS */}

                      <Row className="no-gutters">
                        {/*   CITIZENSHIP */}
                        <Col lg={4}>
                          <SelectorInput
                            value={values.citizeship}
                            feildProps={fieldProps}
                            options={personal.citizenship}
                            name="citizeship"
                            label="citizenship"
                          />
                        </Col>

                        {/* ID NUMBER */}
                        <Col lg={8}>
                          <TextInput
                            value={values.saId}
                            feildProps={fieldProps}
                            name="saId"
                            label="South African legal ID"
                            placeholder="Your South African legal ID NUMBER"
                          />
                        </Col>
                      </Row>

                      {/* FIFTH FEILDS */}

                      <Row className="no-gutters">
                        {/*   DATE OF BIRTTH */}
                        <Col lg={4}>
                          <Form.Group as={Col} sm={12} md={12} lg={12}>
                            <div className="d-flex flex-column">
                              <Form.Label className="label req">
                                Date of Birth
                              </Form.Label>
                              <Field>
                                {({ form, Field }) => {
                                  return (
                                    <DatePicker
                                      name="dob"
                                      selected={values.dob}
                                      onChange={(date) => {
                                        setFieldValue("dob", date);
                                      }}
                                    />
                                  );
                                }}
                              </Field>

                              <Form.Control.Feedback type="invalid">
                                {errors.dob}
                              </Form.Control.Feedback>
                            </div>
                          </Form.Group>
                        </Col>

                        {/* RELOCATE */}
                        <Col lg={8}>
                          <SelectorInput
                            value={values.relocate}
                            feildProps={fieldProps}
                            options={personal.relocate}
                            name="relocate"
                            label="Are you willing to relocate?"
                            req
                          />
                        </Col>
                      </Row>

                      {/* SIXTH FIELDS */}

                      <Row className="no-gutters">
                        {/* CURRENT CITY */}
                        <Col lg={12}>
                          <TextInput
                            value={values.currCity}
                            feildProps={fieldProps}
                            name="currCity"
                            label="Current city"
                            placeholder="Your Current City"
                          />
                        </Col>
                      </Row>

                      {/* SEVENTH FEILD */}

                      <Row className="no-gutters">
                        {/* DISABILITY */}
                        <Col lg={12}>
                          <SelectorInput
                            value={values.disability}
                            feildProps={fieldProps}
                            options={personal.disability}
                            name="disability"
                            label="Do you have disability?"
                            req
                          />
                        </Col>
                      </Row>

                      {/* EIGHT FEILD */}

                      <Row className="no-gutters">
                        {/* INTRODUCTION*/}
                        <Col lg={12}>
                          <Form.Group as={Col} sm={12} md={12} lg={12}>
                            <Form.Label className="req">
                              Introduction
                            </Form.Label>
                            <Form.Control
                              value={values.introduction}
                              as="textarea"
                              rows={3}
                              name="introduction"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={
                                touched.introduction && errors.introduction
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.introduction}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="ml-3 d-flex">
                        <FormBtn isValid={!isValid || isSubmitting}>
                          {" "}
                          {loading ? (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            "Save"
                          )}
                        </FormBtn>
                        <CancelBtn
                          handleClick={() => {
                            setShowForm(false);
                          }}
                        />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </FormContainer>
      </div>
    )
  );
};

export default PersonalForms;

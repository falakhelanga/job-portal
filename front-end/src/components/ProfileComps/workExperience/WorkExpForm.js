import React from "react";
import FormContainer from "../FormContainer";
import { Form, Col, Row, Spinner } from "react-bootstrap";
import { Formik, Field } from "formik";
import { experiencevalidation } from "../fromik/validationSchemas";
import { experienceInit } from "../fromik/initialvalues";

import { experience } from "../fromik/selectorsOption";
import { SelectorInput, TextInput } from "../formutils/FormGroups";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { createExperience } from "../../../store/actions/user";

import "react-datepicker/dist/react-datepicker.css";
import FormBtn from "../SaveBtn";
import CancelBtn from "../CancelBtn";

const WorkExpForm = ({
  showForm,
  setShowForm,
  populatedValues,
  setShowSnackBar,
}) => {
  const profileState = useSelector((state) => state.fetchProfile);
  const createExperienceState = useSelector((state) => state.createExperience);
  const { experience: experienceState } = profileState;
  const { loading } = createExperienceState;

  const dispatch = useDispatch();
  const experiencelForm = (values, onSubmitProps) => {
    const {
      jobTitle,
      companyName,
      startDate,
      endDate,
      current,
      industry,
      jobCategory,
      experienceId,
    } = values;
    dispatch(
      createExperience(
        jobTitle,
        companyName,
        startDate,
        endDate,
        current,
        industry,
        jobCategory,
        experienceId,
        onSubmitProps,
        setShowForm,
        setShowSnackBar
      )
    );
  };
  return (
    (experienceState?.complete !== 1 || showForm) && (
      <div>
        <FormContainer title="Work Experience - Add at least your most recent/current position">
          <div className="d-flex flex-column">
            {/* FORM ROW */}
            <div>
              <Formik
                initialValues={populatedValues || experienceInit}
                validationSchema={experiencevalidation}
                onSubmit={experiencelForm}
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
                        {/* JOB TITLE*/}
                        <Col lg={12}>
                          <TextInput
                            feildProps={fieldProps}
                            name="jobTitle"
                            label="Job title"
                            placeholder="Your job title"
                            type="text"
                            value={values.jobTitle}
                          />
                        </Col>
                      </Row>

                      {/* SECOND FIELDS */}
                      <Row className="no-gutters">
                        {/* company name*/}
                        <Col lg={12}>
                          <TextInput
                            feildProps={fieldProps}
                            name="companyName"
                            label="Company name"
                            placeholder="Company name"
                            type="text"
                            value={values.companyName}
                          />
                        </Col>
                      </Row>

                      {/* THIRD FEILDS */}

                      <Row className="no-gutters">
                        {/* START DATE */}
                        <Col lg={6}>
                          <Form.Group as={Col} sm={12} md={12} lg={12}>
                            <div className="d-flex flex-column w-100 ">
                              <Form.Label className="label req">
                                Start Date
                              </Form.Label>
                              <Field>
                                {({ form, Field }) => {
                                  return (
                                    <DatePicker
                                      className="w-100"
                                      name="startDate"
                                      selected={values.startDate}
                                      onChange={(date) => {
                                        setFieldValue("startDate", date);
                                      }}
                                    />
                                  );
                                }}
                              </Field>

                              <Form.Control.Feedback type="invalid">
                                {errors.startDate}
                              </Form.Control.Feedback>
                            </div>
                          </Form.Group>
                        </Col>

                        {/* END DATE */}
                        <Col lg={6}>
                          <Form.Group as={Col} sm={12} md={12} lg={12}>
                            <div className="d-flex flex-column">
                              <Form.Label className="label req">
                                End Date
                              </Form.Label>
                              <Field>
                                {({ form, Field }) => {
                                  return (
                                    <DatePicker
                                      className="w-100"
                                      name="endDate"
                                      selected={values.endDate}
                                      onChange={(date) => {
                                        setFieldValue("endDate", date);
                                      }}
                                    />
                                  );
                                }}
                              </Field>

                              <Form.Control.Feedback type="invalid">
                                {errors.endDate}
                              </Form.Control.Feedback>
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* FOUTH ROW */}

                      <Row className="no-gutters">
                        {/* COMPANY INDUSTRY */}
                        <Col lg={6}>
                          <SelectorInput
                            feildProps={fieldProps}
                            value={values.industry}
                            options={experience.industry}
                            name="industry"
                            label="Industry"
                            req
                          />
                        </Col>

                        {/* JOB CATEGORIES */}
                        <Col lg={6}>
                          <SelectorInput
                            feildProps={fieldProps}
                            value={values.jobCategory}
                            options={experience.jobCategory}
                            name="jobCategory"
                            label="Job category"
                            req
                          />
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

                        {experienceState?.complete === 1 && (
                          <CancelBtn
                            handleClick={() => {
                              setShowForm(false);
                            }}
                          />
                        )}
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

export default WorkExpForm;

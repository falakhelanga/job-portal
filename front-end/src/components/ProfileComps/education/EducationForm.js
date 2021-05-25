import React from "react";
import FormContainer from "../FormContainer";
import { Form, Col, Row, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { educationvalidation } from "../fromik/validationSchemas";
import { educationInit } from "../fromik/initialvalues";

import { education } from "../fromik/selectorsOption";
import { SelectorInput, TextInput } from "../formutils/FormGroups";

import { useDispatch, useSelector } from "react-redux";
import { createEducation } from "../../../store/actions/user";

import "react-datepicker/dist/react-datepicker.css";
import FormBtn from "../SaveBtn";
import CancelBtn from "../CancelBtn";

const EduForm = ({
  showForm,
  setShowForm,
  populatedValues,
  setShowSnackBar,
}) => {
  const profileState = useSelector((state) => state.fetchProfile);
  const createEducationState = useSelector((state) => state.createEducation);
  const { education: educationState } = profileState;
  const { loading } = createEducationState;

  const dispatch = useDispatch();
  const experiencelForm = (values, onSubmitProps) => {
    const { gradyear, institution, subjects, qualification, educationId } =
      values;
    dispatch(
      createEducation(
        gradyear,
        institution,
        subjects,
        qualification,
        educationId,
        onSubmitProps,
        setShowForm,
        setShowSnackBar
      )
    );
  };
  return (
    (educationState?.complete !== 1 || showForm) && (
      <div>
        <FormContainer title="Education">
          <div className="d-flex flex-column">
            {/* FORM ROW */}
            <div>
              <Formik
                initialValues={populatedValues || educationInit}
                validationSchema={educationvalidation}
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
                        {/* GRADUATION YEAR*/}
                        <Col lg={12}>
                          <TextInput
                            feildProps={fieldProps}
                            name="gradyear"
                            label="Graduation Year"
                            placeholder="Your Graduation Year"
                            type="text"
                            value={values.gradyear}
                          />
                        </Col>
                      </Row>

                      {/* SECOND FIELDS */}
                      <Row className="no-gutters">
                        {/* INSTITUTION*/}
                        <Col lg={12}>
                          <TextInput
                            feildProps={fieldProps}
                            name="institution"
                            label="Institution"
                            placeholder="Institution"
                            type="text"
                            value={values.institution}
                          />
                        </Col>
                      </Row>

                      {/* THIRD FEILDS */}

                      <Row className="no-gutters">
                        {/* FIELD STUDY */}
                        <Col lg={12}>
                          <TextInput
                            feildProps={fieldProps}
                            name="subjects"
                            label="Field of study and subjects"
                            placeholder="Field of study and subjects"
                            type="text"
                            value={values.subjects}
                          />
                        </Col>

                        {/* FOUTH ROW */}
                      </Row>
                      {/* QUALIFIFICATION */}
                      <Row>
                        <Col lg={12}>
                          <SelectorInput
                            feildProps={fieldProps}
                            value={values.qualification}
                            options={education.Qualification}
                            name="qualification"
                            label="Qualification"
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

                        {educationState?.complete === 1 && (
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

export default EduForm;

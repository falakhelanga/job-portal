import React, { useState, useEffect } from "react";
import MySpinner from "../components/spinner/MySpinner";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Alert,
  Spinner,
  Form,
  Button,
  Row,
  Col,
  Container,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import * as jobDispatch from "../store/actions/job";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const JobCreate = ({ history }) => {
  const dispatch = useDispatch();
  const JobCreateState = useSelector((state) => state.createJob);
  const { loading, error, message } = JobCreateState;
  const [image, setImage] = useState("");
  const jobTypes = [
    { key: "select job type", value: "" },
    { key: "permanent", value: "permanent" },
    { key: "temporary", value: "temporary" },
    { key: "contract", value: "contract" },
    { key: "part-time", value: "part-time" },
  ];

  const sectorTypes = [
    { key: "select sector", value: "" },
    { key: "engineering", value: "engineering" },
    { key: "System Development", value: "System Development" },
    { key: "Human Resources", value: "Human Resources" },
    { key: "Technical Support", value: "Technical Support" },
    { key: "Computer Networking", value: "Computer Networking" },
  ];

  const initialValues = {
    title: "",
    company: "",
    image_url: "",
    location: "",
    salary: "",
    job_type: "",
    company_details: "",
    job_description: "",
    qualification: "",
    requirements: "",
    benefical: "",
    sectors: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, "Your Title must have at least 10 charecters")
      .required("this feild is required"),
    company: Yup.string().required("This feild is required"),

    location: Yup.string().required("This feild is required"),
    salary: Yup.string().required("This feild is required"),
    job_type: Yup.string().required("This feild is required"),
    company_details: Yup.string()
      .min(100, "Your Company Details must have at least 100 charecters")
      .required("This feild is required"),
    job_description: Yup.string()
      .min(100, "Your Job description must have at least 100 charecters")
      .required("This feild is required"),
    qualification: Yup.string().required("This feild is required"),
    requirements: Yup.string().required("This feild is required"),
    sectors: Yup.string().required("This feild is required"),
  });

  const onSubmit = (values, onSubmitProps) => {
    console.log({ values });
    console.log(onSubmitProps);
    dispatch(jobDispatch.createJob({ ...values, image_url: image }));
    // onSubmitProps.resetForm();
    setImage("");
    // history.goBack();
  };
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccAlert, setShowSuccAlert] = useState(false);
  const [imageError, setImageError] = useState(null);

  const [uploadedPercent, setUploadedPercent] = useState(0);
  const [showImageSucc, setShowImageSucc] = useState(false);
  const [showPrgress, setShowProgres] = useState(false);

  useEffect(() => {
    if (error !== null) setShowAlert(true);
    if (message !== null) setShowSuccAlert(true);
  }, [error, message]);

  const imageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setShowProgres(true);
    setShowImageSucc(false);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        setUploadedPercent(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
        setTimeout(() => {
          setUploadedPercent(0);
          setShowImageSucc(true);
          setShowProgres(false);
        }, 2000);
      },
    };

    try {
      const url = "http://localhost:5000/api/uploads/";
      const { data } = await axios.post(url, formData, config);

      setImage(data);
    } catch (error) {
      const err = error.response
        ? error.response.data
        : error.response.data.message;
      setImageError(err);
    }
  };
  return (
    <div>
      <Container fluid className="mt-3">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            touched,
            isValid,
            isSubmitting,
            errors,
          }) => {
            return (
              <Row
                className=" d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <Col sm={12} md={8} lg={8}>
                  <div className=" d-flex justify-content-between w-100 mb-3">
                    <h2 className="my-2">Create a Job Post</h2>
                    <Button
                      variant="light"
                      onClick={() => {
                        history.goBack();
                      }}
                    >
                      Go Back To Posts{" "}
                    </Button>
                  </div>
                  {showAlert && (
                    <Alert variant="danger" dismissible className="mt-2">
                      <p>{error}</p>
                    </Alert>
                  )}
                  {showSuccAlert && (
                    <Alert variant="success" dismissible className="mt-2">
                      <p>{message}</p>
                    </Alert>
                  )}
                  <Form
                    onSubmit={handleSubmit}
                    className="mx-auto justify-content-center  d-flex align-items-center flex-column border rounded py-3"
                  >
                    {/* JOB TITLE FEILD */}
                    <FormGroup as={Col} sm={12} md={12} lg={12}>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl
                        type="text"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.title && errors.title}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.title}
                      </FormControl.Feedback>
                    </FormGroup>

                    {/* COMPANY NAME FEILD */}
                    <FormGroup as={Col} sm={12} md={12} lg={12}>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl
                        type="text"
                        name="company"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.company && errors.company}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.company}
                      </FormControl.Feedback>
                    </FormGroup>

                    {/* LOCATION FEILD */}
                    <FormGroup as={Col} sm={12} md={12} lg={12}>
                      <FormLabel>Location</FormLabel>
                      <FormControl
                        type="text"
                        name="location"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.location && errors.location}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.location}
                      </FormControl.Feedback>
                    </FormGroup>

                    {/* SALARY FEILD */}
                    <FormGroup as={Col} sm={12} md={12} lg={12}>
                      <FormLabel>Salary</FormLabel>
                      <FormControl
                        type="number"
                        name="salary"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.salary && errors.salary}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.salary}
                      </FormControl.Feedback>
                    </FormGroup>

                    {/* QUALIFICATION TYPE */}

                    <FormGroup as={Col} sm={12} md={12} lg={12}>
                      <FormLabel>Qualification</FormLabel>
                      <FormControl
                        type="text"
                        name="qualification"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.qualification && errors.qualification
                        }
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.qualification}
                      </FormControl.Feedback>
                    </FormGroup>

                    {/* JOB TYPE FEILD */}
                    <Form.Group as={Col} sm={12} md={12} lg={12}>
                      <Form.Label>Job Type</Form.Label>
                      <Form.Control
                        as="select"
                        name="job_type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.job_type && errors.job_type}
                      >
                        {jobTypes.map((curr, index) => {
                          return (
                            <option key={index} value={curr.value}>
                              {curr.key}
                            </option>
                          );
                        })}
                      </Form.Control>
                      <FormControl.Feedback type="invalid">
                        {errors.job_type}
                      </FormControl.Feedback>
                    </Form.Group>

                    {/* JOB SECTORS */}
                    <Form.Group as={Col} sm={12} md={12} lg={12}>
                      <Form.Label>Sectors</Form.Label>
                      <Form.Control
                        as="select"
                        name="sectors"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.sectors && errors.sectors}
                      >
                        {sectorTypes.map((curr, index) => {
                          return (
                            <option key={index} value={curr.value}>
                              {curr.key}
                            </option>
                          );
                        })}
                      </Form.Control>
                      <FormControl.Feedback type="invalid">
                        {errors.sectors}
                      </FormControl.Feedback>
                    </Form.Group>

                    {/* COMPANY DETAILS */}

                    <Form.Group as={Col} sm={12} md={12} lg={12}>
                      <Form.Label>Company Details</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="company_details"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.company_details && errors.company_details
                        }
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.company_details}
                      </FormControl.Feedback>
                    </Form.Group>

                    {/* JOB DESCRIPTION */}

                    <Form.Group as={Col} sm={12} md={12} lg={12}>
                      <Form.Label>Job Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="job_description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.job_description && errors.job_description
                        }
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.job_description}
                      </FormControl.Feedback>
                    </Form.Group>

                    {/* REQUIREMENT */}

                    <Form.Group as={Col} sm={12} md={12} lg={12}>
                      <Form.Label>Requirements</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="requirements"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.requirements && errors.requirements}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.requirements}
                      </FormControl.Feedback>
                    </Form.Group>

                    {/* BENEFICAL */}

                    <Form.Group as={Col} sm={12} md={12} lg={12}>
                      <Form.Label>Benefical</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="benefical"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.benefical}
                      </FormControl.Feedback>
                    </Form.Group>

                    {/* IMAGE UPLOAD */}
                    <FormGroup as={Col} sm={12} md={12} lg={12}>
                      <FormLabel>Upload Image or enter image url</FormLabel>
                      <FormControl
                        type="text"
                        name="image_url"
                        onChange={(e) => {
                          setImage(e.target.value);
                        }}
                        value={image}
                        onBlur={handleBlur}
                        isInvalid={touched.image_url && errors.image_url}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.image_url}
                      </FormControl.Feedback>
                    </FormGroup>
                    <Form.Group as={Col} sm={12} md={12} lg={12}>
                      {imageError && (
                        <Alert variant="danger" dismissible className="mt-2">
                          <p>{imageError}</p>
                        </Alert>
                      )}
                      {showImageSucc && (
                        <Alert variant="success" dismissible className="mt-2">
                          <p>Image uploaded successfully</p>
                        </Alert>
                      )}
                      {showPrgress && (
                        <div
                          style={{
                            width: "100px",
                            height: "30px",
                            position: "relative",
                          }}
                          className="my-3"
                        >
                          <CircularProgress
                            variant="determinate"
                            value={uploadedPercent}
                          />
                        </div>
                      )}

                      <Form.File
                        id="exampleFormControlFile1"
                        onChange={(e) => {
                          imageHandler(e);
                        }}
                      />
                    </Form.Group>

                    <Col sm={12} md={8} lg={4}>
                      <Button
                        type="submit"
                        variant="dark"
                        disabled={!isValid || loading}
                        className="btn-block"
                        style={{
                          fontweight: "bold",
                        }}
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
                          "create post"
                        )}
                      </Button>
                    </Col>
                  </Form>
                  ;
                </Col>
              </Row>
            );
          }}
        </Formik>
      </Container>
    </div>
  );
};

export default JobCreate;

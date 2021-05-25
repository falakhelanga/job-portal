import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import Truncate from "react-truncate-markup";
import { Link } from "react-router-dom";
import moment from "moment";

const JobsPost = ({
  title,
  image_url,
  id,
  company,
  createdAt,
  description,
  location,
}) => {
  return (
    <Row className="no-gutters  rounded p-3 bg-white mt-2">
      {/* IMAGE COLUMN */}
      {image_url !== "" && (
        <Col className="mr-2 d-flex align-items-center" sm={1}>
          <Image
            className="p-1 bordered rounded job_image"
            src={image_url}
            alt="job-image"
            fluid
            style={{
              border: "1px solid #f5f5f5",
            }}
          />
        </Col>
      )}
      {/* DETAILS COLUMN     */}
      <Col className="ml-1">
        <div>
          <Link to={`/job/${id}`} style={{ color: "black" }}>
            <h3
              className="text-capitalize"
              style={{
                fontWeight: "bold",
              }}
            >
              {title}
            </h3>
          </Link>

          <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            {company}
          </div>
          <div className="d-flex">
            {/* LOCATIN DIV */}
            <div className="d-flex align-items-center">
              <LocationOnOutlinedIcon fontSize="small" />
              <span className=" ml-1 text-capitalize">{location}</span>
            </div>
            {/* DATE DIV */}
            <div className="d-flex ml-3 align-items-center">
              <CalendarTodayOutlinedIcon fontSize="small" />
              <span className="ml-1">{moment(createdAt).fromNow()}</span>
            </div>
          </div>
          <div className="mt-1 d-none d-lg-block">
            <Link
              to={`/job/${id}`}
              style={{ color: "black", textDecoration: "none" }}
            >
              <Truncate lines={2}>
                <div>{description}</div>
              </Truncate>
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default JobsPost;

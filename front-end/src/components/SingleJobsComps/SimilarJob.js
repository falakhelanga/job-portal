import { Image } from "react-bootstrap";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import { Link } from "react-router-dom";
import moment from "moment";
const SimilarJob = ({ image, id, title, company, location, createdAt }) => {
  return (
    <div
      className=""
      style={{
        borderBottom: "1px solid #D8D8D8",
        borderTop: "1px solid #D8D8D8",
      }}
    >
      <div
        className="d-flex bg-white px-2 py-3"
        style={{
          borderRadius: "5px",
        }}
      >
        {/* IMAGE COLUMN */}
        {image !== "" && (
          <div>
            <Image
              src={image}
              alt="job image"
              style={{
                height: "50px",
                width: "50px",
                border: "#f5f5f5 1px solid",
                padding: "5px",
              }}
            />
          </div>
        )}

        {/*JOB DETAILS COL */}

        <div className="ml-3">
          <Link to={`/job/${id}`}>
            <h5 className="ml-2">{title}</h5>
          </Link>

          <div className="d-flex">
            {/* LOCATION */}
            <div className="d-flex">
              <LocationOnOutlinedIcon fontSize="small" />{" "}
              <span className="ml-2">{location}</span>
            </div>
            {/* DATE POSTED  */}
            <div className="d-flex ml-2">
              <CalendarTodayOutlinedIcon fontSize="small" />{" "}
              <span className="ml-2">{moment(createdAt).fromNow()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarJob;

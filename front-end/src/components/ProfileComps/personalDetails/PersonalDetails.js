import FormContainer from "../FormContainer";
import EmailIcon from "@material-ui/icons/Email";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useSelector } from "react-redux";

import { Image } from "react-bootstrap";

const PersonalDetails = ({
  showDetails,
  setShowDetails,
  setShowForm,
  setPopulatedvalues,
}) => {
  const profileState = useSelector((state) => state.fetchProfile);
  const { personal } = profileState;
  const handleClick = () => {
    setPopulatedvalues({
      gender: personal.gender,
      title: personal.title,
      ethnicity: personal.ethnicity,
      firstName: personal.firstName,
      surname: personal.surname,
      phoneNumber: personal.phoneNumber,
      citizeship: personal.citizeship,
      saId: personal.saId,
      dob: new Date(personal.dob),
      relocate: personal.relocate,
      currCity: personal.currCity,
      disability: personal.disability,
      introduction: personal.introduction,
      email: personal.email,
    });

    setShowForm(true);
  };
  return (
    personal?.complete === 1 && (
      <div>
        <FormContainer
          title="personal details"
          edit
          handleClick={() => {
            handleClick();
          }}
        >
          {/* TOP DIV */}
          <div className="d-flex flex-column flex-lg-row">
            {/* IMAGE COLUMN*/}
            <div className="d-flex align-items-center justify-content-center profile_pic">
              <Image
                src={personal?.profile_url}
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

            {/* DETAILS DIV */}
            <div className="ml-3">
              <h5 style={{ fontWeight: "bold" }} className="text-capitalize">
                {`${personal?.title} ${personal?.firstName} ${personal?.surname}`}
              </h5>

              {/* GENDER */}
              <div
                className="text-capitalize"
                style={{
                  fontSize: "1.2rem",
                }}
              >
                {`${personal?.gender} ${personal?.ethnicity} ${personal?.citizeship} citizen`}
              </div>

              {/* RELOCATE */}
              <div
                className=""
                style={{
                  fontSize: "1.2rem",
                }}
              >
                Willing to relocate: {personal?.relocate}
              </div>

              {/* DATAE OF BIRTH */}
              <div
                className=""
                style={{
                  fontSize: "1.2rem",
                }}
              >
                {new Date(personal?.dob).toLocaleDateString()}
              </div>

              {/* CONTACT DETAILS DIV */}
              <div className="d-flex flex-column flex-lg-row mt-2 ">
                {/* EMAIL */}
                <div className="d-flex align-items-center">
                  <EmailIcon fontSize="small" />{" "}
                  <span className="ml-2">{personal?.email}</span>
                </div>
                {/* Phone */}
                <div className="d-flex align-items-center cont-details">
                  <PhoneAndroidIcon fontSize="small" />{" "}
                  <span className="ml-2">{personal?.phoneNumber}</span>
                </div>
                {/* LOCATION */}
                <div className="d-flex align-items-center  cont-details">
                  <LocationOnIcon fontSize="small" />{" "}
                  <span className="ml-2 text-capitalize">
                    {" "}
                    {personal?.currCity}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM DIV */}
          <div className="mt-3">{personal?.introduction}</div>
        </FormContainer>
      </div>
    )
  );
};

export default PersonalDetails;

import { useState } from "react";
import EduForm from "./EducationForm";
import { useSelector } from "react-redux";
import MySnackbar from "../../SnackBar";

import Educations from "./Educations";
const Personal = () => {
  const [showPersonalF, setShowPersonalF] = useState(false);
  const [showPersonalD, setShowPersonalD] = useState(true);
  const [populatedValues, setPopulatedvalues] = useState(null);

  const message = useSelector((state) => state.createEducation.message);
  const [showSnackBar, setShowSnackBar] = useState(false);
  return (
    <div>
      <MySnackbar
        showSnackBar={showSnackBar}
        setShowSnackBar={() => {
          setShowSnackBar(false);
        }}
        message={message}
      />

      <EduForm
        showForm={showPersonalF}
        setShowForm={setShowPersonalF}
        populatedValues={populatedValues}
        showSnackBar={showSnackBar}
        setShowSnackBar={setShowSnackBar}
      />
      <Educations
        showDetails={showPersonalD}
        setShowDetails={setShowPersonalD}
        setShowForm={setShowPersonalF}
        setPopulatedvalues={setPopulatedvalues}
      />
    </div>
  );
};

export default Personal;

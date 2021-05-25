import { useState } from "react";

import { useSelector } from "react-redux";
import MySnackbar from "../../SnackBar";
import WorkExperiences from "./WorkExperiences";
import WorkExpForm from "./WorkExpForm";
const Personal = () => {
  const [showPersonalF, setShowPersonalF] = useState(false);
  const [showPersonalD, setShowPersonalD] = useState(true);
  const [populatedValues, setPopulatedvalues] = useState(null);

  const message = useSelector((state) => state.createExperience.message);
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

      <WorkExpForm
        showForm={showPersonalF}
        setShowForm={setShowPersonalF}
        populatedValues={populatedValues}
        showSnackBar={showSnackBar}
        setShowSnackBar={setShowSnackBar}
      />
      <WorkExperiences
        showDetails={showPersonalD}
        setShowDetails={setShowPersonalD}
        setShowForm={setShowPersonalF}
        setPopulatedvalues={setPopulatedvalues}
      />
    </div>
  );
};

export default Personal;

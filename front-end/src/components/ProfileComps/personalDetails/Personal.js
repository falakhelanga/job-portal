import { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import PersonalForms from "./PersonalForms";
import { useSelector } from "react-redux";
import MySnackbar from "../../SnackBar";
const Personal = () => {
  const [showPersonalF, setShowPersonalF] = useState(false);
  const [showPersonalD, setShowPersonalD] = useState(true);
  const [populatedValues, setPopulatedvalues] = useState(null);
  const message = useSelector((state) => state.userProfile.message);
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
      <PersonalForms
        showForm={showPersonalF}
        setShowForm={setShowPersonalF}
        populatedValues={populatedValues}
        showSnackBar={showSnackBar}
        setShowSnackBar={setShowSnackBar}
      />
      <PersonalDetails
        showDetails={showPersonalD}
        setShowDetails={setShowPersonalD}
        setShowForm={setShowPersonalF}
        setPopulatedvalues={setPopulatedvalues}
      />
    </div>
  );
};

export default Personal;

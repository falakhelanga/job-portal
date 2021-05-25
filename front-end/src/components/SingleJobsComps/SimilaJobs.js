import { Row, Col, Image } from "react-bootstrap";
import SimilarJob from "./SimilarJob";

const style = {
  height: "80vh",
  position: "fixed",
  overflowY: "scroll",
};

const SimilarJobs = () => {
  return (
    <div className="px-3 py-3 bg-white d-none d-lg-block" style={style}>
      <h4 style={{ fontWeight: "bold" }}>Similar Jobs</h4>
      <SimilarJob />
      <SimilarJob />
      <SimilarJob />
      <SimilarJob />
      <SimilarJob />
      <SimilarJob />
      <SimilarJob />
      <SimilarJob />
    </div>
  );
};

export default SimilarJobs;

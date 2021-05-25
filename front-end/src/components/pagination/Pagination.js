import Pagination from "@material-ui/lab/Pagination";

const MyPagination = ({ count, handleChange, page }) => {
  return (
    <div className="w-100 d-flex justify-content-center">
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};

export default MyPagination;

import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import React, { useRef } from "react";
import searchAction from "../../store/actions/search";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
const Search = ({ history }) => {
  const searchRef = useRef();

  const dispatch = useDispatch();
  const searchHandler = () => {
    dispatch(searchAction(searchRef));
    if (searchRef.current.value.trim() !== "") {
      history.push(`/search/?keyword=${searchRef.current.value}`);
    }
  };
  return (
    <div className="search d-none d-md-flex">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchHandler();
        }}
      >
        <input
          ref={searchRef}
          type="text"
          placeholder="Job title, skill, company or location"
        />

        <div className="d-flex align-items-center justify-content-center icon-div">
          <IconButton
            type="submit"
            style={{ outline: "none" }}
            onClick={() => {
              searchHandler();
            }}
          >
            <SearchIcon className="search_icon mx-2 " />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export const MobileSearch = withRouter(({ history }) => {
  const searchRef = useRef();

  const dispatch = useDispatch();
  const searchHandler = () => {
    dispatch(searchAction(searchRef));
    if (searchRef.current.value.trim() !== "") {
      history.push(`/search/?keyword=${searchRef.current.value}`);
    }
  };
  return (
    <div className=" mobile_search pl-1  d-flex d-md-none ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchHandler();
        }}
      >
        <input
          ref={searchRef}
          type="text"
          placeholder="Job title, skill, company or location"
        />

        <div className="d-flex align-items-center justify-content-center icon-div">
          <IconButton
            type="submit"
            style={{ outline: "none" }}
            onClick={() => {
              searchHandler();
            }}
          >
            <SearchIcon className="search_icon  " />
          </IconButton>
        </div>
      </form>
    </div>
  );
});

export default withRouter(Search);

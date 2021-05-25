import React from "react";
import Body from "./layouts/Body";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Login from "./views/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./views/Register";
import JobCreate from "./views/JobCreate";
import EmployerJobs from "./views/EmployerJobs";
import SingleJob from "./views/SingleJob";
import JobsPosts from "./views/JobsPosts";
import ProfileView from "./views/ProfileView";
import WishList from "./views/WishList";
import SearchView from "./views/SearchView";
import LogOut from "./views/LogOut";
import Applicants from "./views/Applicants";
import Applications from "./views/Applications";

const App = () => {
  return (
    <Router>
      <Header />
      <Body>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/register" component={Register} />
          <Route path="/employerjobs" component={EmployerJobs} />
          <Route path="/applicants" component={Applicants} />
          <Route path="/applications" component={Applications} />
          <Route path="/search" component={SearchView} />
          <Route path="/jobcreate" component={JobCreate} />
          <Route path="/profile" component={ProfileView} />
          <Route path="/wishList" component={WishList} />
          <Route path="/job/:id" component={SingleJob} />
          <Route path="/" component={JobsPosts} />
        </Switch>
      </Body>
      <Footer />
    </Router>
  );
};

export default App;

import React from "react";
import Dashboard from "./Contentpages/Dashboard/Dashboard";
import Talentpage from "./Contentpages/Talentlist/Talent-page";
import Homepage from "./Contentpages/Pages/Homepage";
import Profile from "./Contentpages/Profile/Profile";
import Setting from "./Contentpages/Profile/Setting";

const MainContent = ({ content }) => {
  let Component;
  switch (content) {
    case "Profile":
      Component = Profile;
      break;
    case "Setting":
      Component = Setting;
      break;
    case "Dashboard":
      Component = Dashboard;
      break;
    case "TalentList":
      Component = Talentpage;
      break;
    default:
      Component = Homepage;
      break;
  }

  return (
    <>
      <Component />
    </>
  );
};

export default MainContent;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";

function Header() {
  const router = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const {setUser} = useContext(UserContext)

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const logOut = () => {
    setUser(null)
    localStorage.removeItem("token");
    router("/login");
  };
  return (
    <>
      <section className="header">
        <div className="search">
          <input type="search" placeholder="Search" aria-label="Search" />
        </div>
        <div className="headericon">
          <div>
            <i className="fa-solid fa-bell"></i>
          </div>

          <div className="user-profile" onClick={handleProfileClick}>
            <i className="fa-solid fa-user-tie"></i>
            {showDropdown && (
              <div className="dropdown user-drop">
                <button className="user-logout" onClick={logOut}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;


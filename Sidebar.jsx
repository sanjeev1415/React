import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import logo from "../images/mob-logo 2.png";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios"; // To make API calls

const validationSchema = Yup.object({
  name: Yup.string().required("Page name is required"),
});

function Sidebar() {
  const [pageEdit, setPageEdit] = useState(null);
  const [data, setData] = useState([{ _id: "1", name: "Sample Page 1" }]);
  const [services, setServices] = useState([]); // New state to store API data
  const [activeMenuItem, setActiveMenuItem] = useState("");
  const [showPagesDropdown, setShowPagesDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false); // New state for Services dropdown
  const [showModal, setShowModal] = useState(false);
  const [selectedDD, setSelectedDD] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://agile.digiwbs.com/Admin/api/services"
        );
        setServices(response.data); // Assuming response.data contains the array of services
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const toggleDropdown2 = (id) => {
    setSelectedDD(id);
    setDropdownOpen(!isDropdownOpen);
  };

  const handleEditClick = (page) => {
    setPageEdit(page);
    formik.setValues({ name: page.name });
    openModal();
  };

  const handleDeleteClick = (pageId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((page) => page._id !== pageId));
        Swal.fire("Deleted!", "Your page has been deleted.", "success");
      }
    });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setDropdownOpen(false);
    setPageEdit(null);
    formik.resetForm();
  };

  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item);
  };

  const toggleDropdown = () => {
    setShowPagesDropdown(!showPagesDropdown);
  };

  const toggleServicesDropdown = () => {
    setShowServicesDropdown(!showServicesDropdown);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (pageEdit) {
        setData((prevData) =>
          prevData.map((page) =>
            page._id === pageEdit._id ? { ...page, name: values.name } : page
          )
        );
        Swal.fire("Success", "Page updated successfully", "success");
      } else {
        const newPage = {
          _id: Date.now().toString(),
          name: values.name,
        };
        setData((prevData) => [...prevData, newPage]);
        Swal.fire("Success", "Page created successfully", "success");
      }
      closeModal();
    },
  });

  return (
    <>
      <aside className="sidebar">
        <div className="text-start">
          <NavLink className="navbar-brand" to="/admin">
            <img className="logo" src={logo} alt="logo" loading="lazy" />
          </NavLink>
          <p className="menutxt">MENU</p>
          <ul>
            <NavLink
              to="/admin/profile"
              onClick={() => handleMenuItemClick("profile")}
              className={activeMenuItem === "profile" ? "activee" : ""}
            >
              <i className="fa-regular fa-user"></i>Profile
            </NavLink>

            <NavLink
              to="/admin/dashboard"
              onClick={() => handleMenuItemClick("dashboard")}
              className={activeMenuItem === "dashboard" ? "activee" : ""}
            >
              <i className="fa-solid fa-house"></i>Dashboard
            </NavLink>

            <NavLink
              to="/admin/services"
              onClick={() => handleMenuItemClick("services")}
              className={activeMenuItem === "services" ? "activee" : ""}
            >
              <i className="fa-solid fa-list"></i>Services
            </NavLink>

            {/* Pages Dropdown */}
            <li
              onClick={toggleDropdown}
              className={showPagesDropdown ? "activee " : ""}
            >
              <i className="fa-solid fa-note-sticky"></i>Pages
              <i
                className={`fa-solid fa-chevron-down up-arrow ${
                  showPagesDropdown ? "rotate-90deg" : ""
                }`}
              ></i>
              {showPagesDropdown && (
                <div className="dropp" onClick={(e) => e.stopPropagation()}>
                  <ul>
                    {data.map((val) => (
                      <div key={val._id}>
                        <Link
                          to={`/admin/pages/${val._id}`}
                          onClick={() => handleMenuItemClick(val.name)}
                        >
                          <li
                            className={
                              activeMenuItem === val.name
                                ? "active-subitem"
                                : ""
                            }
                          >
                            <div className="d-flex justify-content-between">
                              {val.name}
                              <div className="dropdown">
                                <button
                                  className="dropdown-toggle"
                                  type="button"
                                  id={`dropdownMenuButton_${val._id}`}
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded={
                                    isDropdownOpen && selectedDD === val._id
                                      ? "true"
                                      : "false"
                                  }
                                  onClick={() => toggleDropdown2(val._id)}
                                >
                                  <i className="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                                <div
                                  className={`dropdown-menu ${
                                    isDropdownOpen && selectedDD === val._id
                                      ? "show"
                                      : ""
                                  }`}
                                  aria-labelledby={`dropdownMenuButton_${val._id}`}
                                >
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleEditClick(val)}
                                  >
                                    <i className="fa fa-pen"></i>Edit
                                  </button>
                                  <button
                                    className="dropdown-item mt-3"
                                    onClick={() => handleDeleteClick(val._id)}
                                  >
                                    <i className="fa fa-trash"></i>Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </Link>
                      </div>
                    ))}
                  </ul>
                  <button className="new-page-btn" onClick={openModal}>
                    {pageEdit ? "+ Edit page" : "+ Create New Page"}
                  </button>
                  {showModal && (
                    <div className="new-page">
                      <span className="close" onClick={closeModal}>
                        &times;
                      </span>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter page name"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="error">{formik.errors.name}</div>
                        ) : null}
                        <button onClick={formik.handleSubmit}>Save</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </li>

            {/* Services Dropdown */}
            <li
              onClick={toggleServicesDropdown}
              className={showServicesDropdown ? "activee " : ""}
            >
              <i className="fa-solid fa-cogs"></i>Service Pages
              <i
                className={`fa-solid fa-chevron-down up-arrow ${
                  showServicesDropdown ? "rotate-90deg" : ""
                }`}
              ></i>
              {showServicesDropdown && (
                <div className="dropp" onClick={(e) => e.stopPropagation()}>
                  <ul>
                    {services.map((service) => (
                      <div key={service.id}>
                        <Link to={`/admin/services/edit/${service.id}`}>
                          <li
                            className={
                              activeMenuItem === service.name
                                ? "active-subitem"
                                : ""
                            }
                          >
                            {service.name}
                          </li>
                        </Link>
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "./style/Adminstyle.css"; // Import custom CSS for styling

const EditServicePage = () => {
  const { serviceName } = useParams();

  // Initial state with empty fields
  const [service, setService] = useState({
    bannerImage: "",
    name: serviceName || "",
    description: "",
    benefits: [{ icon: "", name: "", description: "" }],
    focusArea: "",
    technologies: [""],
    whyChooseUs: {
      shortDescription: "",
      details: [{ icon: "", title: "", description: "" }],
    },
    faqs: [{ question: "", answer: "" }],
  });

  // Handle file upload for banner image and icons
  const handleFileUpload = (e, field, index = null, section = "") => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (section === "benefits" || section === "whyChooseUs") {
        const updatedItems = service[section].map((item, i) =>
          i === index ? { ...item, icon: reader.result } : item
        );
        setService((prevService) => ({
          ...prevService,
          [section]: updatedItems,
        }));
      } else {
        setService((prevService) => ({
          ...prevService,
          [field]: reader.result,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleEditorChange = (value, field) => {
    setService((prevService) => ({
      ...prevService,
      [field]: value,
    }));
  };

  // Handlers for Benefits
  const handleBenefitsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBenefits = service.benefits.map((benefit, i) =>
      i === index ? { ...benefit, [name]: value } : benefit
    );
    setService((prevService) => ({
      ...prevService,
      benefits: updatedBenefits,
    }));
  };

  const handleBenefitsAdd = () => {
    setService((prevService) => ({
      ...prevService,
      benefits: [
        ...prevService.benefits,
        { icon: "", name: "", description: "" },
      ],
    }));
  };

  const handleBenefitsRemove = (index) => {
    setService((prevService) => ({
      ...prevService,
      benefits: prevService.benefits.filter((_, i) => i !== index),
    }));
  };

  // Handlers for Technologies
  const handleTechnologiesChange = (index, e) => {
    const { value } = e.target;
    const updatedTechnologies = service.technologies.map((tech, i) =>
      i === index ? value : tech
    );
    setService((prevService) => ({
      ...prevService,
      technologies: updatedTechnologies,
    }));
  };

  const handleTechnologiesAdd = () => {
    setService((prevService) => ({
      ...prevService,
      technologies: [...prevService.technologies, ""],
    }));
  };

  const handleTechnologiesRemove = (index) => {
    setService((prevService) => ({
      ...prevService,
      technologies: prevService.technologies.filter((_, i) => i !== index),
    }));
  };

  // Handlers for Why Choose Us
  const handleWhyChooseUsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = service.whyChooseUs.details.map((detail, i) =>
      i === index ? { ...detail, [name]: value } : detail
    );
    setService((prevService) => ({
      ...prevService,
      whyChooseUs: {
        ...prevService.whyChooseUs,
        details: updatedDetails,
      },
    }));
  };

  const handleWhyChooseUsAdd = () => {
    setService((prevService) => ({
      ...prevService,
      whyChooseUs: {
        ...prevService.whyChooseUs,
        details: [
          ...prevService.whyChooseUs.details,
          { icon: "", title: "", description: "" },
        ],
      },
    }));
  };

  const handleWhyChooseUsRemove = (index) => {
    setService((prevService) => ({
      ...prevService,
      whyChooseUs: {
        ...prevService.whyChooseUs,
        details: prevService.whyChooseUs.details.filter((_, i) => i !== index),
      },
    }));
  };

  // Handlers for FAQs
  const handleFaqChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaqs = service.faqs.map((faq, i) =>
      i === index ? { ...faq, [name]: value } : faq
    );
    setService((prevService) => ({
      ...prevService,
      faqs: updatedFaqs,
    }));
  };

  const handleFaqAdd = () => {
    setService((prevService) => ({
      ...prevService,
      faqs: [...prevService.faqs, { question: "", answer: "" }],
    }));
  };

  const handleFaqRemove = (index) => {
    setService((prevService) => ({
      ...prevService,
      faqs: prevService.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Service Data:", service);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-service-form">
      <h1 className="form-header">Edit Service: {service.name}</h1>

      {/* Banner Image Upload */}
      <div className="form-group">
        <label className="form-label">Banner Image:</label>
        <input
          type="file"
          name="bannerImage"
          onChange={(e) => handleFileUpload(e, "bannerImage")}
          className="form-control file-input"
        />
        {service.bannerImage && (
          <img
            src={service.bannerImage}
            alt="Banner Preview"
            className="image-preview"
          />
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Service Name:</label>
        <input
          type="text"
          name="name"
          value={service.name}
          onChange={handleChange}
          className="form-control service-name-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description:</label>
        <ReactQuill
          value={service.description}
          onChange={(value) => handleEditorChange(value, "description")}
          className="quill-editor description-editor"
        />
      </div>

      <h2 className="section-header">Benefits</h2>
      {service.benefits.map((benefit, index) => (
        <div key={index} className="benefit-section">
          <label className="form-label">Icon:</label>
          <input
            type="file"
            name="icon"
            onChange={(e) => handleFileUpload(e, "", index, "benefits")}
            className="form-control file-input"
          />
          {benefit.icon && (
            <img
              src={benefit.icon}
              alt={`Icon ${index + 1}`}
              className="image-preview"
            />
          )}
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={benefit.name}
            onChange={(e) => handleBenefitsChange(index, e)}
            className="form-control benefit-name-input"
          />
          <label className="form-label">Description:</label>
          <ReactQuill
            value={benefit.description}
            onChange={(value) =>
              handleBenefitsChange(index, {
                target: { name: "description", value },
              })
            }
            className="quill-editor benefit-description-editor"
          />
          <button
            type="button"
            onClick={() => handleBenefitsRemove(index)}
            className="remove-btn benefit-remove-btn"
          >
            Remove Benefit
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleBenefitsAdd}
        className="add-btn benefit-add-btn"
      >
        Add Benefit
      </button>

      <div className="form-group">
        <label className="form-label">Focus Area:</label>
        <input
          type="text"
          name="focusArea"
          value={service.focusArea}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <h2 className="section-header">Supported Technologies</h2>
      {service.technologies.map((tech, index) => (
        <div key={index} className="technology-section">
          <input
            type="text"
            value={tech}
            onChange={(e) => handleTechnologiesChange(index, e)}
            className="form-control technology-input"
          />
          <button
            type="button"
            onClick={() => handleTechnologiesRemove(index)}
            className="remove-btn technology-remove-btn"
          >
            Remove Technology
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleTechnologiesAdd}
        className="add-btn technology-add-btn"
      >
        Add Technology
      </button>

      <h2 className="section-header">Why Choose Us</h2>
      <div className="form-group">
        <label className="form-label">Short Description:</label>
        <ReactQuill
          value={service.whyChooseUs.shortDescription}
          onChange={(value) =>
            handleEditorChange(value, "whyChooseUs.shortDescription")
          }
          className="quill-editor"
        />
      </div>
      {service.whyChooseUs.details.map((detail, index) => (
        <div key={index} className="why-choose-us-section">
          <label className="form-label">Icon:</label>
          <input
            type="file"
            onChange={(e) =>
              handleFileUpload(e, "", index, "whyChooseUs")
            }
            className="form-control file-input"
          />
          {detail.icon && (
            <img
              src={detail.icon}
              alt={`Icon ${index + 1}`}
              className="image-preview"
            />
          )}
          <label className="form-label">Title:</label>
          <input
            type="text"
            name="title"
            value={detail.title}
            onChange={(e) => handleWhyChooseUsChange(index, e)}
            className="form-control title-input"
          />
          <label className="form-label">Description:</label>
          <ReactQuill
            value={detail.description}
            onChange={(value) =>
              handleWhyChooseUsChange(index, {
                target: { name: "description", value },
              })
            }
            className="quill-editor"
          />
          <button
            type="button"
            onClick={() => handleWhyChooseUsRemove(index)}
            className="remove-btn"
          >
            Remove Detail
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleWhyChooseUsAdd}
        className="add-btn"
      >
        Add Detail
      </button>

      <h2 className="section-header">Frequently Asked Questions</h2>
      {service.faqs.map((faq, index) => (
        <div key={index} className="faq-section">
          <label className="form-label">Question:</label>
          <input
            type="text"
            name="question"
            value={faq.question}
            onChange={(e) => handleFaqChange(index, e)}
            className="form-control question-input"
          />
          <label className="form-label">Answer:</label>
          <ReactQuill
            value={faq.answer}
            onChange={(value) =>
              handleFaqChange(index, {
                target: { name: "answer", value },
              })
            }
            className="quill-editor"
          />
          <button
            type="button"
            onClick={() => handleFaqRemove(index)}
            className="remove-btn"
          >
            Remove FAQ
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleFaqAdd}
        className="add-btn"
      >
        Add FAQ
      </button>

      <button type="submit" className="submit-btn">
        Save Service
      </button>
    </form>
  );
};

export default EditServicePage;

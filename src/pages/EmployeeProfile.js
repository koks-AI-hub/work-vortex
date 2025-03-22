import React from "react";
import "./EmployeeProfile.css"; // Import the CSS file for styling

const EmployeeProfile = () => {
  const employee = {
    personalDetails: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 890",
      address: "123 Main Street, City, Country",
    },
    educationDetails: {
      degree: "Bachelor of Science in Computer Science",
      university: "MIT",
      graduationYear: 2015,
    },
    workExperience: [
      {
        position: "Software Engineer",
        company: "Tech Solutions Inc.",
        years: "2016 - 2019",
      },
      {
        position: "Senior Developer",
        company: "Innovatech",
        years: "2019 - Present",
      },
    ],
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <h2 className="profile-name">{employee.personalDetails.name}</h2>
          <p className="profile-position">Senior Developer</p>
        </div>

        <div className="profile-details">
          <h2 className="section-title">Personal Details</h2>
          <div className="section-content">
            <p><strong>Email:</strong> {employee.personalDetails.email}</p>
            <p><strong>Phone:</strong> {employee.personalDetails.phone}</p>
            <p><strong>Address:</strong> {employee.personalDetails.address}</p>
          </div>

          <h2 className="section-title">Education Details</h2>
          <div className="section-content">
            <p><strong>Degree:</strong> {employee.educationDetails.degree}</p>
            <p><strong>University:</strong> {employee.educationDetails.university}</p>
            <p><strong>Graduation Year:</strong> {employee.educationDetails.graduationYear}</p>
          </div>

          <h2 className="section-title">Work Experience</h2>
          <div className="section-content">
            {employee.workExperience.map((experience, index) => (
              <div key={index} className="experience-item">
                <p><strong>Position:</strong> {experience.position}</p>
                <p><strong>Company:</strong> {experience.company}</p>
                <p><strong>Years:</strong> {experience.years}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;

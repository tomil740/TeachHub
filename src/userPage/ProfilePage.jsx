import "../userPage/ProfilePage.css";
import { useState } from "react";
import UserPreview from "./components/UserPreview";
import UserInfo from "./components/UserInfo";

export default function ProfilePage() {
  //the shred db user object
  const [user, setUser] = useState({
    name: "Ohad",
    coins: 100,
    rating: "4.7/5",
    basicStatistics: "need to be improved...",
    feedback: "daniel: amazing, shara: good",
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQi2Mm5P8j09P4hPKa1B-t9eIOHzHmR7IBkw&s",
    language: ["Hebrew"],
    profession: "engineering",
    culture: "Jewish",
    academicInstitution: "University of Haifa",
    typeOfService: ["Private lessons"],
    MySkills: ["Programming"],
    aboutMe: "Passionate about design and innovation.",
    experience: "year",
  });
  const [isEditing, setIsEditing] = useState(false);

  // תהילה
  const [isEditingServices, setIsEditingServices] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);

  //const data menu
  const TypeOfService = [
    "Exam preparation",
    "Private lessons",
    "Professional intention",
  ];

  const TypeOfSkills = ["Chess", "Programming", "Cooking"];

  const Experience = ["year", "2-5 years", "5-10 years", "10 and above"];

  const profession = ["social science", "exact sciences", "engineering"];

    const AcademicInstitution = [
      "University of Haifa",
      "Tel Aviv University",
      "The Hebrew University",
      "Technnyon",
    ];

  function toggleEdit() {
    setIsEditing((isEditingPrev) => {
      return !isEditingPrev;
    });
  }
  const handleDropdownChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  // תהילה

  function toggleEditServices() {
    setIsEditingServices(!isEditingServices);
  }

  function toggleService(service) {
    setUser((prevUser) => {
      let updatedServices;

      if (prevUser.typeOfService.includes(service)) {
        updatedServices = prevUser.typeOfService.filter(
          (item) => item !== service,
        );
      } else {
        updatedServices = prevUser.typeOfService.concat(service);
      }
      return {
        typeOfService: updatedServices,
      };
    });
  }

  function toggleEditSkills() {
    setIsEditingSkills(!isEditingSkills);
  }

  function toggleSkills(skill) {
    setUser((prevUser) => {
      let updatedSkills;

      if (prevUser.MySkills.includes(skill)) {
        updatedSkills = prevUser.MySkills.filter((item) => item !== skill);
      } else {
        updatedSkills = prevUser.MySkills.concat(skill);
      }
      return {
        MySkills: updatedSkills,
      };
    });
  }

  return (
    <div className="container">
      <h1>User Profile</h1>

      <div className="sectionHeader">
        <h1>User Profile</h1>
        <button onClick={() => toggleEdit()}>
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
      <article className="HeroSection">
        <UserPreview
          user={user}
          isEditing={isEditing}
          onEdit={handleDropdownChange}
        />
        <UserInfo
          user={user}
          isEditing={isEditing}
          onEdit={handleDropdownChange}
        />
      </article>

      <h1>My services</h1>
      <button onClick={toggleEditServices}>
        {isEditingServices ? "Save Changes" : "Edit My Services"}
      </button>

      <div className="square1">
        {isEditingServices ? (
          <ul>
            {TypeOfService.map((service, index) => (
              <li key={index}>
                <button
                  className={`service-btn ${user.typeOfService.includes(service) ? "selected" : ""}`}
                  onClick={() => toggleService(service)}
                >
                  {service}{" "}
                  {user.typeOfService.includes(service) ? "Remove" : "Add"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {user.typeOfService.map((service, index) => (
              <li key={index}> {service}</li>
            ))}
          </ul>
        )}
      </div>

      <h1>My skills</h1>
      <button onClick={toggleEditSkills}>
        {isEditingSkills ? "Save Changes" : "Edit My Skills"}
      </button>
      <div className="square middle">
        {isEditingSkills ? (
          <ul>
            {TypeOfSkills.map((skill, index) => (
              <li key={index}>
                <button
                  className={`skill-btn ${user.MySkills.includes(skill) ? "selected" : ""}`}
                  onClick={() => toggleSkills(skill)}
                >
                  {skill} {user.MySkills.includes(skill) ? "Remove" : "Add"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {user.MySkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        )}
      </div>

      <h1>Feedback</h1>
      <div className="square bottom">
        <div className="feedback-item">
          <div className="feedback-header">
            <img
              src="https://via.placeholder.com/50"
              alt="Daniel"
              className="feedback-avatar"
            />
            <h5>
              <a href="/profile/daniel" className="feedback-name">
                Daniel
              </a>
            </h5>
          </div>
          <p className="feedback-comment">Amazing professional!</p>
        </div>

        <div className="feedback-item">
          <div className="feedback-header">
            <img
              src="https://via.placeholder.com/50"
              alt="Sarah"
              className="feedback-avatar"
            />
            <h5>
              <a href="/profile/daniel" className="feedback-name">
                Sarah
              </a>
            </h5>
          </div>
          <p className="feedback-comment">Good!</p>
        </div>
      </div>
    </div>
  );
}

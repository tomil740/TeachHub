import "../userPage/ProfilePage.css";
import { useState } from "react";
import UserPreview from "./components/UserPreview";
import UserInfo from './components/UserInfo';

export default function ProfilePage() {
  //the shred db user object
  const [user, setUser] = useState({
    name: "Ohad",
    coins: 100,
    rating: "4.7/5",
    basicStatistics: "need to be improved...",
    feedback: "daniel: amazing, shara: good",
    profileImg:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQi2Mm5P8j09P4hPKa1B-t9eIOHzHmR7IBkw&s",
    language: ["Hebrew"],
    profession: "engineering",
    culture: "Jewish",
    academicInstitution: "University of Haifa",
    typeOfService: ["Private classes"],
    aboutMe: "Passionate about design and innovation.",
    experience: "year",
  });
  const [isEditing, setIsEditing] = useState(false);
  //const data menu
  const TypeOfService = [
    "Exam preparation",
    "Private lessons",
    "Professional intention",
  ];

  const AcademicInstitution = [
    "University of Haifa",
    "Tel Aviv University",
    "The Hebrew University",
    "Technnyon",
  ];
  const Skills = ["Chess", "Programming", "Cooking"];

  const Experience = ["year", "2-5 years", "5-10 years", "10 and above"];

  const profession = ["social science", "exact sciences", "engineering"];

  function toggleEdit() {
    setIsEditing((isEditingPrev) => {
      return (!isEditingPrev)
    });
  }
  const handleDropdownChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <div className="container">
      <h1>User Profile</h1>

      <div className="sectionHeader">
        <h1>User Profile</h1>
        <button onClick={()=>toggleEdit()}>
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
      <article className="HeroSection">
        <UserPreview user={user}
          isEditing={isEditing}
          onEdit={handleDropdownChange} />
        <UserInfo
          user={user}
          isEditing={isEditing}
          onEdit={handleDropdownChange}
        />
      </article>

      <h1> My Services</h1>
      <div className="square1">
        <ul>
          <li> Exam preparation </li>
          <li> Private lessons </li>
          <li> Professional intention </li>
          <li> Exam preparation </li>
          <li> Private lessons </li>
          <li> Professional intention </li>
          <li> Exam preparation </li>
          <li> Private lessons </li>
        </ul>
      </div>

      <h1> My Skills</h1>
      <div className="square middle">
        <ul>
          <li> java script </li>
          <li> python </li>
          <li> React </li>
          <li> java script </li>
          <li> python </li>
          <li> React </li>
        </ul>
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

      <button onClick={toggleEdit}>
        {isEditing ? "Save Changes" : "Edit Profile"}
      </button>
    </div>
  );

}

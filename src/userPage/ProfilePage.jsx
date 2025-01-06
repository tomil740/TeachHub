import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserPreview from "./components/UserPreview";
import UserInfo from "./components/UserInfo";
import AttributeContainer from "./components/AttributeContainer";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import ChatComponent from "../ChatFeature/presentation/ChatComponent";
import { useRecoilValue } from "recoil";
import { AuthenticatedUserState } from "../AuthenticatedUserState";
import calculateServicePrice from "./domain/calculateServicePrice";
import ReviewForCard from "../components/ReviewForCard";
import useGetUserById from "../MatchingFeature/domain/useGetUserById";

function ProfilePage() {

  const LOCAL_STORAGE_KEY = "users_cache";

  const [currentUser, setCurrentUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [inChat, setInChat] = useState(false);
  const [dealPrice, setDealPrice] = useState([]);
  const authenticatedUser = useRecoilValue(AuthenticatedUserState);
  const navigate = useNavigate();
  const { id } = useParams();

  // Use the updated hook
  const { user, loading1, error1 } = useGetUserById(id);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUserId(user.uid);
      } else {
        setLoggedInUserId(null);
        setIsEditing(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authenticatedUser[0]?.religion && currentUser?.religion) {
      const price = calculateServicePrice(
        authenticatedUser[0].religion,
        currentUser.religion,
        currentUser.priceOfService,
      );
      setDealPrice(price);
    }
  }, [authenticatedUser[0]?.religion, currentUser?.religion]);

  const showEditButton =
    loggedInUserId && id && String(loggedInUserId) === String(id);

  const updateUserInFirebase = async (userId, updatedData) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, updatedData);
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  function toggleEdit() {
    if (isEditing) {
      // Update user in Firebase
      updateUserInFirebase(id, currentUser);

      // Sync updated user in local storage
      const cachedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cachedUsers) {
        const users = JSON.parse(cachedUsers);
        const updatedUsers = users.map((user) =>
          user.uid === currentUser.uid ? { ...user, ...currentUser } : user,
        );
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
      }
    }

    setIsEditing((prev) => !prev);
  }


  const handleDropdownChange = (field, value) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const TypeOfService = [
    "Basic Programming",
    "Full-Stack Development",
    "Front-End Development",
    "Back-End Development",
    "Mobile Development",
    "Data Analysis",
    "UI/UX Design",
    "Graphic Design",
    "Video Editing",
    "Digital Marketing",
  ];

  const TypeOfSkills = [
    "Python",
    "JavaScript",
    "Problem Solving",
    "Debugging",
    "Git",
    "HTML5",
    "CSS3",
    "Node.js",
    "React",
    "MongoDB",
    "MySQL",
    "API Development",
    "TypeScript",
    "Redux",
    "Responsive Design",
    "Express.js",
    "Django",
    "RESTful APIs",
    "GraphQL",
    "PostgreSQL",
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "Firebase",
    "Pandas",
    "NumPy",
    "SQL",
    "Data Visualization",
    "Excel",
    "Machine Learning Basics",
    "Figma",
    "Adobe XD",
    "User Journey Mapping",
    "Wireframing",
    "Usability Testing",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Canva",
    "Vector Design",
    "Typography",
    "Adobe Premiere Pro",
    "Final Cut Pro",
    "After Effects",
    "DaVinci Resolve",
    "Color Grading",
    "SEO",
    "Social Media Campaigns",
    "Google Ads",
    "Email Marketing",
    "Content Strategy",
  ];

  if (loading1) {
    return (
      <div className="flex items-center justify-center font-bold">
        Loading...
      </div>
    );
  }

  if (error1) {
    return (
      <div className="flex items-center justify-center font-bold text-red-500">
        {error1}
      </div>
    );
  }

  return (
    <div className="pagePadding container mx-auto pt-20">
      <div id="pageHeader" className="flex items-baseline justify-between">
        <h1 className="mb-4 text-lg font-bold md:text-xl">User Profile</h1>
        {showEditButton && (
          <button
            className="rounded bg-blue-500 px-8 py-1 text-base font-bold text-white transition hover:bg-blue-600"
            onClick={toggleEdit}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        )} 
      </div>
      <div className="matched-page">
        <article className="flex flex-col justify-between gap-4 lg:flex-row">
          <UserPreview
            user={currentUser}
            isEditing={isEditing}
            onEdit={handleDropdownChange}
            onMes={()=>navigate(`/chat/${currentUser.uid}`)}
            flex="flex-[7]"
            canEdit={showEditButton}
            dealPrice={dealPrice}
          />
          <UserInfo
            user={currentUser}
            isEditing={isEditing}
            onEdit={handleDropdownChange}
            flex="flex-[3]"
            canEdit={showEditButton}
          />
        </article>
      </div>
      <h1 className="mb-4 pt-20 text-lg font-bold md:text-xl">Services</h1>
      <AttributeContainer
        user={currentUser}
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"typeOfService"}
        options={TypeOfService}
        defaultState="No services available yet."
      />
      <h1 className="mb-4 pt-20 text-lg font-bold md:text-xl">Skills</h1>
      <AttributeContainer
        user={currentUser}
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"MySkills"}
        options={TypeOfSkills}
        defaultState="No skills available yet."
      />
      <h1 className="mb-4 pt-20 text-lg font-bold md:text-xl">Reviews</h1>
      <ReviewForCard userId={id} />
    </div>
  );
}

export default ProfilePage;
/*
its not updating the firebase ....
write practice points and solve it!

*/
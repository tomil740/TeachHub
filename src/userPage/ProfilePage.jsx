import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserPreview from "./components/UserPreview";
import UserInfo from "./components/UserInfo";
import AttributeContainer from "./components/AttributeContainer";
import categorizeUsers from "../FirebaseFunctions/FetchFilteredData";
import { auth, db } from "../firebase"; // Import db (Firestore)
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Import Firestore functions
import ChatComponent from "../ChatFeature/presentation/ChatComponent"; // Import the ChatComponent
import { useRecoilValue } from "recoil";
import { AuthenticatedUserState } from "../AuthenticatedUserState";


function ProfilePage() {


  //get the authinticated user 
  const authenticatedUser = useRecoilValue(AuthenticatedUserState);


  const [currentUser, setCurrentUser] = useState({}); // Renamed to currentUser

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const [inChate, setinChate] = useState(false); // Track whether the user is in chat

  const { id } = useParams();

  // Track logged-in user ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUserId(user.uid);
      } else {
        setLoggedInUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const categorizedData = await categorizeUsers();
        const users = Object.values(categorizedData).flat();
        setAllUsers(users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching and categorizing users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", id); // Replace "users" with your Firestore collection name
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setCurrentUser(userSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const profile = allUsers.find((user) => String(user.id) === String(id));

  // Conditional rendering for edit button
  const showEditButton =
    loggedInUserId && id && String(loggedInUserId) === String(id);

  // Update user in Firestore
  const updateUserInFirebase = async (userId, updatedData) => {
    try {
      const userRef = doc(db, "users", userId); // Replace "users" with your Firestore collection name
      await updateDoc(userRef, updatedData);
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  // Toggle edit mode
  function toggleEdit() {
    if (isEditing) {
      updateUserInFirebase(id, currentUser); // Save changes to Firestore
    }
    setIsEditing((prev) => !prev);
  }

  // Handle dropdown change
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

  if (loading) {
    return (
      <div className="flex items-center justify-center font-bold">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return <div>Profile not found</div>;
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
      <article className="flex flex-col justify-between gap-4 lg:flex-row">
        <UserPreview
          user={currentUser}
          isEditing={isEditing}
          onEdit={handleDropdownChange}
          onMes={() => setinChate(true)}
          flex="flex-[7]"
          canEdit={showEditButton}
        />
        <UserInfo
          user={currentUser}
          isEditing={isEditing}
          onEdit={handleDropdownChange}
          flex="flex-[3]"
          canEdit={showEditButton}
        />
      </article>
      <h1 className="mb-4 pt-20 text-lg font-bold md:text-xl">My Services</h1>
      <AttributeContainer
        user={currentUser}
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"typeOfService"}
        options={TypeOfService}
      />
      <h1 className="mb-4 pt-20 text-lg font-bold md:text-xl">My Skills</h1>
      <AttributeContainer
        user={currentUser}
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"MySkills"}
        options={TypeOfSkills}
      />

      {/* Toggle ChatComponent visibility based on inChate state */}
      {inChate && (
        <ChatComponent
          user1Id={authenticatedUser}
          user2Id={id}
          dealPrice={5}
          closeChat={() => setinChate(false)}
        />
      )}
    </div>
  );
}

export default ProfilePage;

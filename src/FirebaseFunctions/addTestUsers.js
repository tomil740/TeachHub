import { db } from "../firebase.js";
import {
  collection,
  setDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const users = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    religion: "Jewish",
    dob: "1990-01-01",
    education: "Tel Aviv University (TAU)",
    experience: "5 years in software development",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Full-Stack Development"],
    MySkills: ["Python", "JavaScript", "React", "Node.js", "HTML"],
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    religion: "Christian",
    dob: "1992-05-12",
    education: "Hebrew University",
    experience: "3 years in marketing",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Front-End Development", "Digital Marketing"],
    MySkills: ["HTML", "CSS", "JavaScript"],
  },
  {
    name: "Ahmed Ali",
    email: "ahmedali@example.com",
    religion: "Muslim",
    dob: "1988-09-15",
    education: "Technion",
    experience: "7 years in engineering",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Back-End Development"],
    MySkills: ["Java", "C++", "SQL"],
  },
  {
    name: "Liora Cohen",
    email: "lioracohen@example.com",
    religion: "Jewish",
    dob: "1995-03-10",
    education: "Bar-Ilan University",
    experience: "2 years in research",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Data Analysis", "UI/UX Design"],
    MySkills: ["R", "Python", "SQL"],
  },
  {
    name: "Mohammed Hassan",
    email: "mohammedhassan@example.com",
    religion: "Muslim",
    dob: "1985-12-20",
    education: "Ben-Gurion University",
    experience: "10 years in IT",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Mobile Development", "Graphic Design"],
    MySkills: ["Java", "Kotlin", "Swift"],
  },
  {
    name: "Sarah Levi",
    email: "sarahlevi@example.com",
    religion: "Jewish",
    dob: "1998-07-18",
    education: "Open University",
    experience: "1 year in teaching",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Basic Programming", "Video Editing"],
    MySkills: ["Python", "HTML", "CSS"],
  },
  {
    name: "Daniel Green",
    email: "danielgreen@example.com",
    religion: "Christian",
    dob: "1993-11-02",
    education: "Haifa University",
    experience: "4 years in software development",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Front-End Development", "UI/UX Design"],
    MySkills: ["React", "JavaScript", "CSS"],
  },
  {
    name: "Fatima Zayed",
    email: "fatimazayed@example.com",
    religion: "Muslim",
    dob: "1997-04-30",
    education: "Ariel University",
    experience: "3 years in healthcare",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Mobile Development", "Digital Marketing"],
    MySkills: ["Swift", "React Native", "JavaScript"],
  },
  {
    name: "Yosef Gold",
    email: "yosefgold@example.com",
    religion: "Jewish",
    dob: "1980-01-05",
    education: "Bar-Ilan University",
    experience: "15 years in finance",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Data Analysis", "Full-Stack Development"],
    MySkills: ["Python", "SQL", "JavaScript"],
  },
  {
    name: "Maya Shafir",
    email: "mayashafir@example.com",
    religion: "Christian",
    dob: "1991-06-25",
    education: "Tel Aviv University",
    experience: "6 years in design",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Basic Programming", "Graphic Design"],
    MySkills: ["JavaScript", "CSS", "Photoshop"],
  },
  {
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    religion: "Jewish",
    dob: "1987-08-22",
    education: "Technion",
    experience: "4 years in full-stack development",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Full-Stack Development", "UI/UX Design"],
    MySkills: ["JavaScript", "React", "Node.js"],
  },
  {
    name: "Emily Davis",
    email: "emilydavis@example.com",
    religion: "Christian",
    dob: "1995-12-30",
    education: "Hebrew University",
    experience: "5 years in front-end development",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Front-End Development", "Video Editing"],
    MySkills: ["HTML", "CSS", "JavaScript"],
  },
  {
    name: "Robert Johnson",
    email: "robertjohnson@example.com",
    religion: "Christian",
    dob: "1989-03-15",
    education: "Tel Aviv University",
    experience: "8 years in back-end development",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Back-End Development", "Data Analysis"],
    MySkills: ["Java", "C#", "SQL"],
  },
  {
    name: "Olivia Martinez",
    email: "oliviamartinez@example.com",
    religion: "Muslim",
    dob: "1994-02-18",
    education: "Ariel University",
    experience: "6 years in mobile development",
    imgUrl: "/images/default.jpeg",
    rating: 0,
    coins: 0,
    typeOfService: ["Mobile Development", "Graphic Design"],
    MySkills: ["Swift", "Java", "Kotlin"],
  },
];

const addTestUsers = async () => {
  const auth = getAuth(); // Initialize Firebase Auth

  try {
    const promises = users.map(async (user, index) => {
      const userId = `testUser${index + 1}`;

      // Check if the email is already associated with any account in Firestore
      const userRef = doc(db, "users", user.email);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        console.log(`User with email ${user.email} already exists. Skipping.`);
        return;
      }

      // Create user account with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        "123123",
      );
      const uid = userCredential.user.uid;

      await updateProfile(userCredential.user, {
        displayName: user.name,
      });

      // Add user details to Firestore
      await setDoc(doc(db, "users", uid), {
        ...user,
        coins: 0,
      });

      console.log(`User ${userId} added successfully with authentication.`);
    });

    await Promise.all(promises);
    console.log("All test users added successfully with authentication!");
  } catch (error) {
    console.error("Error adding test users:", error);
  }
};

addTestUsers();

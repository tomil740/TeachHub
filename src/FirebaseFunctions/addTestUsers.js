import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const sampleUsers = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    religion: "Jewish",
    dob: "1990-01-01",
    education: "Tel Aviv University (TAU)",
    experience: "5 years in software development",
    profession: "Full-Stack Developer",
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    religion: "Christian",
    dob: "1992-05-12",
    education: "Hebrew University",
    experience: "3 years in marketing",
    profession: "Digital Marketer",
  },
  {
    name: "Ahmed Ali",
    email: "ahmedali@example.com",
    religion: "Muslim",
    dob: "1988-09-15",
    education: "Technion",
    experience: "7 years in engineering",
    profession: "Mechanical Engineer",
  },
  {
    name: "Liora Cohen",
    email: "lioracohen@example.com",
    religion: "Jewish",
    dob: "1995-03-10",
    education: "Bar-Ilan University",
    experience: "2 years in research",
    profession: "Data Scientist",
  },
  {
    name: "Mohammed Hassan",
    email: "mohammedhassan@example.com",
    religion: "Muslim",
    dob: "1985-12-20",
    education: "Ben-Gurion University",
    experience: "10 years in IT",
    profession: "IT Manager",
  },
  {
    name: "Sarah Levi",
    email: "sarahlevi@example.com",
    religion: "Jewish",
    dob: "1998-07-18",
    education: "Open University",
    experience: "1 year in teaching",
    profession: "Teacher",
  },
  {
    name: "Daniel Green",
    email: "danielgreen@example.com",
    religion: "Christian",
    dob: "1993-11-02",
    education: "Haifa University",
    experience: "4 years in software development",
    profession: "Frontend Developer",
  },
  {
    name: "Fatima Zayed",
    email: "fatimazayed@example.com",
    religion: "Muslim",
    dob: "1997-04-30",
    education: "Ariel University",
    experience: "3 years in healthcare",
    profession: "Nurse",
  },
  {
    name: "Yosef Gold",
    email: "yosefgold@example.com",
    religion: "Jewish",
    dob: "1980-01-05",
    education: "Bar-Ilan University",
    experience: "15 years in finance",
    profession: "Accountant",
  },
  {
    name: "Maya Shafir",
    email: "mayashafir@example.com",
    religion: "Christian",
    dob: "1991-06-25",
    education: "Tel Aviv University",
    experience: "6 years in design",
    profession: "Graphic Designer",
  },
];

const addTestUsers = async () => {
  try {
    const promises = sampleUsers.map(async (user, index) => {
      const userId = `testUser${index + 1}`;

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

      // Add user data to Firestore
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

// Run this code once

// this is to filter data //
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

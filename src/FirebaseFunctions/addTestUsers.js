import { db } from "../firebase.js";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"; // Importing necessary functions

const sampleUsers = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    religion: "Jewish",
    dob: "1990-01-01",
    education: "Tel Aviv University (TAU)",
    experience: "5 years in software development",
    profession: "Full-Stack Developer",
    category: "Full-Stack Development",
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    religion: "Christian",
    dob: "1992-05-12",
    education: "Hebrew University",
    experience: "3 years in marketing",
    profession: "Digital Marketer",
    category: "Front-End Development",
  },
  {
    name: "Ahmed Ali",
    email: "ahmedali@example.com",
    religion: "Muslim",
    dob: "1988-09-15",
    education: "Technion",
    experience: "7 years in engineering",
    profession: "Mechanical Engineer",
    category: "Back-End Development",
  },
  {
    name: "Liora Cohen",
    email: "lioracohen@example.com",
    religion: "Jewish",
    dob: "1995-03-10",
    education: "Bar-Ilan University",
    experience: "2 years in research",
    profession: "Data Scientist",
    category: "Data Analysis",
  },
  {
    name: "Mohammed Hassan",
    email: "mohammedhassan@example.com",
    religion: "Muslim",
    dob: "1985-12-20",
    education: "Ben-Gurion University",
    experience: "10 years in IT",
    profession: "IT Manager",
    category: "Mobile Development",
  },
  {
    name: "Sarah Levi",
    email: "sarahlevi@example.com",
    religion: "Jewish",
    dob: "1998-07-18",
    education: "Open University",
    experience: "1 year in teaching",
    profession: "Teacher",
    category: "Basic Programming",
  },
  {
    name: "Daniel Green",
    email: "danielgreen@example.com",
    religion: "Christian",
    dob: "1993-11-02",
    education: "Haifa University",
    experience: "4 years in software development",
    profession: "Frontend Developer",
    category: "Front-End Development",
  },
  {
    name: "Fatima Zayed",
    email: "fatimazayed@example.com",
    religion: "Muslim",
    dob: "1997-04-30",
    education: "Ariel University",
    experience: "3 years in healthcare",
    profession: "Nurse",
    category: "Mobile Development",
  },
  {
    name: "Yosef Gold",
    email: "yosefgold@example.com",
    religion: "Jewish",
    dob: "1980-01-05",
    education: "Bar-Ilan University",
    experience: "15 years in finance",
    profession: "Accountant",
    category: "Data Analysis",
  },
  {
    name: "Maya Shafir",
    email: "mayashafir@example.com",
    religion: "Christian",
    dob: "1991-06-25",
    education: "Tel Aviv University",
    experience: "6 years in design",
    profession: "Graphic Designer",
    category: "Basic Programming",
  },
  {
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    religion: "Jewish",
    dob: "1987-08-22",
    education: "Technion",
    experience: "4 years in full-stack development",
    profession: "Software Developer",
    category: "Full-Stack Development",
  },
  {
    name: "Emily Davis",
    email: "emilydavis@example.com",
    religion: "Christian",
    dob: "1995-12-30",
    education: "Hebrew University",
    experience: "5 years in front-end development",
    profession: "Frontend Developer",
    category: "Front-End Development",
  },
  {
    name: "Robert Johnson",
    email: "robertjohnson@example.com",
    religion: "Christian",
    dob: "1989-03-15",
    education: "Tel Aviv University",
    experience: "8 years in back-end development",
    profession: "Backend Developer",
    category: "Back-End Development",
  },
  {
    name: "Olivia Martinez",
    email: "oliviamartinez@example.com",
    religion: "Muslim",
    dob: "1994-02-18",
    education: "Ariel University",
    experience: "6 years in mobile development",
    profession: "Mobile App Developer",
    category: "Mobile Development",
  },
  {
    name: "David Wilson",
    email: "davidwilson@example.com",
    religion: "Jewish",
    dob: "1984-09-10",
    education: "Haifa University",
    experience: "7 years in data analysis",
    profession: "Data Analyst",
    category: "Data Analysis",
  },
];

const addTestUsers = async () => {
  const auth = getAuth(); // Initialize Firebase Auth

  try {
    const promises = sampleUsers.map(async (user, index) => {
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

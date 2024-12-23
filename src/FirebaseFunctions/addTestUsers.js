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
    aboutMe:
      "I am a passionate software developer with a strong background in full-stack development. I enjoy solving complex problems and building scalable solutions. In my free time, I love to explore new technologies and contribute to open-source projects.",
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
    aboutMe:
      "I am a marketing enthusiast with a passion for design and user experience. I work on both digital marketing strategies and front-end development. I strive to create impactful digital experiences that engage and convert.",
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
    aboutMe:
      "I am an experienced back-end developer with a deep understanding of engineering principles. I focus on creating efficient systems that support scalable applications. When I'm not coding, I enjoy exploring new algorithms and optimizing performance.",
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
    aboutMe:
      "I am passionate about data analysis and translating data into actionable insights. My background in research helps me approach problems methodically. I also enjoy working on UI/UX design to create user-friendly interfaces.",
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
    aboutMe:
      "I have a decade of experience in mobile development and graphic design. I focus on creating innovative and user-friendly mobile applications. My passion lies in designing intuitive interfaces and building mobile-first solutions.",
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
    aboutMe:
      "I am a beginner programmer with a focus on Python and web development. I also enjoy video editing as a creative outlet. I am always eager to learn new skills and improve my coding abilities.",
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
    aboutMe:
      "As a front-end developer, I love creating interactive and visually appealing web applications. My passion for UI/UX design helps me build seamless user experiences. I am always striving to improve my coding and design skills.",
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
    aboutMe:
      "I combine my experience in healthcare with mobile development to create impactful solutions for health tech. My skills in React Native help me build responsive apps, while my background in marketing shapes my approach to user engagement.",
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
    aboutMe:
      "With over 15 years of experience in finance, I now specialize in data analysis and full-stack development. I help organizations make data-driven decisions and build scalable applications. I am always looking for new ways to optimize and innovate.",
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
    aboutMe:
      "I am a designer with a background in graphic design and web development. I love merging creativity with technology to produce stunning designs. I'm passionate about learning new tools and enhancing my coding and design skills.",
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
    aboutMe:
      "As a full-stack developer, I focus on building scalable applications and user-centric designs. I enjoy working on both front-end and back-end development. My goal is to continuously improve my skills and contribute to meaningful projects.",
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
    aboutMe:
      "I am a front-end developer with a passion for creating clean and user-friendly websites. I also enjoy video editing as a hobby, which helps me with creative problem-solving. I love collaborating with teams to bring ideas to life.",
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
    aboutMe:
      "I specialize in back-end development and data analysis. My expertise lies in creating robust back-end systems and analyzing data to optimize business processes. I'm constantly exploring new tools to improve my work.",
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
    aboutMe:
      "I am passionate about mobile development and design. I specialize in building user-friendly mobile apps with a focus on functionality and design. I love learning new frameworks and improving user experiences.",
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

export const site = {
  name: "Himanshu Tripathi",
  initials: "HT",
  role: "Software Engineer",
  roles: ["Software Engineer", "Full Stack Developer", "AI/ML Engineer"],
  intro:
    "I build scalable software and AI-powered products — from production backends and data pipelines to interfaces people actually enjoy using.",
  email: "himanshutripathi1838@gmail.com",
  phone: "+91 70679 91838",
  location: "Bhopal, Madhya Pradesh, India — open to remote",
  github: "https://github.com/himanshutripathi1838",
  githubHandle: "himanshutripathi1838",
  linkedin: "https://www.linkedin.com/in/himanshu-tripathi-454343259",
  resumeUrl: "/Himanshu_Tripathi_Resume_ATS.pdf",
} as const;

export const stats = [
  { label: "Years building", value: 4, suffix: "+" },
  { label: "Projects shipped", value: 7, suffix: "" },
  { label: "Certificates", value: 12, suffix: "+" },
  { label: "Technologies", value: 15, suffix: "+" },
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Certificates", to: "/certificates" },
  { label: "Resume", to: "/resume" },
  { label: "Contact", to: "/contact" },
] as const;

export const timeline = [
  {
    year: "2020",
    title: "Class X (Secondary Education)",
    body: "Completed Secondary School Certificate with 81.25%, laying the analytical foundations for engineering.",
  },
  {
    year: "2022",
    title: "Class XII (Senior Secondary Education)",
    body: "Completed Senior Secondary School Certificate (Physics, Chemistry, Math) with 75.2%, cementing mathematical foundations.",
  },
  {
    year: "2022 — 2026",
    title: "B.Tech in Computer Science Engineering",
    body: "Admitted to Sagar Institute of Science & Technology, Bhopal. Covered core computer science, software engineering, databases, and algorithms (CGPA: 7.53).",
  },
  {
    year: "2024",
    title: "Shipping Production Software",
    body: "Designed and built full-stack applications like Shiftlyin, Omni Docs, and a Career Guidance platform, handling database schemas and authentication flows.",
  },
  {
    year: "2026 — Present",
    title: "AI/ML Intern at Prudent Systems",
    body: "Joined Prudent Systems to engineer computer vision models. Built and trained a YOLOv8 railway pole detection system with 90% accuracy.",
  },
];

export const experience = [
  {
    role: "AI/ML Intern",
    company: "Prudent Systems Pvt. Ltd.",
    period: "May 2026 — Present",
    current: true,
    summary:
      "Engineered and trained a YOLOv8-based object detection model to identify railway poles from real-world imagery, achieving approximately 90% detection accuracy.",
    highlights: [
      "Engineered and trained a YOLOv8-based object detection model to identify railway poles from real-world imagery, achieving approximately 90% detection accuracy.",
      "Annotated and preprocessed a dataset of 500+ images and applied data augmentation techniques, improving model generalization by 15% and cutting the false-positive rate by 20%.",
      "Collaborated with a cross-functional engineering team to integrate the detection pipeline into existing workflows, presenting model performance in regular reviews.",
    ],
    metrics: [
      { label: "Detection accuracy", value: "90%" },
      { label: "Training images", value: "500+" },
      { label: "Better generalization", value: "+15%" },
      { label: "False positives", value: "-20%" },
    ],
    stack: ["YOLOv8", "PyTorch", "OpenCV", "Python", "NumPy", "Roboflow"],
  },
];

export const education = [
  {
    title: "B.Tech in Computer Science Engineering",
    org: "Sagar Institute of Science & Technology, Bhopal",
    period: "2022 — 2026",
    detail: "CGPA: 7.53 / 10",
  },
  {
    title: "Class XII (Senior Secondary)",
    org: "CBSE / State Board",
    period: "2022",
    detail: "Percentage: 75.2%",
  },
  {
    title: "Class X (Secondary)",
    org: "CBSE / State Board",
    period: "2020",
    detail: "Percentage: 81.25%",
  },
];

export const achievements = [
  "Oracle Cloud Infrastructure (OCI) Foundations Associate Certification",
  "Python Essentials 1 — Cisco Networking Academy",
  "Coding Development Certification",
  "Ranked in the Top 10% at a national-level hackathon (working prototype delivered in 24 hours)",
  "National semifinalist in a competitive online gaming event with 500+ participants"
];

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: "Cloud" | "Networking" | "Development" | "Security" | "AI";
  detail: string;
};

export const certificateCategories = [
  "All",
  "Cloud",
  "Networking",
  "Development",
  "Security",
  "AI",
] as const;

export const certificates: Certificate[] = [
  {
    id: "aws-cloud-foundations",
    title: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services",
    year: "2025",
    category: "Cloud",
    detail: "Core AWS services, IAM, EC2, S3, pricing models and the shared responsibility model.",
  },
  {
    id: "gcp-essentials",
    title: "Google Cloud Computing Foundations",
    issuer: "Google Cloud",
    year: "2024",
    category: "Cloud",
    detail: "Compute options, storage classes, IAM and networking primitives on GCP.",
  },
  {
    id: "azure-fundamentals",
    title: "Azure Fundamentals Track",
    issuer: "Microsoft Learn",
    year: "2024",
    category: "Cloud",
    detail: "Azure core services, resource groups, and cloud cost governance basics.",
  },
  {
    id: "ccna-intro",
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    year: "2024",
    category: "Networking",
    detail: "Ethernet, IPv4/IPv6 addressing, switching concepts and network troubleshooting.",
  },
  {
    id: "ccna-switching",
    title: "Switching, Routing & Wireless Essentials",
    issuer: "Cisco Networking Academy",
    year: "2025",
    category: "Networking",
    detail: "VLANs, inter-VLAN routing, STP, WLAN configuration and redundancy.",
  },
  {
    id: "network-security",
    title: "Network Security Essentials",
    issuer: "Cisco Networking Academy",
    year: "2025",
    category: "Security",
    detail: "Threat models, access control lists, firewall policy and secure network design.",
  },
  {
    id: "cyber-intro",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    year: "2023",
    category: "Security",
    detail: "Attack surfaces, social engineering, encryption basics and defence in depth.",
  },
  {
    id: "fullstack-web",
    title: "Full Stack Web Development",
    issuer: "Coursera",
    year: "2024",
    category: "Development",
    detail: "End-to-end app delivery: REST APIs, auth, database modelling and deployment.",
  },
  {
    id: "react-advanced",
    title: "Advanced React",
    issuer: "Meta",
    year: "2024",
    category: "Development",
    detail: "Component patterns, hooks in depth, performance profiling and testing.",
  },
  {
    id: "dsa-python",
    title: "Data Structures & Algorithms",
    issuer: "NPTEL",
    year: "2023",
    category: "Development",
    detail: "Complexity analysis, trees, graphs, dynamic programming and problem decomposition.",
  },
  {
    id: "ml-specialization",
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI",
    year: "2025",
    category: "AI",
    detail: "Supervised and unsupervised learning, regularisation and evaluation methodology.",
  },
  {
    id: "computer-vision",
    title: "Computer Vision with Deep Learning",
    issuer: "Udemy",
    year: "2025",
    category: "AI",
    detail: "CNN architectures, object detection, augmentation strategy and transfer learning.",
  },
];

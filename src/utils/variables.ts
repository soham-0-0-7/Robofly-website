export const colorPalette = {
  whiteMint: "#f8fffe",

  primary: "#1ba100",
  primaryHover: "#104a2f",

  // Dark Greens
  green1: "#002d1a",
  green2: "#104a2f",
  greenDeep: "#072c1a",
  greenShadow: "#001811",

  // Medium Greens
  green3: "#399d6c",
  green5: "#1ba100",
  greenOlive: "#4b7340",
  greenJade: "#00a86b",

  // Light Greens
  green4: "#bde6cf",
  green6: "#8fe4ce",
  green7: "#e4f1ec",
  green8: "#22c55e",
  greenLime: "#bfff00",
  greenPastel: "#c0f2d8",

  // Accent Greens
  greenNeon: "#39ff14",
  greenSeafoam: "#7fffd4",
  greenEmerald: "#50c878",

  // Black Shades
  black: "#000000",
  blackDeep: "#121212",
  blackMuted: "#1e1e1e",
  blackShadow: "#2c2c2c",

  // White Shades
  white: "#ffffff",
  whiteSoft: "#f5f5f5",
  whiteSmoke: "#f0f0f0",

  // Grays
  grayDark: "#4a4a4a",
  gray: "#7d7d7d",
  grayLight: "#d3d3d3",

  // HomeAbout inspired additions
  aboutBg: "#f2fef9", // matches whiteMint
  aboutCard: "#ffffff", // matches white
  aboutText: "#104a2f", // matches green2
  aboutAccent: "#399d6c", // matches green3
  aboutSubtle: "#bde6cf", // matches green4
};

export const indianStatesAndUTs = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Lakshadweep",
  "Puducherry",
  "Ladakh",
];

export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePhone = (phone: string) =>
  /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone.trim());

export const imgSrc_h = "/images/robofly_h.png";
export const imgSrc = "/images/robofly.png";
export const videoSrc = "/videos/drone.mp4";

export const imgSrc_h_2 = "/images/logo H-Photoroom.png";




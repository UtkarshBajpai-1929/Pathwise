import type { College } from "@/types/college";

const courseSet = (prefix: string, baseFees: number, avg: number, high: number) => [
  { id: `${prefix}-cse`, name: "B.Tech Computer Science", duration: "4 years", fees: baseFees, avgPlacement: avg, highestPackage: high },
  { id: `${prefix}-ece`, name: "B.Tech Electronics & Communication", duration: "4 years", fees: Math.round(baseFees * 0.92), avgPlacement: Math.round(avg * 0.88), highestPackage: Math.round(high * 0.78) },
  { id: `${prefix}-mech`, name: "B.Tech Mechanical Engineering", duration: "4 years", fees: Math.round(baseFees * 0.86), avgPlacement: Math.round(avg * 0.72), highestPackage: Math.round(high * 0.58) },
];

const images = [
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80",
];

const makeCollege = (
  id: string,
  name: string,
  shortName: string,
  type: College["type"],
  location: string,
  state: string,
  rating: number,
  fees: number,
  avgPackage: number,
  highestPackage: number,
  placementRate: number,
  recruiters: string[],
  index: number,
): College => ({
  id,
  name,
  shortName,
  type,
  location,
  state,
  rating,
  startingFees: fees,
  avgPackage,
  highestPackage,
  placementRate,
  image: images[index % images.length],
  logo: shortName.slice(0, 3).toUpperCase(),
  topCourses: ["CSE", "ECE", "Mechanical", "AI & Data Science"],
  recruiters,
  overview: `${name} is a high-demand engineering destination known for rigorous academics, research culture, competitive placements, and strong peer networks across India.`,
  highlights: [
    `${placementRate}% placement participation`,
    `${highestPackage} LPA highest package`,
    "Active research labs and startup cells",
    "Strong alumni and recruiter network",
  ],
  courses: courseSet(id, fees, avgPackage, highestPackage),
  reviews: [
    { author: "Aarav Mehta", rating: Math.min(5, rating + 0.1), text: "The academic pressure is real, but the placement ecosystem and peer group make the experience worth it." },
    { author: "Nisha Rao", rating, text: "Great clubs, project culture, and alumni access. Hostel infrastructure depends a lot on the campus block." },
  ],
});

export const colleges: College[] = [
  makeCollege("iit-bombay", "Indian Institute of Technology Bombay", "IIT Bombay", "IIT", "Mumbai", "Maharashtra", 4.9, 230000, 23, 367, 91, ["Google", "Apple", "Microsoft", "Tata Steel"], 0),
  makeCollege("iit-delhi", "Indian Institute of Technology Delhi", "IIT Delhi", "IIT", "New Delhi", "Delhi", 4.9, 235000, 22, 265, 90, ["Microsoft", "Goldman Sachs", "Uber", "Samsung"], 1),
  makeCollege("iit-madras", "Indian Institute of Technology Madras", "IIT Madras", "IIT", "Chennai", "Tamil Nadu", 4.9, 225000, 21, 198, 89, ["Amazon", "Qualcomm", "Texas Instruments", "McKinsey"], 2),
  makeCollege("iit-kanpur", "Indian Institute of Technology Kanpur", "IIT Kanpur", "IIT", "Kanpur", "Uttar Pradesh", 4.8, 220000, 20, 225, 88, ["Google", "Tower Research", "Flipkart", "Intel"], 3),
  makeCollege("iit-kharagpur", "Indian Institute of Technology Kharagpur", "IIT Kharagpur", "IIT", "Kharagpur", "West Bengal", 4.8, 220000, 19, 260, 87, ["Microsoft", "EXL", "Adobe", "ITC"], 4),
  makeCollege("iit-roorkee", "Indian Institute of Technology Roorkee", "IIT Roorkee", "IIT", "Roorkee", "Uttarakhand", 4.7, 216000, 18, 210, 86, ["Google", "Oracle", "Deloitte", "L&T"], 5),
  makeCollege("iit-guwahati", "Indian Institute of Technology Guwahati", "IIT Guwahati", "IIT", "Guwahati", "Assam", 4.7, 218000, 17, 190, 85, ["Amazon", "Samsung", "Sprinklr", "TCS Research"], 6),
  makeCollege("iit-hyderabad", "Indian Institute of Technology Hyderabad", "IIT Hyderabad", "IIT", "Hyderabad", "Telangana", 4.7, 224000, 19, 210, 88, ["Microsoft", "Japan Desk", "AMD", "Salesforce"], 7),
  makeCollege("iit-bhu", "Indian Institute of Technology BHU", "IIT BHU", "IIT", "Varanasi", "Uttar Pradesh", 4.6, 215000, 17, 169, 84, ["Flipkart", "Oracle", "Reliance", "Walmart"], 8),
  makeCollege("iit-indore", "Indian Institute of Technology Indore", "IIT Indore", "IIT", "Indore", "Madhya Pradesh", 4.6, 213000, 16, 68, 83, ["Google", "DE Shaw", "Cognizant", "Siemens"], 9),
  makeCollege("nit-trichy", "National Institute of Technology Tiruchirappalli", "NIT Trichy", "NIT", "Tiruchirappalli", "Tamil Nadu", 4.8, 175000, 16, 53, 88, ["Microsoft", "PepsiCo", "Oracle", "BHEL"], 10),
  makeCollege("nit-surathkal", "National Institute of Technology Karnataka Surathkal", "NITK", "NIT", "Mangaluru", "Karnataka", 4.7, 170000, 15, 54, 87, ["Google", "Adobe", "Texas Instruments", "Bosch"], 11),
  makeCollege("nit-warangal", "National Institute of Technology Warangal", "NIT Warangal", "NIT", "Warangal", "Telangana", 4.7, 168000, 15, 88, 86, ["Amazon", "Morgan Stanley", "Qualcomm", "Infosys"], 12),
  makeCollege("nit-rourkela", "National Institute of Technology Rourkela", "NIT Rourkela", "NIT", "Rourkela", "Odisha", 4.6, 162000, 13, 83, 84, ["Microsoft", "Tata Steel", "Vedanta", "Deloitte"], 13),
  makeCollege("nit-calicut", "National Institute of Technology Calicut", "NIT Calicut", "NIT", "Kozhikode", "Kerala", 4.5, 160000, 12, 50, 83, ["Cisco", "Oracle", "L&T", "TCS"], 14),
  makeCollege("nit-allahabad", "Motilal Nehru National Institute of Technology Allahabad", "MNNIT", "NIT", "Prayagraj", "Uttar Pradesh", 4.5, 158000, 14, 71, 84, ["Atlassian", "Goldman Sachs", "Samsung", "Paytm"], 15),
  makeCollege("nit-jaipur", "Malaviya National Institute of Technology Jaipur", "MNIT Jaipur", "NIT", "Jaipur", "Rajasthan", 4.4, 155000, 12, 64, 82, ["Amazon", "Deloitte", "Hero MotoCorp", "Adobe"], 16),
  makeCollege("nit-bhopal", "Maulana Azad National Institute of Technology Bhopal", "MANIT", "NIT", "Bhopal", "Madhya Pradesh", 4.4, 150000, 11, 82, 80, ["Microsoft", "Reliance", "ZS", "Samsung"], 17),
  makeCollege("bits-pilani", "Birla Institute of Technology and Science Pilani", "BITS Pilani", "BITS", "Pilani", "Rajasthan", 4.8, 585000, 19, 60, 89, ["Google", "Microsoft", "Nvidia", "Nomura"], 18),
  makeCollege("bits-goa", "BITS Pilani K K Birla Goa Campus", "BITS Goa", "BITS", "Goa", "Goa", 4.7, 575000, 17, 56, 87, ["Amazon", "Oracle", "JPMorgan", "Texas Instruments"], 19),
  makeCollege("bits-hyderabad", "BITS Pilani Hyderabad Campus", "BITS Hyderabad", "BITS", "Hyderabad", "Telangana", 4.6, 570000, 16, 52, 86, ["Microsoft", "Qualcomm", "Uber", "Walmart"], 20),
  makeCollege("iiit-hyderabad", "International Institute of Information Technology Hyderabad", "IIIT Hyderabad", "Private", "Hyderabad", "Telangana", 4.8, 360000, 26, 102, 94, ["Google", "Apple", "Microsoft", "Adobe"], 21),
  makeCollege("vit-vellore", "Vellore Institute of Technology", "VIT Vellore", "Private", "Vellore", "Tamil Nadu", 4.4, 195000, 9, 102, 82, ["Microsoft", "TCS", "Infosys", "PayPal"], 22),
  makeCollege("srm-ktr", "SRM Institute of Science and Technology", "SRM KTR", "Private", "Chennai", "Tamil Nadu", 4.2, 250000, 8, 57, 78, ["Amazon", "Cognizant", "Accenture", "Wipro"], 23),
  makeCollege("manipal-mit", "Manipal Institute of Technology", "MIT Manipal", "Private", "Manipal", "Karnataka", 4.4, 335000, 10, 54, 82, ["Microsoft", "Deloitte", "Philips", "Mercedes-Benz"], 24),
  makeCollege("thapar", "Thapar Institute of Engineering and Technology", "TIET", "Private", "Patiala", "Punjab", 4.3, 410000, 11, 55, 81, ["JP Morgan", "Adobe", "Maruti Suzuki", "ZS"], 25),
  makeCollege("amrita", "Amrita Vishwa Vidyapeetham Coimbatore", "Amrita", "Private", "Coimbatore", "Tamil Nadu", 4.3, 325000, 9, 56, 80, ["Microsoft", "Cisco", "Bosch", "Infosys"], 26),
  makeCollege("rvce", "R V College of Engineering", "RVCE", "Private", "Bengaluru", "Karnataka", 4.5, 260000, 12, 62, 86, ["Google", "Mercedes-Benz", "Intel", "PhonePe"], 27),
  makeCollege("pes", "PES University", "PES", "Private", "Bengaluru", "Karnataka", 4.3, 430000, 11, 65, 83, ["Amazon", "Flipkart", "Atlassian", "Deloitte"], 28),
  makeCollege("lnmiit", "The LNM Institute of Information Technology", "LNMIIT", "Private", "Jaipur", "Rajasthan", 4.2, 390000, 12, 50, 80, ["Amazon", "Samsung", "Ola", "Media.net"], 29),
];

export const getCollegeById = (id: string) => colleges.find((college) => college.id === id);

export const filterColleges = (params: {
  q?: string;
  location?: string;
  type?: string;
  course?: string;
  maxFees?: number;
  minRating?: number;
}) => {
  const query = params.q?.trim().toLowerCase();
  return colleges.filter((college) => {
    const haystack = `${college.name} ${college.shortName} ${college.location} ${college.state} ${college.topCourses.join(" ")}`.toLowerCase();
    if (query && !haystack.includes(query)) return false;
    if (params.location && college.state !== params.location && college.location !== params.location) return false;
    if (params.type && params.type !== "All" && college.type !== params.type) return false;
    if (params.course && params.course !== "All" && !college.topCourses.includes(params.course)) return false;
    if (params.maxFees && college.startingFees > params.maxFees) return false;
    if (params.minRating && college.rating < params.minRating) return false;
    return true;
  });
};

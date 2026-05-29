export type CollegeType = "IIT" | "NIT" | "BITS" | "Private";

export type Course = {
  id: string;
  name: string;
  duration: string;
  fees: number;
  avgPlacement: number;
  highestPackage: number;
};

export type College = {
  id: string;
  name: string;
  shortName: string;
  type: CollegeType;
  location: string;
  state: string;
  rating: number;
  startingFees: number;
  avgPackage: number;
  highestPackage: number;
  placementRate: number;
  image: string;
  logo: string;
  topCourses: string[];
  recruiters: string[];
  overview: string;
  highlights: string[];
  courses: Course[];
  reviews: {
    author: string;
    rating: number;
    text: string;
  }[];
};

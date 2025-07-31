import { Company } from "./company";

type Job = {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  experienceLevel: number;
  location: string;
  jobType: string;
  position: number;
  company: Company;
  created_by: string;
  applications: string[];
  createdAt?: any; // Optional, in case some jobs don't have a created date
  updatedAt?: any; // Optional, in case some jobs don't have an updated date
};

export default Job;

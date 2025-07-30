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
  company: {
    _id: string;
    name: string;
    logo?: string; // Optional, in case some jobs don't have a logo
    description?: string; // Optional, in case some companies don't have a description
  };
  created_by: string;
  applications: string[];
  createdAt?: any; // Optional, in case some jobs don't have a created date
  updatedAt?: any; // Optional, in case some jobs don't have an updated date
};

export default Job;

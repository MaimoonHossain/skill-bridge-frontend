import JobCard from "@/common/JobCard";
import React from "react";

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Company Name",
    location: "India",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda eos provident.",
    tags: ["12 Positions", "Part Time", "24LPA"],
    createdAt: "2 days ago",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Company Name",
    location: "India",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda eos provident.",
    tags: ["5 Positions", "Full Time", "30LPA"],
    createdAt: "2 days ago",
  },
  {
    id: 3,
    title: "Fullstack Developer",
    company: "Company Name",
    location: "India",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda eos provident.",
    tags: ["3 Positions", "Internship", "10LPA"],
    createdAt: "2 days ago",
  },
];

export default function BrowsePage() {
  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <div>
        <h1 className='text-3xl font-bold mb-6'>Browse Jobs</h1>
        <p className='text-gray-600 mb-4'>
          Explore the latest job opportunities available.
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {dummyJobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            company={job.company}
            location={job.location}
            description={job.description}
            tags={job.tags}
            createdAt={job.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import JobCard from "@/components/JobCard";

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

export default function JobsPage() {
  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    salary: "",
  });

  const handleChange = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className='flex p-6 gap-6 max-w-7xl mx-auto'>
      {/* Filter Sidebar */}
      <aside className='w-1/4 border-r pr-6'>
        <div className='mb-6'>
          <h3 className='font-semibold mb-2 text-gray-800'>Location</h3>
          {["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"].map(
            (loc) => (
              <label key={loc} className='block text-sm text-gray-700'>
                <input
                  type='radio'
                  name='location'
                  value={loc}
                  checked={filters.location === loc}
                  onChange={() => handleChange("location", loc)}
                  className='mr-2'
                />
                {loc}
              </label>
            )
          )}
        </div>

        <div className='mb-6'>
          <h3 className='font-semibold mb-2 text-gray-800'>Industry</h3>
          {[
            "Frontend Developer",
            "Backend Developer",
            "FullStack Developer",
          ].map((role) => (
            <label key={role} className='block text-sm text-gray-700'>
              <input
                type='radio'
                name='industry'
                value={role}
                checked={filters.industry === role}
                onChange={() => handleChange("industry", role)}
                className='mr-2'
              />
              {role}
            </label>
          ))}
        </div>

        <div>
          <h3 className='font-semibold mb-2 text-gray-800'>Salary</h3>
          {["0-40k", "42-1lakh", "1lakh to 5lakh"].map((sal) => (
            <label key={sal} className='block text-sm text-gray-700'>
              <input
                type='radio'
                name='salary'
                value={sal}
                checked={filters.salary === sal}
                onChange={() => handleChange("salary", sal)}
                className='mr-2'
              />
              {sal}
            </label>
          ))}
        </div>
      </aside>

      {/* Jobs Section */}
      <section className='flex-1'>
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
      </section>
    </div>
  );
}

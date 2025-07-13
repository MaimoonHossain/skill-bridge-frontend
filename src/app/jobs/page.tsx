"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
            <div
              key={job.id}
              className='border p-4 rounded-lg shadow-sm hover:shadow-md transition'
            >
              <div className='text-sm text-gray-500 mb-1'>{job.createdAt}</div>
              <div className='flex items-center justify-between mb-2'>
                <div>
                  <h4 className='font-semibold text-gray-800'>{job.company}</h4>
                  <p className='text-sm text-gray-600'>{job.location}</p>
                </div>
                <button className='text-gray-400 hover:text-blue-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </button>
              </div>
              <h3 className='text-lg font-bold text-gray-900 mb-1'>
                {job.title}
              </h3>
              <p className='text-sm text-gray-600 mb-3'>{job.description}</p>
              <div className='flex flex-wrap gap-2 mb-3'>
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium",
                      tag === "Part Time"
                        ? "bg-yellow-100 text-yellow-800"
                        : tag.includes("LPA")
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className='flex justify-between'>
                <Link
                  href={`/jobs/${job.id}`}
                  className='text-sm text-blue-600 font-medium hover:underline'
                >
                  Details
                </Link>
                <button className='bg-purple-600 text-white px-3 py-1 text-sm rounded hover:bg-purple-700'>
                  Save For Later
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

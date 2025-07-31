"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import JobCard from "@/common/JobCard";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Job from "@/types/job";

export default function JobsPage() {
  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    salary: "",
  });

  const handleChange = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const { jobs, loading, error } = useGetAllJobs();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!jobs || jobs.length === 0)
    return <p>No jobs available at the moment.</p>;

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
          {jobs.map((job: Job) => (
            <JobCard
              key={job._id}
              id={job._id}
              title={job.title}
              company={job.company.name}
              location={job.location}
              description={job.description}
              tags={job.requirements}
              createdAt={job.createdAt}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

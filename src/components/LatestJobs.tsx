"use client";

import useGetAllJobs from "@/hooks/useGetAllJobs";
import Job from "@/types/job";
import Link from "next/link";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";

export default function LatestJobs() {
  const { jobs, loading, error } = useGetAllJobs();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!jobs || jobs.length === 0)
    return <p>No jobs available at the moment.</p>;

  return (
    <section className='mt-10'>
      <h2 className='text-3xl font-bold mb-6 text-gray-900'>Latest Jobs</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {jobs.map((job: Job) => (
          <Link
            key={job._id}
            href={`/jobs/${job._id}`}
            className='group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-500 relative'
          >
            {/* better design for posted on */}
            <div className='flex items-center text-xs text-gray-500 mb-3 absolute top-3 right-3'>
              Posted on:{" "}
              {new Date(job.createdAt || "").toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className='my-3 flex justify-between items-center'>
              <h3 className='text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition'>
                {job.title}
              </h3>
              <span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize'>
                {job.jobType}
              </span>
            </div>

            <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
              {job.description}
            </p>

            <div className='flex items-center gap-2 text-sm text-gray-500 mt-3'>
              <Briefcase size={16} className='text-gray-400' />
              <span>{job.company.name}</span>
            </div>

            <div className='flex items-center gap-2 text-sm text-gray-500 mt-1'>
              <MapPin size={16} className='text-gray-400' />
              <span>{job.location}</span>
            </div>

            <div className='flex items-center gap-2 text-sm text-gray-500 mt-1'>
              <DollarSign size={16} className='text-gray-400' />
              <span>৳ {job.salary?.toLocaleString()}</span>
            </div>

            <div className='flex items-center gap-2 text-sm text-gray-500 mt-1'>
              <Clock size={16} className='text-gray-400' />
              <span>{job.experienceLevel}+ yrs experience</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

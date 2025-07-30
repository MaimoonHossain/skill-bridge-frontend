"use client";

import useGetAllJobs from "@/hooks/useGetAllJobs";
import Job from "@/types/job";
import Link from "next/link";

export default function LatestJobs() {
  const { jobs, loading, error } = useGetAllJobs();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!jobs || jobs.length === 0)
    return <p>No jobs available at the moment.</p>;

  return (
    <section className='mt-10'>
      <h2 className='text-2xl font-semibold mb-4'>Latest Jobs</h2>
      <div className='grid gap-4'>
        {jobs?.map((job: Job) => (
          <Link
            key={job._id}
            href={`/jobs/${job._id}`}
            className='block border rounded p-4 hover:shadow hover:border-blue-500 transition'
          >
            <h3 className='text-lg font-bold text-gray-800'>{job.title}</h3>
            <p className='text-gray-600'>{job.company.name}</p>
            <p className='text-gray-500 text-sm'>{job.location}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

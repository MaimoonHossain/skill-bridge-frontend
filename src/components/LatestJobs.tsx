"use client";

import Link from "next/link";

const jobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Solutions Ltd.",
    location: "Dhaka, Bangladesh",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "InnovateX",
    location: "Remote",
  },
  {
    id: "3",
    title: "Product Designer",
    company: "Creative Agency",
    location: "Chittagong, Bangladesh",
  },
];

export default function LatestJobs() {
  return (
    <section className='mt-10'>
      <h2 className='text-2xl font-semibold mb-4'>Latest Jobs</h2>
      <div className='grid gap-4'>
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className='block border rounded p-4 hover:shadow hover:border-blue-500 transition'
          >
            <h3 className='text-lg font-bold text-gray-800'>{job.title}</h3>
            <p className='text-gray-600'>{job.company}</p>
            <p className='text-gray-500 text-sm'>{job.location}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

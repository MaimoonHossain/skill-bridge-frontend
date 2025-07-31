"use client";

import useGetAllJobs from "@/hooks/useGetAllJobs";
import Job from "@/types/job";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  CalendarDays,
} from "lucide-react";
import { format } from "date-fns";
import JobCard from "./JobCard";

export default function LatestJobs() {
  const { jobs, loading, error } = useGetAllJobs();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!jobs || jobs.length === 0)
    return <p>No jobs available at the moment.</p>;

  return (
    <section className='mt-10 max-w-7xl mx-auto px-4'>
      <h2 className='text-3xl font-bold mb-6 text-gray-900'>Latest Jobs</h2>

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
  );
}

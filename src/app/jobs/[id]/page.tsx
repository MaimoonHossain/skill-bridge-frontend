"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import Job from "@/types/job";

export default function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axiosInstance.get(`/job/get/${id}`);
        setJob(res.data.job);
      } catch (err) {
        console.error("Failed to fetch job:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <Loader2 className='animate-spin w-6 h-6 text-gray-500' />
      </div>
    );
  }

  if (!job) {
    return <div className='text-center mt-10 text-red-500'>Job not found.</div>;
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-10'>
      <div className='bg-white shadow-md rounded-xl p-6 space-y-6 border'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-gray-900'>{job.title}</h1>
          <span className='text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium'>
            {job.jobType}
          </span>
        </div>

        <div>
          <h2 className='text-sm text-gray-500 uppercase tracking-wide'>
            Company
          </h2>
          <p className='text-gray-800 font-medium'>{job.company.name}</p>
        </div>

        <div>
          <h2 className='text-sm text-gray-500 uppercase tracking-wide'>
            Location
          </h2>
          <p className='text-gray-800'>{job.location}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <h2 className='text-sm text-gray-500 uppercase tracking-wide'>
              Salary
            </h2>
            <p className='text-gray-800 font-semibold'>
              ${job.salary.toLocaleString()}
            </p>
          </div>
          <div>
            <h2 className='text-sm text-gray-500 uppercase tracking-wide'>
              Experience Required
            </h2>
            <p className='text-gray-800'>{job.experienceLevel}+ years</p>
          </div>
        </div>

        <div>
          <h2 className='text-sm text-gray-500 uppercase tracking-wide'>
            Description
          </h2>
          <p className='text-gray-700 leading-relaxed'>{job.description}</p>
        </div>

        <div>
          <h2 className='text-sm text-gray-500 uppercase tracking-wide'>
            Requirements
          </h2>
          <ul className='list-disc list-inside text-gray-700 space-y-1'>
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className='text-sm text-gray-500'>
          Posted on:{" "}
          <span className='text-gray-700'>
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

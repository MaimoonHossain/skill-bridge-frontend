"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Calendar, MapPin, BadgeCheck, Briefcase } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Job from "@/types/job";

// interface JobDetails {
//   _id: string;
//   title: string;
//   description: string;
//   requirements: string[];
//   salary: number;
//   experienceLevel: number;
//   location: string;
//   jobType: string;
//   createdAt: string;
//   company: {
//     _id: string;
//     name: string;
//     description: string;
//     website: string;
//     location: string;
//     logo: string;
//   };
// }

export default function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const res = await axiosInstance.get(`/job/get/${id}`);
        const jobData = res.data?.job;

        if (!jobData) {
          setError("Job not found.");
        } else {
          setJob(jobData);
        }
      } catch (err) {
        setError("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className='p-6 space-y-4'>
        <Skeleton className='h-8 w-2/3' />
        <Skeleton className='h-6 w-1/2' />
        <Skeleton className='h-32 w-full rounded-lg' />
      </div>
    );
  }

  if (error || !job) {
    return <div className='p-6 text-red-600 font-medium'>{error}</div>;
  }

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-6'>
      <div className='bg-white shadow-md rounded-xl p-6 border space-y-4'>
        {/* Header */}
        <div className='flex items-start gap-4'>
          {job.company.logo && (
            <Image
              src={job.company.logo}
              alt='Company Logo'
              width={64}
              height={64}
              className='rounded-md object-contain border'
            />
          )}
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>{job.title}</h1>
            <div className='text-gray-600 text-sm mt-1'>
              <Briefcase className='inline w-4 h-4 mr-1' />
              {job.company.name}
            </div>
            <div className='text-xs text-gray-400 mt-1'>
              <Calendar className='inline w-4 h-4 mr-1' />
              {new Date(job.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700'>
          <div className='flex items-center gap-2'>
            <MapPin className='w-4 h-4 text-green-600' />
            {job.location}
          </div>
          <div className='flex items-center gap-2'>
            <BadgeCheck className='w-4 h-4 text-purple-600' />
            {job.jobType}
          </div>
          <div className='flex items-center gap-2'>
            💰 Salary: ${job.salary.toLocaleString()}
          </div>
          <div className='flex items-center gap-2'>
            🧠 Experience: {job.experienceLevel}+ years
          </div>
        </div>

        {/* Description */}
        <div className='pt-4 border-t'>
          <h2 className='text-lg font-semibold mb-2'>Job Description</h2>
          <p className='text-gray-800 leading-relaxed whitespace-pre-wrap'>
            {job.description}
          </p>
        </div>

        {/* Requirements */}
        {job.requirements?.length > 0 && (
          <div className='pt-4 border-t'>
            <h2 className='text-lg font-semibold mb-2'>Requirements</h2>
            <ul className='list-disc list-inside space-y-1 text-gray-800'>
              {job.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Company Info show company logo also */}
        <div className='pt-4 border-t'>
          <h2 className='text-lg font-semibold mb-2'>About the Company</h2>
          <p className='text-gray-800'>{job.company.description}</p>
          <a
            href={job.company.website}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 text-sm mt-2 inline-block hover:underline'
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";
import JobCard from "@/common/JobCard";
import axiosInstance from "@/lib/axiosInstance";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (keyword) {
      // Fetch jobs based on keyword query
      const fetchJobs = async () => {
        try {
          const response = await axiosInstance.get(
            `/job/get?keyword=${keyword}`
          );
          setFilteredJobs(response.data.jobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };
      fetchJobs();
    }
  }, [keyword]);

  console.log("first", filteredJobs);
  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <div>
        <h1 className='text-3xl font-bold mb-6'>Browse Jobs</h1>
        <p className='text-gray-600 mb-4'>
          Explore the latest job opportunities available.
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredJobs?.map((job: any) => (
          <JobCard
            key={job._id}
            id={job._id}
            title={job.title}
            company={job.company?.name}
            location={job.location}
            description={job.description}
            tags={["Full-Time"]} // fallback since tags don't exist in API response
            createdAt={job.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

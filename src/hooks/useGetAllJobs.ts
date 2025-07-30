"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { useJobStore } from "@/store/useJobStore"; // adjust path if needed
import Job from "@/types/job";

const useGetAllJobs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const setAllJobs = useJobStore((state) => state.setAllJobs);
  const allJobs = useJobStore((state) => state.allJobs);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/job/get");
        const data: Job[] = response.data.jobs;
        setAllJobs(data); // ✅ Save to Zustand store
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if store is empty
    if (allJobs.length === 0) {
      fetchJobs();
    } else {
      setLoading(false);
    }
  }, [allJobs.length, setAllJobs]);

  return { jobs: allJobs, loading, error };
};

export default useGetAllJobs;

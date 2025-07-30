import Job from "@/types/job";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface JobStore {
  allJobs: Job[];
  setAllJobs: (jobs: Job[]) => void;
  addJob: (job: Job) => void;
  removeJob: (jobId: string) => void;
  clearAllJobs: () => void;
}

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      allJobs: [],
      setAllJobs: (jobs) => set({ allJobs: jobs }),
      addJob: (job) => set({ allJobs: [...get().allJobs, job] }),
      removeJob: (jobId) =>
        set({ allJobs: get().allJobs.filter((job) => job._id !== jobId) }),
      clearAllJobs: () => set({ allJobs: [] }),
    }),
    {
      name: "skill-bridge-all-jobs", // localStorage key
    }
  )
);

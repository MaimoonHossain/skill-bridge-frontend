"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddJobModal } from "@/common/recruiter/AddJobModal";
import { ConfirmDeleteModal } from "@/common/recruiter/ConfirmDeleteModal";
import axiosInstance from "@/lib/axiosInstance";
import Job from "@/types/job";
import { JobTable } from "@/common/recruiter/JobsTable";
import { Company } from "@/types/company";
import toast from "react-hot-toast";

const JobsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Job | null>(null);
  const [deleteData, setDeleteData] = useState<Job | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  const [companies, setCompanies] = useState<Company[]>([]);

  const fetchCompanies = async () => {
    // Replace with actual API call
    const response = await axiosInstance.get("/company/get");
    const data = await response.data.companies;
    setCompanies(data);
  };

  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get("/job/get");
      const data = await response.data.jobs;
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    // Fetch companies from API or local storage

    fetchCompanies();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs?.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (_id: string) => {
    try {
      const response = await axiosInstance.delete(`/job/delete/${_id}`);

      if (response.data.success) {
        toast.success("Job deleted successfully");

        // Update UI
        setJobs((prev) => prev.filter((j) => j._id !== _id));
        setConfirmOpen(false);
        setDeleteData(null);
      } else {
        toast.error(response.data.message || "Failed to delete job");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleSave = (newJob: Job) => {
    setJobs((prev) => {
      const exists = prev.find((j) => j._id === newJob._id);
      if (exists) {
        return prev.map((j) => (j._id === newJob._id ? newJob : j));
      }
      return [...prev, newJob];
    });
    setOpen(false);
    setEditData(null);
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <Input
          placeholder='Search job by title...'
          className='w-full sm:max-w-sm'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={() => setOpen(true)}>Post New Job</Button>
      </div>

      <JobTable
        jobs={filteredJobs}
        onEdit={(job: Job) => {
          setEditData(job);
          setOpen(true);
        }}
        onDelete={(job: Job) => {
          setDeleteData(job);
          setConfirmOpen(true);
        }}
      />

      <AddJobModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        job={editData}
        onSave={handleSave}
        companies={companies}
      />

      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setDeleteData(null);
        }}
        onConfirm={() => deleteData && handleDelete(deleteData._id)}
        title='Delete Job'
        description={`Are you sure you want to delete "${deleteData?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default JobsPage;

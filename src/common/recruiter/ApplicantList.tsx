"use client";

import axiosInstance from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ApplicantTable } from "./ApplicantTable";
import toast from "react-hot-toast";

interface Applicant {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profile?: {
    profilePhoto?: string;
    resume?: string;
    resumeOriginalName?: string;
  };
  status?: string;
}

interface Application {
  _id: string;
  applicant: Applicant;
  status: string;
  createdAt: string;
}

export default function ApplicantList({ jobId }: { jobId: string }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchApplicants = async () => {
    try {
      const response = await axiosInstance.get(`/job/get/${jobId}`);
      const job = response.data.job;
      const data: Application[] = job.applications;
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const handleUpdateStatus = async (
    applicationId: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      await axiosInstance.patch(`/application/update-status/${applicationId}`, {
        status,
      });
      toast.success(`Application ${status} successfully!`);
      fetchApplicants(); // Refresh the list after updating
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const filteredApplications = applications.filter((application) =>
    application.applicant.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  return (
    <div>
      <div className='flex flex-col sm:flex-row justify-between my-4 items-start sm:items-center gap-4'>
        <Input
          placeholder='Search company by name...'
          className='w-full sm:max-w-sm'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ApplicantTable
        applications={filteredApplications}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}

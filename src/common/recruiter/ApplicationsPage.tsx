"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDeleteModal } from "@/common/recruiter/ConfirmDeleteModal";
import axiosInstance from "@/lib/axiosInstance";
import toast from "react-hot-toast";

import { ApplicationTable } from "./ApplicationTable";
import type { Application as TableApplication } from "./ApplicationTable";
import { Application } from "@/types/application";

const ApplicationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [applications, setApplications] = useState<TableApplication[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<Application | null>(null);

  const fetchApplications = async () => {
    try {
      const response = await axiosInstance.get("/application/get");
      const data = response.data.applications;
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications: TableApplication[] = applications?.filter((app) =>
    app.applicant.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (_id: string) => {
    try {
      const response = await axiosInstance.delete(`/application/delete/${_id}`);
      if (response.data.success) {
        toast.success("Application deleted successfully");
        setApplications((prev) => prev.filter((a) => a._id !== _id));
        setConfirmOpen(false);
        setDeleteData(null);
      } else {
        toast.error(response.data.message || "Failed to delete application");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <Input
          placeholder='Search by candidate name...'
          className='w-full sm:max-w-sm'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ApplicationTable
        applications={filteredApplications}
        onDelete={(app: any) => {
          setDeleteData(app);
          setConfirmOpen(true);
        }}
        onEdit={(app: Application) => {
          // Handle edit logic here
          console.log("Edit application:", app);
        }}
      />

      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setDeleteData(null);
        }}
        onConfirm={() => deleteData && handleDelete(deleteData._id)}
        title='Delete Application'
        description={`Are you sure you want to delete the application of "${deleteData?.applicant.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default ApplicationsPage;

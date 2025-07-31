"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CompanyTable } from "@/common/recruiter/CompanyTable";
import { AddCompanyModal } from "@/common/recruiter/AddCompanyModal";
import { ConfirmDeleteModal } from "@/common/recruiter/ConfirmDeleteModal";
import axiosInstance from "@/lib/axiosInstance";

export type Company = {
  id: number | string;
  name: string;
  description: string;
  website: string;
  location: string;
  logo?: string;
};

const CompaniesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Company | null>(null);
  const [deleteData, setDeleteData] = useState<Company | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    // Fetch companies from API or local storage
    const fetchCompanies = async () => {
      // Replace with actual API call
      const response = await axiosInstance.get("/company/get");
      const data = await response.data.companies;
      setCompanies(data);
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies?.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: number | string) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    setConfirmOpen(false);
    setDeleteData(null);
  };

  const handleSave = (newCompany: Company) => {
    setCompanies((prev) => {
      const exists = prev.find((c) => c.id === newCompany.id);
      if (exists) {
        return prev.map((c) => (c.id === newCompany.id ? newCompany : c));
      }
      return [...prev, newCompany];
    });
    setOpen(false);
    setEditData(null);
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <Input
          placeholder='Search company by name...'
          className='w-full sm:max-w-sm'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={() => setOpen(true)}>Add New Company</Button>
      </div>

      <CompanyTable
        companies={filteredCompanies}
        onEdit={(company) => {
          setEditData(company);
          setOpen(true);
        }}
        onDelete={(company) => {
          setDeleteData(company);
          setConfirmOpen(true);
        }}
      />

      <AddCompanyModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        company={editData}
        onSave={handleSave}
      />

      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setDeleteData(null);
        }}
        onConfirm={() => deleteData && handleDelete(deleteData.id)}
        title='Delete Company'
        description={`Are you sure you want to delete "${deleteData?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default CompaniesPage;

"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Company } from "@/types/company";

export default function CompanyDetails({ companyId }: { companyId: string }) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axiosInstance.get(`/job/get/${companyId}`);
        setCompany(res.data.company);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to load company.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <Loader2 className='animate-spin w-6 h-6 text-gray-500' />
      </div>
    );

  if (!company)
    return <div className='text-red-500 text-center'>Company not found.</div>;

  return (
    <div className='bg-white shadow-md rounded-xl p-6 space-y-6'>
      <div className='flex items-center gap-6'>
        {company.logo ? (
          <Image
            src={company.logo}
            alt={company.name}
            width={80}
            height={80}
            className='rounded-lg object-contain border p-2'
          />
        ) : (
          <div className='w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm'>
            No Logo
          </div>
        )}

        <div>
          <h1 className='text-2xl font-semibold text-gray-900'>
            {company.name}
          </h1>
          <p className='text-gray-600'>{company.location}</p>
        </div>
      </div>

      <div>
        <h2 className='text-lg font-medium text-gray-800 mb-1'>About</h2>
        <p className='text-gray-700 leading-relaxed'>
          {company.description || "No description provided."}
        </p>
      </div>

      {company.website && (
        <div>
          <h2 className='text-lg font-medium text-gray-800 mb-1'>Website</h2>
          <a
            href={company.website}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline'
          >
            {company.website}
          </a>
        </div>
      )}
    </div>
  );
}

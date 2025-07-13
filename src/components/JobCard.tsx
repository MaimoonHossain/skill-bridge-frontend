"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export interface JobCardProps {
  id: string | number;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  createdAt: string;
}

export default function JobCard({
  id,
  title,
  company,
  location,
  description,
  tags,
  createdAt,
}: JobCardProps) {
  return (
    <div className='border p-4 rounded-lg shadow-sm hover:shadow-md transition'>
      <div className='text-sm text-gray-500 mb-1'>{createdAt}</div>
      <div className='flex items-center justify-between mb-2'>
        <div>
          <h4 className='font-semibold text-gray-800'>{company}</h4>
          <p className='text-sm text-gray-600'>{location}</p>
        </div>
        <button className='text-gray-400 hover:text-blue-600'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </button>
      </div>
      <h3 className='text-lg font-bold text-gray-900 mb-1'>{title}</h3>
      <p className='text-sm text-gray-600 mb-3'>{description}</p>
      <div className='flex flex-wrap gap-2 mb-3'>
        {tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              "text-xs px-2 py-1 rounded-full font-medium",
              tag === "Part Time"
                ? "bg-yellow-100 text-yellow-800"
                : tag.includes("LPA")
                ? "bg-purple-100 text-purple-800"
                : "bg-blue-100 text-blue-800"
            )}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className='flex justify-between'>
        <Link
          href={`/jobs/${id}`}
          className='text-sm text-blue-600 font-medium hover:underline'
        >
          Details
        </Link>
        <button className='bg-purple-600 text-white px-3 py-1 text-sm rounded hover:bg-purple-700'>
          Save For Later
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Navigate to jobs page with search query
    router.push(`/browse?keyword=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <section className='mt-10 text-center'>
      <h2 className='text-2xl font-semibold mb-4'>Find your dream jobs</h2>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col sm:flex-row items-center justify-center gap-2'
      >
        <input
          type='text'
          placeholder='Search jobs...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full sm:w-80 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
        >
          Search
        </button>
      </form>
    </section>
  );
}

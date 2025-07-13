import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-gray-100 border-t mt-12'>
      <div className='max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4'>
        {/* Logo */}
        <div className='text-xl font-semibold text-blue-600'>Skill Bridge</div>

        {/* Navigation Links */}
        <nav className='flex flex-wrap gap-4 text-gray-600'>
          <Link href='/' className='hover:text-blue-600'>
            Home
          </Link>
          <Link href='/jobs' className='hover:text-blue-600'>
            Jobs
          </Link>
          <Link href='/browse' className='hover:text-blue-600'>
            Browse
          </Link>
          <Link href='/login' className='hover:text-blue-600'>
            Login
          </Link>
          <Link href='/signup' className='hover:text-blue-600'>
            Sign Up
          </Link>
        </nav>
      </div>
      <div className='text-center text-sm text-gray-500 py-4 border-t'>
        © {new Date().getFullYear()} Skill Bridge. All rights reserved.
      </div>
    </footer>
  );
}

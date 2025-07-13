import JobSearchBar from "@/components/JobSearchBar";
import LatestJobs from "@/components/LatestJobs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='bg-blue-600 text-white p-6'>
        <h1 className='text-3xl font-bold'>Welcome to Skill Bridge</h1>
        <p className='mt-2'>Connect with jobs and skills.</p>
      </header>

      <main className='flex-1 max-w-4xl mx-auto p-6'>
        <JobSearchBar />

        <section className='mt-10'>
          <h2 className='text-2xl font-semibold mb-4'>About Us</h2>
          <p>
            Skill Bridge is a platform that connects job seekers with
            opportunities to enhance their skills and find employment.
          </p>
        </section>

        <section className='mt-10'>
          <h2 className='text-2xl font-semibold mb-4'>Get Started</h2>
          <p>Explore our job listings or sign up to start your journey.</p>
        </section>

        <LatestJobs />
      </main>

      <Footer />
    </div>
  );
}

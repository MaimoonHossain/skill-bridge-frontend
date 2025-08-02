import ApplicantList from "@/common/recruiter/ApplicantList";
import CompanyDetails from "@/common/recruiter/CompanyDetails";
import React, { Suspense } from "react";

export default function ApplicationsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className='p-6 space-y-6'>
      <Suspense
        fallback={
          <div className='text-center text-gray-500'>
            Loading applications...
          </div>
        }
      >
        <ApplicantList jobId={params.id} />
      </Suspense>
    </div>
  );
}

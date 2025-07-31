import CompanyDetails from "@/common/recruiter/CompanyDetails";
import React, { Suspense } from "react";

export default function CompanyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <Suspense
        fallback={
          <div className='text-center text-gray-500'>Loading company...</div>
        }
      >
        <CompanyDetails companyId={params.id} />
      </Suspense>
    </div>
  );
}

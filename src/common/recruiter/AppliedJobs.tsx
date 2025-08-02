import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Application } from "@/types/application";
import { Briefcase, MapPin, XCircle } from "lucide-react";

export const AppliedJobsTable = ({
  applications,
}: {
  applications: Application[];
}) => {
  return (
    <div className='rounded-xl border shadow-sm overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.map((application) => {
            const job = application.job as any;

            return (
              <TableRow key={application._id}>
                <TableCell className='font-medium'>
                  {job?.company?.logo ? (
                    <div className='flex items-center gap-2'>
                      <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className='h-8 w-8 object-cover rounded-full'
                      />
                      <span>{job.company.name}</span>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2 text-gray-500'>
                      <XCircle className='h-5 w-5' />
                      <span>N/A</span>
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  {job?.title || (
                    <span className='text-gray-500 italic'>N/A</span>
                  )}
                </TableCell>

                <TableCell>
                  {job?.location ? (
                    <div className='flex items-center gap-1'>
                      <MapPin className='h-4 w-4' />
                      <span>{job.location}</span>
                    </div>
                  ) : (
                    <span className='text-gray-500 italic'>N/A</span>
                  )}
                </TableCell>

                <TableCell>
                  {job?.salary ? `৳${job.salary.toLocaleString()}` : "N/A"}
                </TableCell>

                <TableCell className='capitalize'>
                  {application.status}
                </TableCell>

                <TableCell>
                  {new Date(application.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

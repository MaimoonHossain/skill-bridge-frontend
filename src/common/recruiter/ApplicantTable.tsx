import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Application } from "@/types/application";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, MoreVertical, X } from "lucide-react";

export const ApplicantTable = ({
  applications,
  onUpdateStatus,
}: {
  applications: any;
  onUpdateStatus: (
    applicationId: string,
    status: "accepted" | "rejected"
  ) => void;
}) => {
  return (
    <div className='rounded-xl border shadow-sm overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied At</TableHead>
            {/* <TableHead className='text-right'>Actions</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.map((application: Application) => {
            const applicant = application.applicant;

            return (
              <TableRow key={application._id}>
                <TableCell>
                  {applicant.profile?.profilePhoto ? (
                    <img
                      src={applicant.profile.profilePhoto}
                      alt={applicant.fullName}
                      className='h-10 w-10 rounded object-cover'
                    />
                  ) : (
                    <div className='h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500'>
                      N/A
                    </div>
                  )}
                </TableCell>
                <TableCell className='font-medium'>
                  {applicant.fullName}
                </TableCell>
                <TableCell>{applicant.email}</TableCell>
                <TableCell>{applicant.phoneNumber}</TableCell>
                <TableCell>
                  {applicant.profile?.resume ? (
                    <a
                      href={applicant.profile.resume}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:underline'
                    >
                      {applicant.profile.resumeOriginalName || "View Resume"}
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </TableCell>
                <TableCell className='capitalize'>
                  {application.status}
                </TableCell>
                <TableCell>
                  {new Date(application.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon'>
                        <MoreVertical className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() =>
                          onUpdateStatus(application._id, "accepted")
                        }
                      >
                        <Check className='mr-2 h-4 w-4' /> Accept
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() =>
                          onUpdateStatus(application._id, "rejected")
                        }
                      >
                        <X className='mr-2 h-4 w-4 text-red-500' /> Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

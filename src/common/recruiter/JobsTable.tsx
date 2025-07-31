import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import Job from "@/types/job";

export const JobTable = ({
  jobs,
  onEdit,
  onDelete,
}: {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
}) => {
  return (
    <div className='rounded-xl border shadow-sm overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell className='font-medium'>
                <Link
                  href={`/recruiter/jobs/${job._id}`}
                  className='text-blue-600 hover:underline'
                >
                  {job.title}
                </Link>
              </TableCell>
              <TableCell>
                {typeof job.company === "object" && "name" in job.company
                  ? job.company.name
                  : "N/A"}
              </TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.experienceLevel} yrs</TableCell>
              <TableCell>{job.jobType}</TableCell>
              <TableCell className='text-right'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <MoreVertical className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={() => onEdit(job)}>
                      <Pencil className='mr-2 h-4 w-4' /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(job)}>
                      <Trash className='mr-2 h-4 w-4 text-red-500' /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

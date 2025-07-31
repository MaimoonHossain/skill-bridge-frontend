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
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Application = {
  _id: string;
  job: { title: string; _id: string };
  applicant: { name: string; email: string; _id: string };
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

export const ApplicationTable = ({
  applications,
  onEdit,
  onDelete,
}: {
  applications: Application[];
  onEdit: (application: Application) => void;
  onDelete: (application: Application) => void;
}) => {
  return (
    <div className='rounded-xl border shadow-sm overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job</TableHead>
            <TableHead>Applicant</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied At</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application._id}>
              <TableCell className='font-medium'>
                {application.job?.title || "N/A"}
              </TableCell>
              <TableCell>{application.applicant?.name || "N/A"}</TableCell>
              <TableCell>{application.applicant?.email || "N/A"}</TableCell>
              <TableCell className='capitalize'>{application.status}</TableCell>
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
                    <DropdownMenuItem onClick={() => onEdit(application)}>
                      <Pencil className='mr-2 h-4 w-4' /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(application)}
                      className='text-red-600'
                    >
                      <Trash className='mr-2 h-4 w-4' /> Delete
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

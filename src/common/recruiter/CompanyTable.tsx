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
import { Company } from "@/types/company";
import Link from "next/link";

export const CompanyTable = ({
  companies,
  onEdit,
  onDelete,
}: {
  companies: Company[];
  onEdit: (company: any) => void;
  onDelete: (company: any) => void;
}) => {
  return (
    <div className='rounded-xl border shadow-sm overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company._id}>
              <TableCell className='p-1'>
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className='h-10 w-10 rounded object-contain'
                  />
                ) : (
                  <div className='h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500'>
                    No Logo
                  </div>
                )}
              </TableCell>
              <TableCell className='font-medium'>
                <Link
                  href={`/recruiter/companies/${company._id}`}
                  className='text-blue-600 hover:underline'
                >
                  {company.name}
                </Link>
              </TableCell>
              <TableCell>{company.description}</TableCell>
              <TableCell>
                <a
                  href={company.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:underline'
                >
                  {company.website}
                </a>
              </TableCell>
              <TableCell>{company.location}</TableCell>
              <TableCell className='text-right'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <MoreVertical className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={() => onEdit(company)}>
                      <Pencil className='mr-2 h-4 w-4' /> Edit
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onClick={() => onDelete(company)}>
                      <Trash className='mr-2 h-4 w-4 text-red-500' /> Delete
                    </DropdownMenuItem> */}
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

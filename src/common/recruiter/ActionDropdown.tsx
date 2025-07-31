"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ActionDropdown = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant='ghost' size='icon' className='h-8 w-8'>
          <MoreVertical className='h-4 w-4' />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className='min-w-[160px] bg-white border rounded-md shadow-lg p-1 z-50'
          sideOffset={8}
        >
          <DropdownMenu.Item
            onClick={onEdit}
            className='flex items-center gap-2 p-2 text-sm cursor-pointer rounded hover:bg-muted'
          >
            <Edit className='h-4 w-4 text-muted-foreground' />
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={onDelete}
            className='flex items-center gap-2 p-2 text-sm cursor-pointer rounded hover:bg-muted text-destructive'
          >
            <Trash2 className='h-4 w-4' />
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

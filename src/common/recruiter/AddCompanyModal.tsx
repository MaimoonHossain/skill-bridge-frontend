import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";
import { Company } from "@/types/company";

interface AddCompanyModalProps {
  open: boolean;
  onClose: () => void;
  company?: Company | null;
  onSave: (company: Company) => void;
}

export const AddCompanyModal = ({
  open,
  onClose,
  company,
  onSave,
}: AddCompanyModalProps) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logoFile: null as File | null,
    logoPreview: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (company) {
      setForm({
        name: company.name,
        description: company.description,
        website: company.website,
        location: company.location,
        logoFile: null,
        logoPreview: company.logo || "",
      });
    } else {
      setForm({
        name: "",
        description: "",
        website: "",
        location: "",
        logoFile: null,
        logoPreview: "",
      });
    }
  }, [company]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm((prev) => ({
        ...prev,
        logoFile: file,
        logoPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.website.trim() ||
      !form.location.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      // Prepare form data for multipart/form-data
      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("website", form.website);
      data.append("location", form.location);
      if (form.logoFile) {
        data.append("logo", form.logoFile);
      }

      let response;
      if (company?._id) {
        // Update existing company
        response = await axiosInstance.patch(
          `/company/update/${company._id}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        toast.success("Company updated successfully!");
        const updatedCompany: Company = {
          _id: response.data.company._id,
          name: response.data.company.name,
          description: response.data.company.description,
          website: response.data.company.website,
          location: response.data.company.location,
          logo: response.data.company.logo,
        };
        onSave(updatedCompany);
        onClose();
      } else {
        // For creating new company
        response = await axiosInstance.post("/company/register", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Company registered successfully!");
        const newCompany: Company = {
          _id: response.data.company._id,
          name: form.name,
          description: form.description,
          website: form.website,
          location: form.location,
          logo: response.data.company.logo,
        };
        onSave(newCompany);
        onClose();
      }
    } catch (error: any) {
      console.error("Failed to save company:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to save company. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            {company ? "Edit Company" : "Add New Company"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            name='name'
            placeholder='Company Name'
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            name='description'
            placeholder='Description'
            value={form.description}
            onChange={handleChange}
            required
          />
          <Input
            name='website'
            placeholder='Website'
            value={form.website}
            onChange={handleChange}
            required
          />
          <Input
            name='location'
            placeholder='Location'
            value={form.location}
            onChange={handleChange}
            required
          />
          <div>
            <label className='block mb-1 font-medium'>Company Logo</label>
            <input type='file' accept='image/*' onChange={handleFileChange} />
            {form.logoPreview && (
              <img
                src={form.logoPreview}
                alt='Logo Preview'
                className='mt-2 h-20 w-auto object-contain rounded'
              />
            )}
          </div>
          <div className='flex justify-end'>
            <Button type='submit' disabled={loading}>
              {loading
                ? company
                  ? "Updating..."
                  : "Saving..."
                : company
                ? "Update Company"
                : "Create Company"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

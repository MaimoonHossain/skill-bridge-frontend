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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Job from "@/types/job";

interface AddJobModalProps {
  open: boolean;
  onClose: () => void;
  job?: Job | null;
  companies: Company[];
  onSave: (job: Job) => void;
}

export const AddJobModal = ({
  open,
  onClose,
  job,
  companies,
  onSave,
}: AddJobModalProps) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    position: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setForm({
        title: job.title || "",
        description: job.description || "",
        requirements: job.requirements?.join(", ") || "",
        salary: job.salary.toString(),
        experienceLevel: job.experienceLevel.toString(),
        location: job.location || "",
        jobType: job.jobType || "",
        position: job.position.toString(),
        companyId:
          typeof job.company === "object" && job.company._id
            ? job.company._id.toString()
            : job.company
            ? job.company.toString()
            : "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        experienceLevel: "",
        location: "",
        jobType: "",
        position: "",
        companyId: "",
      });
    }
  }, [job]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "title",
      "description",
      "requirements",
      "salary",
      "experienceLevel",
      "location",
      "jobType",
      "position",
      "companyId",
    ];

    const hasEmpty = requiredFields.some(
      (field) => form[field as keyof typeof form].trim() === ""
    );

    if (hasEmpty) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      requirements: form.requirements.split(",").map((req) => req.trim()),
      salary: Number(form.salary),
      experience: Number(form.experienceLevel),
      location: form.location,
      jobType: form.jobType,
      position: Number(form.position),
      companyId: form.companyId,
    };

    try {
      setLoading(true);
      let response;

      if (job?._id) {
        response = await axiosInstance.patch(`/job/update/${job._id}`, payload);
        toast.success("Job updated successfully");
      } else {
        response = await axiosInstance.post("/job/post", payload);
        toast.success("Job created successfully");
      }

      onSave(response.data.job);
      onClose();
    } catch (error: any) {
      console.error("Job submission error:", error);
      toast.error(
        error.response?.data?.message || "Failed to save job. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{job ? "Edit Job" : "Add New Job"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            name='title'
            placeholder='Job Title'
            value={form.title}
            onChange={handleChange}
            required
          />
          <Textarea
            name='description'
            placeholder='Description'
            value={form.description}
            onChange={handleChange}
            required
          />
          <Textarea
            name='requirements'
            placeholder='Requirements (comma separated)'
            value={form.requirements}
            onChange={handleChange}
            required
          />
          <Input
            name='salary'
            type='number'
            placeholder='Salary'
            value={form.salary}
            onChange={handleChange}
            required
          />
          <Input
            name='experienceLevel'
            type='number'
            placeholder='Experience Level (in years)'
            value={form.experienceLevel}
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
          <Input
            name='position'
            type='number'
            placeholder='Position'
            value={form.position}
            onChange={handleChange}
            required
          />

          <Select
            value={form.jobType}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, jobType: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Job Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Full-Time'>Full-Time</SelectItem>
              <SelectItem value='Part-Time'>Part-Time</SelectItem>
              <SelectItem value='Internship'>Internship</SelectItem>
              <SelectItem value='Contract'>Contract</SelectItem>
              <SelectItem value='Remote'>Remote</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={form.companyId}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, companyId: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Company' />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company._id} value={company._id.toString()}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className='flex justify-end'>
            <Button type='submit' disabled={loading}>
              {loading
                ? job
                  ? "Updating..."
                  : "Creating..."
                : job
                ? "Update Job"
                : "Create Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

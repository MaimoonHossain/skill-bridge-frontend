"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(5, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Role is required"),
});

type FormData = z.infer<typeof schema>;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setServerError("");
    try {
      const res = await axiosInstance.post("user/register", data);
      if (res.data.success) {
        toast.success("Registration successful! Redirecting to login...");
        router.push("/login");
      }
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded shadow'>
      <h1 className='text-2xl font-bold mb-4'>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label className='block mb-1'>Full Name</label>
          <input
            {...register("fullName")}
            className='w-full border p-2 rounded'
          />
          {errors.fullName && (
            <p className='text-red-500 text-sm'>{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label className='block mb-1'>Email</label>
          <input
            {...register("email")}
            type='email'
            className='w-full border p-2 rounded'
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className='block mb-1'>Phone Number</label>
          <input
            {...register("phoneNumber")}
            className='w-full border p-2 rounded'
          />
          {errors.phoneNumber && (
            <p className='text-red-500 text-sm'>{errors.phoneNumber.message}</p>
          )}
        </div>
        <div>
          <label className='block mb-1'>Password</label>
          <input
            {...register("password")}
            type='password'
            className='w-full border p-2 rounded'
          />
          {errors.password && (
            <p className='text-red-500 text-sm'>{errors.password.message}</p>
          )}
        </div>
        <div>
          <label className='block mb-1'>Role</label>
          <select {...register("role")} className='w-full border p-2 rounded'>
            <option value=''>Select role</option>
            <option value='student'>Student</option>
            <option value='recruiter'>Recruiter</option>
          </select>
          {errors.role && (
            <p className='text-red-500 text-sm'>{errors.role.message}</p>
          )}
        </div>
        {serverError && <p className='text-red-500 text-sm'>{serverError}</p>}
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axiosInstance from "@/lib/axiosInstance";
import toast from "react-hot-toast";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import { DummyAvatar } from "@/assets/images";

const schema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  role: z.string().min(1, "Role is required"),
});

type FormData = z.infer<typeof schema>;

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      role: user?.role || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axiosInstance.put("/user/update", data, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Profile updated successfully");
        setUser(res.data.user);
        setIsEditing(false);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleEdit = () => {
    reset({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      role: user?.role || "",
    });
    setIsEditing(true);
  };

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>My Profile</h1>

      <div className='bg-white border rounded-lg shadow p-6 flex flex-col md:flex-row gap-6'>
        {/* Avatar */}
        <div className='flex-shrink-0'>
          <Image
            src={user?.profile?.profilePhoto || DummyAvatar}
            alt='Profile'
            width={150}
            height={150}
            className='rounded-full object-cover'
          />
        </div>

        {/* Profile Info */}
        {!isEditing ? (
          <div className='flex-1 space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-600'>
                Full Name
              </label>
              <p className='text-gray-800'>{user?.fullName}</p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-600'>
                Email
              </label>
              <p className='text-gray-800'>{user?.email}</p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-600'>
                Phone Number
              </label>
              <p className='text-gray-800'>{user?.phoneNumber}</p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-600'>
                Role
              </label>
              <p className='text-gray-800 capitalize'>{user?.role}</p>
            </div>
            <button
              onClick={handleEdit}
              className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className='flex-1 space-y-4'>
            <div>
              <label className='block mb-1'>Full Name</label>
              <input
                {...register("fullName")}
                className='w-full border px-3 py-2 rounded'
              />
              {errors.fullName && (
                <p className='text-red-500 text-sm'>
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <label className='block mb-1'>Email</label>
              <input
                {...register("email")}
                type='email'
                className='w-full border px-3 py-2 rounded'
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className='block mb-1'>Phone Number</label>
              <input
                {...register("phoneNumber")}
                className='w-full border px-3 py-2 rounded'
              />
              {errors.phoneNumber && (
                <p className='text-red-500 text-sm'>
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className='block mb-1'>Role</label>
              <select
                {...register("role")}
                className='w-full border px-3 py-2 rounded'
              >
                <option value=''>Select role</option>
                <option value='student'>Student</option>
                <option value='recruiter'>Recruiter</option>
              </select>
              {errors.role && (
                <p className='text-red-500 text-sm'>{errors.role.message}</p>
              )}
            </div>
            <div className='flex gap-2 mt-4'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition'
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

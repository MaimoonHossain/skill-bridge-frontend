"use client";

import { useUserStore } from "@/store/useUserStore";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "recruiter") {
      router.push("/");
    }
  }, [user, router]);

  return <div>{children}</div>;
}

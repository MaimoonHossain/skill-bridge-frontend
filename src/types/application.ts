import { Applicant } from "./applicant";

export type Application = {
  _id: string;
  job: { title: string; _id: string };
  applicant: Applicant;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

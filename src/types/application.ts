export type Application = {
  _id: string;
  job: { title: string; _id: string };
  applicant: { name: string; email: string; _id: string };
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

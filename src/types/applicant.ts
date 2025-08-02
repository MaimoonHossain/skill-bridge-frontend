export type Applicant = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profile?: {
    profilePhoto?: string;
    resume?: string;
    resumeOriginalName?: string;
  };
};

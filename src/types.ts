export interface Education {
  id: string;
  school: string;
  major: string;
  degree: string;
  startYear: string;
  endYear: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  companyLogo?: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  expectJob: string;
  city: string;
  salaryExpectation: string;
  educationList: Education[];
  workList: WorkExperience[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  salary: string;
  salaryMin: number; // in 'k'
  salaryMax: number; // in 'k'
  experience: string;
  education: string;
  tags: string[];
  city: string;
  district: string;
  recruiterName: string;
  recruiterTitle: string;
  recruiterAvatar: string;
  companyDetail: string;
  jobDuties: string[];
  requirements: string[];
  workHours: string;
  locationDetails: string;
}

export type ApplicationStatus = '邀请面试' | '已查看' | '不合适';

export interface DeliveryRecord {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  city: string;
  status: ApplicationStatus;
  appliedDate: string;
}

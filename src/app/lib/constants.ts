export type JobStatus = 'applied' | 'interview' | 'rejected' | 'offer';

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  url: string;
  salary?: string;
  status: JobStatus;
  description: string;
  dateApplied: string;
  notes?: string;
  contact?: string;
}
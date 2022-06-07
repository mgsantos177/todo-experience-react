export interface Itodo {
  id: string;
  description: string;
  deadline: Date;
  isLate?: boolean;
  status: string;
  updated_at: Date;
}

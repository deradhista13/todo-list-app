export interface TodoType {
  id: number;
  content: string;
  is_completed: boolean;
}

export interface DetailTaskType {
  id?: string;
  content?: string;
  created_at?: string;
  is_completed?: boolean;
  priority?: number;
  url?: string;
}

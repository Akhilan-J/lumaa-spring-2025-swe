// src/components/tasks/TaskTypes.ts
export interface Task {
    id: string;
    title: string;
    description?: string;
    isComplete: boolean;
    userId: string;
  }
  
  export interface CreateTaskDto {
    title: string;
    description?: string;
    isComplete: boolean;
  }
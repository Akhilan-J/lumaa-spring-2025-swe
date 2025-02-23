// src/components/auth/types.ts
export interface AuthResponse {
    status: 'success' | 'error';
    message?: string;
    data?: {
      token: string;
    };
    errors?: Array<{
      field: string;
      message: string;
    }>;
  }
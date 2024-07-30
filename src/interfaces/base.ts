export interface IRequestsInit {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

export interface IResponseInit {
  success: false;
  message: string | null;
}

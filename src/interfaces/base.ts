export interface IRequestsInit {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

export interface IResponseInit {
  success: false;
  message: string | null;
}

export interface AsyncThunkConfig {
  state?: unknown;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

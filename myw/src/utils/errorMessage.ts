export const errorHasMessage = (error: unknown): error is { message: string } => (
  typeof (error as { message?: string })?.message === 'string'
);

export const errorHasStatusCode = (error: unknown): error is { response: { status: number } } => (
  typeof (error as { response?: { status?: number } })?.response?.status === 'number'
);

export const getMessageFromError = (error: unknown) => (errorHasMessage(error) ? error.message : '');

export const getStatusCodeFromError = (error: unknown) => (errorHasStatusCode(error) ? error.response.status : undefined);

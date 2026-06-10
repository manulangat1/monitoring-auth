export class OkResponse {
  message: string;
  success: boolean;
}

export const okResponse = (
  message = 'Request executed successfully',
): OkResponse => ({
  message,
  success: true,
});

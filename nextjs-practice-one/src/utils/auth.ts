import { getErrorMessage } from './error';

// Config
import { auth } from '@/config';

// Constants
import { ERROR_STATUS, USER_ROLE } from '@/constants';

// Constants
import { INIT_USER_SESSION } from '@/constants/mocks';

// Types
import { APIRouteRequestProps, UserSession } from '@/types';

/**
 * Gets the user from the session.
 *
 * @returns A promise that resolves to the user, or an empty object if the user is not logged in.
 */
export const getUserFromSession = async (): Promise<Required<UserSession>> => {
  const session = await auth();
  const isAdmin = session?.user?.role?.name === USER_ROLE.ADMIN;
  const isCustomer = session?.user?.role?.name === USER_ROLE.CUSTOMER;

  return { ...INIT_USER_SESSION, ...session?.user, isAdmin, isCustomer };
};

/**
 * Handles an API route request and returns a response.
 *
 * The request is first parsed as JSON. If a schema is provided,
 * the parsed request is validated against the schema. If the
 * validation fails, a 400 response is returned with the validation
 * issues.
 *
 * If the request is valid, the request handler function is called
 * with the parsed request as an argument. The response from the
 * request handler is then returned as a JSON response.
 *
 * If an error occurs while calling the request handler, a 500
 * response is returned with the error message.
 *
 * @param {NextRequest} [request] - The request to handle.
 * @param {function} requestHandler - A function that takes the parsed
 * request and returns a promise that resolves to the response.
 * @param {z.ZodType} [schema] - A Zod schema to validate the request against.
 * @returns {Promise<Response>} A promise that resolves to the response.
 */
export const handleAPIRouteRequest = async <T, U>({
  request,
  requestHandler,
  schema,
}: APIRouteRequestProps<T, U>): Promise<Response> => {
  try {
    const payload = request ? await request.json() : undefined;

    if (payload && schema) {
      const valid = schema.safeParse(payload);

      if (!valid.success) {
        return Response.json(valid.error.issues, {
          status: ERROR_STATUS.BAD_REQUEST,
        });
      }
    }

    const response = await requestHandler(payload);

    return Response.json(response);
  } catch (error) {
    return Response.json(
      { error: { message: getErrorMessage(error) } },
      { status: ERROR_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};

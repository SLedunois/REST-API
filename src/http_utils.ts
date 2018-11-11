export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLIT: 409,
  INTERNAL_SERVER_ERROR: 500
};

export const MESSAGES = {
  INTERNAL_SERVER_ERROR: {
    message: "An internal error occurred. Please retry later."
  },
  NOT_FOUND: {
    message: "Resource not found."
  },
  CONFLIT: {
    message: "The resource was already updated by a third party."
  }
};

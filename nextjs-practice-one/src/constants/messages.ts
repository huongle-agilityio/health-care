export const ERROR_MESSAGES = {
  // Api
  DEFAULT_API_ERROR:
    'Please try again later or contact our team for further support.',
  EMAIL_PASSWORD_INVALID: 'You have entered an invalid username or password',
  UNAUTHORIZED: 'You are not authorized to perform this action.',

  // Validate
  REQUIRED: 'This field is required',

  INVALID_NAME: 'Please enter a valid name',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD:
    'Password must be 8+ characters with uppercase, number, and special character.',

  OUT_OF_RANGE: (min: number, max: number) =>
    `Must be greater than ${min} and less than ${max}.`,
  INVALID_NUMBER: 'Please enter a valid number.',
  MAX_FILE_SIZE: 'File size should not exceed 5MB',
  INVALID_FILE: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_IMAGE: 'Please upload a valid image',
  MAX_PHONE_NUMBER: 'Phone number must be 10 digits.',
};

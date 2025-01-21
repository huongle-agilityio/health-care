export const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const REGEX_PASSWORD =
  /^(?=.*[A-Z])(?=.*[a-zA-Z\d])(?=.*[@!#$%^&*])[A-Za-z\d@!#$%^&*]{8,}$/;

export const REGEX_PHONE_NUMBER = /^\+?[1-9]\d{1,14}$/;

export const REGEX_NON_NUMBER = /[^0-9-]/g;

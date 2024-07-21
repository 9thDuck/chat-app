import * as joi from 'joi';

export const configValidationSchema = joi.object({
  DB_URI: joi.string().required(),
  SERVER_SECRET: joi.string().required(),
  PORT: joi.number().required(),
});

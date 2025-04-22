import { z } from 'zod';


const warnForEmptyInput = 'must be type something';

export type loginFormProps = {
  password: string,
  email: string,
}

export const loginSchema = z.object({
    password: z.string().min(1, {message: warnForEmptyInput}),
    email: z.string().min(1, {message: warnForEmptyInput}).email({ message: 'Must be a valid email' }),
});
import { z } from 'zod';
import { SelectDataProps } from '../components/selects/RegisterSelect';

const GenderValue = ['male', 'female', ''] as const;
export const GenderSelectValue: SelectDataProps['selectData'] = ['male', 'female', ''];
type GenderInRegister = typeof GenderValue[number];

const warnForEmptyInput = 'must be type something'

export type registerFormProps = {
  name: string,
  confirmPassword: string,
  password: string,
  email: string,
  phone: string,
  birthYear: string,
  facebook: string,
  gender: GenderInRegister,
}
// Tạo schema đăng ký sử dụng Zod
export const registerSchema = z.object({
    name: z.string().min(2, { message: 'Full name length must be at least 2 characters' }),
    password: z.string().min(1, {message: warnForEmptyInput}).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'password must be at least 8 characters, at least one letter and one number'}),
    confirmPassword: z.string().min(1, {message: warnForEmptyInput}),
    email: z.string().min(1, {message: warnForEmptyInput}).email({ message: 'Must be a valid email' }),
    phone: z.string()
        .length(10, { message: "phone must be exactly 10 characters" })
        .regex(/(0[3|5|7|8|9])+([0-9]{8})\b/g, { message: "Must be a valid phone number" }),
    birthYear: z.string()
        .length(4, { message: 'Year of birth must be exactly 4 characters' })
        .regex(/^\d{4}$/, { message: 'Birth year must be 4 numbers' }),
    facebook: z.string().min(1, {message: warnForEmptyInput}).url({ message: 'Link contact must be a valid URL' }),
    gender: z.enum(GenderValue, { message: 'Gender must be either "male" or "female"' }).refine((value) => value.length > 0, { message: 'Gender must be either "male" or "female"' }),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "password did not match",
        path: ['confirmPassword']
      });
    }
  });;
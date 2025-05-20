import { z } from 'zod';


const warnForEmptyInput = 'must be type something';

export type editProfileProps = {
  name: string,
}

export const editProfileSchema = z.object({
    name: z.string().min(1, {message: warnForEmptyInput}),
});
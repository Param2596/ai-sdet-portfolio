import {z} from 'zod';

export const UserSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    avatar: z.string().url(),
});

export const UserListSchema = z.object({
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number(),
    data: z.array(UserSchema),
});

export type User = z.infer<typeof UserSchema>;


import {test, expect} from '@playwright/test';
import { UserSchema } from './schemas/user';

test('GET /api/users/2 returns 200 + valid user contract', async({request}) =>{
    const res = await request.get('/api/users/2');
    expect(res.status()).toBe(200);

    const body = await res.json();
    const parsed = UserSchema.safeParse(body.data);

    expect(parsed.success, JSON.stringify(parsed.error?.format())).toBe(true);
})
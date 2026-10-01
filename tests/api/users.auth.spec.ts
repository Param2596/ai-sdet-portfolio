import {test, expect} from '@playwright/test';
import { UserListSchema } from './schemas/user';

test('get /api/users returns users', async ({request}) => {
    const res = await request.get('/api/users', { params: { page: '2' } });
    expect(res.status()).toBe(200);
    const body = await res.json();
    const parsed = UserListSchema.safeParse(body);
    expect(parsed.success).toBe(true);
    expect(body.page).toBe(2);
});

test('post /api/login returns success', async({request}) => {
    const res = await request.post('/api/login', {
        data: {email: 'eve.holt@reqres.in', password: 'cityslicka'},
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
});

test('post /api/login missing password returns 400', async({request}) => {
    const res = await request.post('/api/login', {
        data: {email: 'eve.holt@reqres.in'},
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body).toHaveProperty('error');
});

test('incorrect URL returns 404', async({request}) => {
    const res = await request.get('/api/users/99999');
    expect(res.status()).toBe(404);
});
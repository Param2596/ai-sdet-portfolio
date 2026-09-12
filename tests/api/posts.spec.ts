import {test,expect}  from '@playwright/test';

const url = "https://jsonplaceholder.typicode.com/posts";

test('get /posts returns 200 and 100 items', async({request}) => {
    const res = await request.get(url);
   
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(100);
});

test('get /posts returns 200 and 1 item', async({request}) => {
    const res = await request.get(url + '/1');
   
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.id).toBe(1);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('userId');
});



test('POST /post creates a resource', async ({request}) => {
    const res = await request.post(url, {
        data: {
            title  : 'sdet-api',
            body: 'learning playwright request',
            userId: 1,
        },
    });

    expect(res.status()).toBe(201);

    const body = await res.json();
    expect(body.title).toBe('sdet-api');
    expect(body).toHaveProperty('id');   
}
);
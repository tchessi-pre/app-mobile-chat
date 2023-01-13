import client from './client';

export const user_signup = async data => {
    try {
        const response = await client.post('signup', {
            method: 'POST',
            headers: { 
                'content-Type': 'application/json',
            },
            data: data
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const user_login = async data => {
    try {
        const response = await client.post('login', {
            method: 'POST',
            headers: { 
                'content-Type': 'application/json',
            },
            data: data
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
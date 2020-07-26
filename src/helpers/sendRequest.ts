import axios from 'axios';
import {Item} from '../interfaces/Item';

const instance = axios.create({
    baseURL: 'https://fir-381f9.firebaseio.com/',
    timeout: 1000,
});

export const sendRequest = (
    method: string,
    body: {} | null,
) => {
    console.log(": ---------")
    console.log("body", body)
    console.log(": ---------")
    switch (method) {
        case 'POST':
            return instance.post('todos.json', body).then(res => sendRequest('GET', null));
        case 'GET':
            return instance
                .get('todos.json')
                .then(res => {

                    console.log('sendRequest -> get todos -> ', res.data)
                    const list: Item[] = [];
                    for (const element in res.data) {
                        //console.log('sendRequest -> get todos element-> ', element)
                        const item = res.data[element];
                        console.log('sendRequest -> get todos item-> ', item)
                        list.push({
                            id: element,
                            active: item.active ?? false,
                            value: item.value
                        })
                    }

                    console.log('sendRequest -> get todos list-> ', list)
                    return list;
                })
        case 'DELETE':
            return instance.delete(`todos/${body.id}.json`, {
                headers: {
                    'X-HTTP-Method-Override': 'DELETE'
                }
            })
                .then(res => sendRequest('GET', null));

        case 'PATCH':
            return instance.patch(`todos/${body.id}/.json`, {...body})
                .then(res => sendRequest('GET', null));

        default:
            console.log('send request -> default')
            return async () => [];
    }
};

export const userRequest = (url: string, body: {} | null) => {
    return instance.post('user.json', body).then(res => {
        console.log(': ----------------------');
        console.log('userRequest -> res', res);
        console.log(': ----------------------');
        return res.data;
    });
};

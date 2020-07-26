import {sendRequest} from '../helpers/sendRequest';

export const loadListAPI = () => {
  return sendRequest('GET', null);
};

export const addItemAPI = (value: string) => sendRequest('POST', {value});

export const checkItemAPI = (id: string, isChecked: true) =>
  sendRequest('PATCH', {id, active: isChecked});

export const deleteItemAPI = (id: number) => {
  return sendRequest('DELETE', {id});
};

export const editItemAPI = (id: number, value: string) =>
  sendRequest('POST', {id, value});

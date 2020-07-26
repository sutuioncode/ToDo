import {RootState} from './../interfaces/rootState';
import {call, put, takeEvery, select} from 'redux-saga/effects';
import {
    TODO_ACTIONS,
    AddEditedItemRequest,
    AddItemRequest,
    IsCheckedRequest,
    DeleteItemRequest,
} from './actionTypes';
import {
    loadListAPI,
    addItemAPI,
    deleteItemAPI,
    checkItemAPI,
    editItemAPI,
} from '../api/items';

function* loadListFromBE() {
    const token = yield select(
        (state: RootState) => state.userReducer.accessToken,
    );
    try {
        const itemsList = yield call(loadListAPI); //token);

        yield put({
            type: TODO_ACTIONS.LOAD_LIST_SUCCESS,
            payload: {data: itemsList},
        });
    } catch (e) {
        console.log('sagas -> loadListFromBE -> error:', e);
        yield put({
            type: TODO_ACTIONS.LOAD_LIST_FAIL,
        });
    }
}

function* addItemToList(action: AddItemRequest) {
    try {

        const itemsList = yield call(addItemAPI, action.payload.value); //token);

        yield put({
            type: TODO_ACTIONS.ADD_ITEM_SUCCESS,
            payload: {data: itemsList},
        });
    } catch (e) {
        console.log('sagas -> addItemToList -> error:', e);
        yield put({
            type: TODO_ACTIONS.ADD_ITEM_FAIL,
        });
    }
}

function* toggleActive(action: IsCheckedRequest) {
    console.log(': --------------------------------------')
    console.log('function*toggleActive -> action', action)
    console.log(': --------------------------------------')
    try {
        const itemsList = yield call(checkItemAPI, action.payload.id, !action.payload.checked); //token);
        yield put({
            type: TODO_ACTIONS.IS_CHECKED_SUCCESS,
            payload: {data: itemsList},
        });
    } catch (e) {
        console.log('sagas -> toggleActive -> error:', e);
        yield put({
            type: TODO_ACTIONS.IS_CHECKED_FAIL,
        });
    }
}

function* deleteItemFromList(action: DeleteItemRequest) {
    try {

        const itemsList = yield call(deleteItemAPI, action.payload.id); //token);
        console.log('sagas -> deleteItemFromList -> success:', itemsList);
        yield put({
            type: TODO_ACTIONS.DELETE_ITEM_SUCCESS,
            payload: {data: itemsList},
        });
    } catch (e) {
        console.log('sagas -> deleteItemFromList -> error:', e);
        yield put({
            type: TODO_ACTIONS.DELETE_ITEM_FAIL,
        });
    }
}

function* editItem(action: AddEditedItemRequest) {
    const {id, value} = action.payload;
    try {
        const itemsList = yield call(editItemAPI, id, value); //token);
        yield put({
            type: TODO_ACTIONS.ADD_EDITED_ITEM_SUCCESS,
            payload: {data: itemsList},
        });
    } catch (e) {
        yield put({
            type: TODO_ACTIONS.ADD_EDITED_ITEM_FAIL,
        });
    }
}

export function* listSaga() {
    yield takeEvery(TODO_ACTIONS.LOAD_LIST_REQUEST, loadListFromBE);
    yield takeEvery(TODO_ACTIONS.ADD_ITEM_REQUEST, addItemToList);
    yield takeEvery(TODO_ACTIONS.IS_CHECKED_REQUEST, toggleActive);
    yield takeEvery(TODO_ACTIONS.DELETE_ITEM_REQUEST, deleteItemFromList);
    yield takeEvery(TODO_ACTIONS.ADD_EDITED_ITEM_REQUEST, editItem);
}

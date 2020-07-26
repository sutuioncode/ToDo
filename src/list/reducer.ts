import {Item} from '../interfaces/Item';
import {
    AddEditedItemSuccess,
    AddItemSuccess,
    ClearCompletedSuccess,
    DeleteItemSuccess,
    IsCheckedSuccess,
    LoadListSuccess,
    ShowActive,
    ShowAll,
    ShowCompleted,
    TODO_ACTIONS,
} from './actionTypes';
import {MODES} from '../constants/constants';
import {ApiError} from "../api/ApiError";

export interface ListState {
    itemsList: Item[];
    itemsListToShow: Item[];
    mode: string;
}


export interface ListState {
    itemsList: Item[];
    itemsListToShow: Item[];
    mode: string;
    error: ApiError | null;
}

export const initialState: ListState = {
    itemsList: [],
    itemsListToShow: [],
    mode: MODES.ALL,
    error: null,
};

type ListReducerAction =
    | ShowAll
    | ShowActive
    | ShowCompleted
    | LoadListSuccess
    | AddItemSuccess
    | IsCheckedSuccess
    | AddEditedItemSuccess
    | DeleteItemSuccess
    | ClearCompletedSuccess;

export const listReducer = (
    state = initialState,
    action: ListReducerAction,
) => {
    console.log(': ---------------------------------');
    console.log('action ', action);
    console.log('state ', state);
    console.log(': ---------------------------------');


    switch (action.type) {
        case TODO_ACTIONS.ADD_ITEM_FAIL:
        case TODO_ACTIONS.DELETE_ITEM_FAIL:
        case TODO_ACTIONS.IS_CHECKED_FAIL:
        case TODO_ACTIONS.LOAD_LIST_FAIL:

            return {...state, error: ApiError.NETWORK_ERROR}

        case TODO_ACTIONS.SHOW_ACTIVE:
            return {
                ...state,
                mode: MODES.ACTIVE,
                itemsListToShow: state.itemsList ? state.itemsList.filter(item => item.active) : [],
            };
        case TODO_ACTIONS.SHOW_COMPLETED:
            return {
                ...state,
                mode: MODES.COMPLETED,
                itemsListToShow: state.itemsList ? state.itemsList.filter(item => !item.active) : [],
            };
        case TODO_ACTIONS.SHOW_ALL:
            return {
                ...state,
                mode: MODES.ALL,
                itemsListToShow: state.itemsList,
            };
        case TODO_ACTIONS.LOAD_LIST_SUCCESS:
            return {
                ...state,
                itemsList: action.payload.data,
                itemsListToShow: action.payload.data,
                mode: MODES.ALL,
            };
        case TODO_ACTIONS.IS_CHECKED_SUCCESS:
        case TODO_ACTIONS.ADD_ITEM_SUCCESS:
            return {
                ...state,
                itemsList: action.payload.data,
                itemsListToShow:
                    state.mode === MODES.ACTIVE
                        ? action.payload.data.filter((item: Item) => item.active)
                        : state.mode === MODES.COMPLETED
                        ? action.payload.data.filter((item: Item) => !item.active)
                        : action.payload.data,
            };

        case TODO_ACTIONS.DELETE_ITEM_SUCCESS:
        case TODO_ACTIONS.CLEAR_COMPLETED_SUCCESS:
        case TODO_ACTIONS.ADD_EDITED_ITEM_SUCCESS:
            return {
                ...state,
                itemsList: action.payload.data,
                itemsListToShow: action.payload.data,
            };


        default:
            return state;
    }
};

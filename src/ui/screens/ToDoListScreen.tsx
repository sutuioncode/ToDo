import React, {useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../../user/actions';
import {Main} from '../components/Main';
import {Item} from '../../interfaces/Item';
import {
    addItem,
    checkItem,
    clearCompleted,
    deleteItem,
    loadList,
    showActive,
    showAll,
    showCompleted,
} from '../../list/actions';
import {RootState} from '../../interfaces/rootState';
import {InputField} from '../components/InputField';
import {
    AddItemRequest,
    ClearCompletedRequest,
    DeleteItemRequest,
    IsCheckedRequest,
    LoadListRequest,
} from '../../list/actionTypes';
import {Menu} from '../components/Menu';
import {Header} from '../components/Header';
import {ApiError} from "../../api/ApiError";


interface ToDoListPageProps {
    token: string;
    itemsList: Item[];
    itemsListToShow: Item[];
    error: ApiError | null
    onLoadList: () => LoadListRequest;
    onAddItem: (value: string) => AddItemRequest;
    onCheck: (id: number, checked: boolean) => IsCheckedRequest;
    onDeleteItem: (id: number) => DeleteItemRequest;
    onClearCompleted: () => ClearCompletedRequest;
    onShowAll: () => Object;
    onShowActive: () => Object;
    onShowCompleted: () => Object;
    onLogout: () => Object;
    onLoading: boolean;
}

const ToDoListScreen = ({
                          itemsList,
                          itemsListToShow,
                          error,
                          onLoadList,
                          onAddItem,
                          onCheck,
                          onDeleteItem,
                          onClearCompleted,
                          onShowAll,
                          onShowActive,
                          onShowCompleted,
                          onLogout,
                      }: ToDoListPageProps) => {
    useEffect(() => {
        onLoadList();
    }, [onLoadList]);

    const del = (id: number): void => {
        onDeleteItem(id);
    };
    const isChecked = (id: number, checked: boolean = false): void => {
        onCheck(id, checked);
    };
    return (
        <View style={{padding: 5}}>
                <Header/>
                <InputField addItem={onAddItem}/>
                {itemsList ? (
                    <Main
                        itemsList={itemsListToShow}
                        isChecked={isChecked}
                        deleteItem={del}
                    />
                ) : null}
            <Menu
                onShowAll={onShowAll}
                onShowActive={onShowActive}
                onShowCompleted={onShowCompleted}
                onLogout={onLogout}
            />

        </View>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        itemsListToShow: state.listReducer.itemsListToShow,
        itemsList: state.listReducer.itemsList,
        token: state.userReducer.accessToken,
        onLoading: state.listReducer.loading,
    };
};

const mapDispatchToProps = {
    onLoadList: loadList,
    onAddItem: addItem,
    onDeleteItem: deleteItem,
    onCheck: checkItem,
    onClearCompleted: clearCompleted,
    onShowAll: showAll,
    onShowActive: showActive,
    onShowCompleted: showCompleted,
    onLogout: logout,
};


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ToDoListScreen);

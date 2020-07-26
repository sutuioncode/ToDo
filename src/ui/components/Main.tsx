import React from 'react';
import {ListItem} from './ListItem';
import {Item} from '../../interfaces/Item';
import {FlatList} from 'react-native';


interface MainProps {
    itemsList: Item[];
    isChecked: (id: string, checked: boolean) => void;
    deleteItem: (id: string) => void;
}

export const Main = ({itemsList, isChecked, deleteItem}: MainProps) => {
console.log("MAIN -> itemsList: ", itemsList);

    return (
        <FlatList
            data={itemsList}
            renderItem={({item}) => {

                return (
                    <ListItem
                        key={item.id}
                        item={item}
                        isChecked={isChecked}
                        deleteItem={deleteItem}
                    />
                );
            }}
        />
    );

};

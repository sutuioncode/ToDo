import React from 'react';
import styled from 'styled-components/native';
import {Icon} from 'react-native-elements';

const StyledMenu = styled.View`
  border-radius: 7px;
  background-color: #f3f3f3;
  position: absolute;
  top: 660px;
  left: 10px;
  right: 10px;
  flex-direction: row;
  justify-content: center;
`;

interface MenuProps {
  onShowAll: () => Object;
  onShowActive: () => Object;
  onShowCompleted: () => Object;
  onLogout: () => Object;
}

export const Menu = ({
  onShowAll,
  onShowActive,
  onShowCompleted,
}: MenuProps) => {
  return (
    <StyledMenu>
      <Icon
        raised
        name="home"
        type="font-awesome-5"
        color="#31456a"
        onPress={onShowAll}
      />
      <Icon
        raised
        name="list-ul"
        type="font-awesome-5"
        color="#31456a"
        onPress={onShowActive}
      />
      <Icon
        raised
        name="check"
        type="font-awesome-5"
        color="#31456a"
        onPress={onShowCompleted}
      />
    </StyledMenu>
  );
};

import React from 'react';
import styled from 'styled-components/native';
import {View} from "react-native";

const StyledHeader = styled.Text`
  font-size: 100px;
  color: #3F51B5;
  text-align: center;
  font-weight: 700;
  margin: 20px 20px 0px 20px;
`;

const StyledCaption = styled.Text`
  font-size: 18px;
  color: #3F51B5;
  text-align: center;
  font-weight: 500;
 
`;


const StyledSubCaption = styled.Text`
  font-size: 14px;
  color: #3F51B5;

  text-align: center;
  font-weight: 500;
  margin: 0px 5px 5px 5px;
 
`;

const ItalicWord = styled.Text`
 font-style: italic;
 font-size: 18px;
  color: #3F51B5;
  text-align: center;
  font-weight: 300;
  margin: 0px 0px 25px 0px;
 
`;


const TextGroup = styled.View`
 flexDirection: row
 justifyContent: center;
`;


export const Header = () => (<View>
        <StyledHeader>todos</StyledHeader>
        <StyledSubCaption>(Toda informação esta armazenada na web) </StyledSubCaption>
        <TextGroup><StyledCaption>Deslize para o </StyledCaption>
            <ItalicWord>todo</ItalicWord>
            <StyledCaption> para esquerda ou direita</StyledCaption>
        </TextGroup>

    </View>)
;

import * as React from 'react';
import {TextInput, View, TextInputProps} from 'react-native';
import styled from 'styled-components';

import {FONT} from '~/constants/styles';

import {SIZE} from '~/constants/styles';

interface IInputProps extends TextInputProps {}

export function Input({value, onChangeText}: IInputProps) {
  return (
    <Wrapper>
      <StyledInput placeholder="Enter" value={value} onChangeText={onChangeText} />
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  height: ${SIZE.inputHeight}px;
  max-height: ${SIZE.inputHeight}px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  border-width: 2px;
`;

const StyledInput = styled(TextInput)`
  width: 100%;
  font-style: normal;
  font-size: ${FONT.SIZE.fs16}px;
`;

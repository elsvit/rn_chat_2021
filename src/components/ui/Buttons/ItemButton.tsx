import * as React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components';

import {COLOR, FONT} from '~/constants/styles';
import {Typography} from '~/components/ui';

interface IButtonProps extends TouchableOpacityProps {
  label: string;
  color?: string;
  bgColor?: string;
  onPress: () => void;
}

export function ItemButton({
  label,
  color = COLOR.white,
  bgColor = COLOR.red,
  onPress,
}: IButtonProps) {
  return (
    <StyledButton onPress={onPress} style={{backgroundColor: bgColor}}>
      <Typography fontSize={FONT.SIZE.fs10} color={color}>
        {label}
      </Typography>
    </StyledButton>
  );
}

const StyledButton = styled(TouchableOpacity)`
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 6px;
  border-width: 1px;
  margin-left: 8px;
`;

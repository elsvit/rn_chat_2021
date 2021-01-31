import * as React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  TouchableOpacityProps,
  ImageSourcePropType,
} from 'react-native';
import styled from 'styled-components';

import {COLOR, SIZE} from '~/constants/styles';

interface IButtonProps extends TouchableOpacityProps {
  label: string;
  color?: string;
  bgColor?: string;
  hasBorder?: boolean;
  image?: ImageSourcePropType;
  onPress: () => void;
  rotate?: number | boolean;
  labelStyle?: any;
  width?: string | number;
}

export function Button({
  label,
  color = COLOR.red,
  bgColor = 'transparent',
  hasBorder = true,
  onPress,
  image,
  rotate,
  width = '100%',
  style,
  labelStyle,
  disabled,
  ...props
}: IButtonProps) {
  const borderColor = hasBorder ? color : 'transparent';
  let rotateStyle = null;
  if (rotate) {
    if (rotate === true) {
      rotateStyle = {transform: [{rotate: '-90deg'}]};
    } else {
      rotateStyle = {transform: [{rotate: `${rotate}deg`}]};
    }
  }
  return (
    <StyledButton
      onPress={onPress}
      activeOpacity={0.5}
      disabled={disabled}
      {...props}
      style={[
        style,
        {borderColor, backgroundColor: bgColor, maxWidth: width, opacity: disabled ? 0.5 : 1},
        rotateStyle,
      ]}>
      <Label style={{color, ...labelStyle}}>{label}</Label>
      {image && <IconImage source={image} resizeMode="contain" />}
    </StyledButton>
  );
}

const StyledButton = styled(TouchableOpacity)`
  flex: 1;
  height: ${SIZE.buttonHeight}px;
  max-height: ${SIZE.buttonHeight}px;
  border-radius: ${SIZE.buttonRadius}px;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  border-width: 2px;
  border-radius: ${SIZE.buttonHeight / 2}px;
`;

const Label = styled(Text)`
  width: 100%;
  font-style: normal;
  text-align: center;
`;

const IconImage = styled(Image)`
  width: 20px;
  height: 20px;
`;

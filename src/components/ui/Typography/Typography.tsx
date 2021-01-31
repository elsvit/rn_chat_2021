import * as React from 'react';
import {Text} from 'react-native';
import {COLOR, FONT} from '~/constants/styles';

interface ITypographyProps {
  color?: string;
  fontSize?: number;
  bold?: boolean;
  letterSpacing?: number;
  textAlign?: 'left' | 'center' | 'right';
  style?: any;
  children: any;
}

export default function Typography({
  color = COLOR.blue,
  fontSize = FONT.SIZE.fs17,
  letterSpacing,
  textAlign,
  style,
  children,
  ...props
}: ITypographyProps) {
  return (
    <Text
      style={[
        {
          color,
          fontSize,
          letterSpacing,
          textAlign,
          lineHeight: fontSize * 1.2,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
}

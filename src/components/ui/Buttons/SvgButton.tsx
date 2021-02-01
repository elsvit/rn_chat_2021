import * as React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styled from 'styled-components';

import {FONT, COLOR} from '~/constants/styles';

interface ISvgButtonProps {
  SvgIcon?: any; // svg
  color?: string;
  title?: string;
  titleColor?: string;
  width?: number;
  style?: any;
  onPress?: () => void;
}

export function SvgButton({
  SvgIcon,
  color = COLOR.blue,
  title = '',
  width = 24,
  style,
  onPress,
}: ISvgButtonProps) {

  const wrapperStyle = {
    flex: 1,
    height: width,
    maxHeight: width,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  };

  const renderInside = () => (
    <>
      {SvgIcon && <SvgIcon width={width} height={width} fill={color} stroke={color} />}
      {title ? <Label>{title}</Label> : null}
    </>
  );

  return !!onPress ? (
    <TouchableOpacity onPress={onPress} style={{...wrapperStyle, ...style}}>
      {renderInside()}
    </TouchableOpacity>
  ) : (
    <View style={{...wrapperStyle, ...style}}>{renderInside()}</View>
  );
}

const Label = styled(Text)`
  font-size: ${FONT.SIZE.fs16}px;
  line-height: ${FONT.SIZE.fs16 * 1.2}px;
  color: ${COLOR.silver}
  margin-left: 8px;
`;

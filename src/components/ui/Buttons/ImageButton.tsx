import * as React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';

import {FONT, COLOR} from '~/constants/styles';

interface IImageButtonProps {
  imageSource?: string;
  title?: string;
  titleColor?: string;
  style?: any;
  titleStyle?: any;
  iconStyle?: any;
  width?: number;
  rightRadius?: number;
  onPress?: () => void;
}

export function ImageButton({
  onPress,
  title,
  titleStyle,
  imageSource,
  style,
  width = 24,
  iconStyle,
}: IImageButtonProps) {
  const wrapperStyle = {
    flex: 1,
    width,
    height: width,
    maxHeight: width,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  };

  const renderInside = () => {
    const renderInsideStile = {
      width,
      height: width,
      ...iconStyle,
    };
    return (
      <>
        {imageSource && <Image source={{uri: imageSource}} style={renderInsideStile} />}
        {title ? <Label style={titleStyle}>{title}</Label> : null}
      </>
    );
  };

  return !!onPress ? (
    <TouchableOpacity onPress={onPress} style={{...wrapperStyle, ...style}}>
      {renderInside()}
    </TouchableOpacity>
  ) : (
    <View style={{...wrapperStyle, ...style}}>{renderInside}</View>
  );
}

const Label = styled(Text)`
  font-size: ${FONT.SIZE.fs16}px;
  line-height: ${FONT.SIZE.fs16 * 1.2}px;
  color: ${COLOR.white}
  margin-left: 8px;
`;

import * as React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import styled from 'styled-components';

import {COLOR} from '~/constants/styles';

export interface ISafeAreaBackground {
  bgColor?: string;
  children?: any;
}

export default function SafeAreaBackground({children, bgColor}: ISafeAreaBackground) {
  return (
    <Wrapper style={{backgroundColor: bgColor || COLOR.white}}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <WrapperSafe style={{backgroundColor: bgColor || COLOR.white}}>{children}</WrapperSafe>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  flex: 1;
  position: relative;
`;

const WrapperSafe = styled(SafeAreaView)`
  flex: 1;
`;

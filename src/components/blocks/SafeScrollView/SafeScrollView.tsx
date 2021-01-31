import React, {ReactElement} from 'react';
import styled from 'styled-components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {SafeAreaBackground, ScreenHeader, IScreenHeaderProps} from '~/components/blocks';
import {COLOR} from '~/constants/styles';

interface IOwnProps {
  screenHeaderProps?: IScreenHeaderProps | null;
  children: any;
  bgColor?: string;
}

type ISafeScrollViewProps = IOwnProps;

const SafeScrollView = ({
  screenHeaderProps,
  bgColor = COLOR.white,
  children,
}: ISafeScrollViewProps): ReactElement => {
  return (
    <SafeAreaBackground bgColor={bgColor}>
      {Boolean(screenHeaderProps) && <ScreenHeader {...screenHeaderProps} />}
      <WrapperScrollable
        contentContainerStyle={{
          alignItems: 'flex-start',
          padding: 0,
          minHeight: 200,
        }}
        style={{
          backgroundColor: bgColor,
        }}
        keyboardShouldPersistTaps={'always'}>
        {children}
      </WrapperScrollable>
    </SafeAreaBackground>
  );
};

const WrapperScrollable = styled(KeyboardAwareScrollView)`
  flex: 1;
`;

export default SafeScrollView;

import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';

import {COLOR, SIZE} from '~/constants/styles';
import {Input, SvgButton} from '~/components/ui';
import {ArrowRightIcon, AddIcon} from '~/assets/icons';

interface IMainViewProps {
  submit: (str: string) => void;
  onUploadPress: () => void;
  hasFiles: boolean;
}

const BottomInput = ({submit, onUploadPress, hasFiles}: IMainViewProps) => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = () => {
    if (value.toString() || hasFiles) {
      submit(value);
      setValue('');
    }
  };

  return (
    <BottomWrapper>
      <StyledButton activeOpacity={0} style={{alignItems: 'flex-end'}}>
        <SvgButton
          SvgIcon={AddIcon}
          onPress={onUploadPress}
          color={COLOR.blue}
          width={32}
          style={{
            justifyContent: 'flex-end',
            alignSelf: 'center',
          }}
        />
      </StyledButton>
      <InputWrapper>
        <Input onChangeText={setValue} value={value} placeholder={''} />
      </InputWrapper>
      <StyledButton activeOpacity={0} style={{alignItems: 'flex-end'}}>
        <SvgButton
          SvgIcon={ArrowRightIcon}
          onPress={handleSubmit}
          color={COLOR.blue}
          width={40}
          style={{
            justifyContent: 'flex-end',
            alignSelf: 'center',
          }}
        />
      </StyledButton>
    </BottomWrapper>
  );
};

const BottomWrapper = styled(View)`
  position: absolute;
  bottom: 0;
  flex: 1;
  width: 100%;
  padding: 8px;
  flex-direction: row;
  align-items: center;
  background-color: ${COLOR.white};
  height: ${SIZE.inputHeight + 28};
`;

const InputWrapper = styled(View)`
  flex: 1;
  align-items: center;
`;

const StyledButton = styled(TouchableOpacity)`
  flex: 1;
  width: 50px;
  max-width: 15%;
  height: ${SIZE.screenHeaderHeight}px;
  opacity: 1;
  justify-content: center;
  align-items: center;
`;

export default BottomInput;

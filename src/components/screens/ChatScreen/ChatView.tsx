import * as React from 'react';
import {SectionList, FlatList, View, ViewStyle, ListRenderItem} from 'react-native';
import styled from 'styled-components';
import moment from 'moment';

import {COLOR, FONT, SIZE} from '~/constants/styles';
import {Typography} from '~/components/ui';
import {UserIcon} from '~/assets/icons';
import {SafeAreaBackground, ScreenHeader} from '~/components/blocks';
import {IMessage, ListType} from '~/types';
import BottomInput from './BottomInput';

const renderItem: ListRenderItem<IMessage> = ({item: {id, message, time, userType}}) => {
  const isMy = userType === ListType.Me;
  const formattedDate = moment(time).format('YY.MM.DD HH:mm');
  return (
    <ItemWrapper isMy={isMy} key={id}>
      <MessageContainer isMy={isMy}>
        <Typography fontSize={FONT.SIZE.fs10} color={COLOR.darkGrey}>
          {formattedDate}
        </Typography>
        <Typography fontSize={FONT.SIZE.fs16} color={COLOR.black}>
          {message}
        </Typography>
      </MessageContainer>
    </ItemWrapper>
  );
};

interface IMainViewProps {
  name: string;
  data: IMessage[];
  type: ListType;
  avatarSrc?: string | undefined;
  onAvatarPress: () => void;
  onBackPress: () => void;
  sendMessage: (val: string) => void;
  onUploadButtonPress: () => void;
  hasFiles: boolean;
  listChanges: number;
}

const ChatView = ({
  data,
  name: propName,
  avatarSrc,
  onBackPress,
  sendMessage,
  onUploadButtonPress,
  hasFiles,
  listChanges,
}: IMainViewProps) => {
  const title = `${propName || 'Unknown'} (Chat)`.substr(0, 40);

  return (
    <SafeAreaBackground>
      <ScreenHeader
        title={title}
        color={COLOR.black}
        onLeftPress={onBackPress}
        leftColor={COLOR.darkGrey}
        RightSvgIcon={UserIcon}
        rightImageSrc={avatarSrc}
        rightColor={COLOR.darkGrey}
      />

      <Wrapper>
        <FlatList
          key={listChanges}
          data={data}
          extraData={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          inverted
          // onEndReached={(distanceFromEnd) => {})
          initialNumToRender={100}
        />
      </Wrapper>

      <BottomInput submit={sendMessage} onUploadPress={onUploadButtonPress} hasFiles={hasFiles} />
    </SafeAreaBackground>
  );
};

const Wrapper = styled(View)`
  flex: 1;
  padding: 0 16px;
  padding-bottom: ${SIZE.inputHeight + 32};
`;

const ItemWrapper = styled(View)<ViewStyle & {isMy?: boolean}>`
  flex: 1;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
  padding-horizontal: 8px;
  padding-top: 4px;
  align-items: center;
  justify-content: ${({isMy}) => (isMy ? 'flex-end' : 'flex-start')};
`;

const MessageContainer = styled(View)<ViewStyle & {isMy: boolean}>`
  overflow: hidden;
  padding: 4px 8px 8px;
  margin-vertical: 4px;
  max-width: 77%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: ${({isMy}) => (isMy ? '16px' : '0')};
  border-bottom-right-radius: ${({isMy}) => (isMy ? '0' : '16px')};
  background-color: ${COLOR.whiteTwo};
  border-color: ${COLOR.silver};
  border-width: 1px;
`;
export default ChatView;

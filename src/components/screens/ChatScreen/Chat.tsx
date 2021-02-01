import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

import {IAppState} from '~/store';
import {getLocalDate, uuidV4} from '~/services/utils';
import {getPeopleByIdxAction, PeopleActions, setSelectedPeopleAction} from '~/store/people';
import {getGroupsByIdxAction, GroupsActions, setSelectedGroupAction} from '~/store/groups';
import {
  getMessagesByIdAction,
  setCurrentUserAction,
  resetMessagesAction,
  sendMessageByIdAction,
} from '~/store/messages';
import {useCommonByAction} from '~/services/utils';
import ChatView from './ChatView';
import {
  IPeople,
  IGroup,
  ListType,
  RootStackNavigation,
  Screen,
  RootStackParamList,
  IMessage,
} from '~/types';

type Props = {
  navigation: RootStackNavigation;
  route: RouteProp<RootStackParamList, Screen.Details>;
};

const Chat = ({navigation, route}: Props) => {
  const dispatch = useDispatch();

  const {type, index, name} = route?.params || {};

  const list: IMessage[] = useSelector((state: IAppState) => state.messages.list);

  const [listChanges, setListChanges] = useState<number>(0);
  const [uploadFiles, setUploadFiles] = React.useState<any[]>([]);

  useEffect(() => {
    setListChanges(listChanges + 1);
  }, [list]);

  useEffect(() => {
    dispatch(setCurrentUserAction({type, idx: index}));
    dispatch(getMessagesByIdAction({type, idx: index}));
    return () => {
      dispatch(resetMessagesAction());
    };
  }, []);

  useEffect(() => {
    switch (type) {
      case ListType.People: {
        dispatch(getPeopleByIdxAction(index));
        break;
      }
      case ListType.Groups: {
        dispatch(getGroupsByIdxAction(index));
        break;
      }
    }
    return () => {
      switch (type) {
        case ListType.People: {
          dispatch(setSelectedPeopleAction(null));
          break;
        }
        case ListType.Groups: {
          dispatch(setSelectedGroupAction(null));
          break;
        }
      }
    };
  }, [type, index]);

  const sendMessage = (message: string) => {
    if (message.toString()) {
      const id = uuidV4();
      const time = getLocalDate();
      const data = {id, message, time, userIdx: 0, userType: ListType.Me};
      dispatch(sendMessageByIdAction(data));
    }
    if (uploadFiles) {
      // dispatch(sendFilesByIdAction(uploadFiles)); // todo , with remove from state when uploaded
    }
  };

  const onAvatarPress = () => {
    navigation.navigate(Screen.Details, {type, index, name});
  };

  const onUploadButtonPress = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      const newUploadFiles = [...uploadFiles, ...results];
      setUploadFiles(newUploadFiles);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <ChatView
      type={type}
      data={list}
      name={name}
      sendMessage={sendMessage}
      onAvatarPress={onAvatarPress}
      onBackPress={onBackPress}
      onUploadButtonPress={onUploadButtonPress}
      hasFiles={!!uploadFiles.length}
      listChanges={listChanges}
    />
  );
};

export default Chat;

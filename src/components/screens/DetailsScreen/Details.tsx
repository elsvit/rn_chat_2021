import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';

import {IAppState} from '~/store';
import {getPeopleByIdxAction, PeopleActions, setSelectedPeopleAction} from '~/store/people';
import {getGroupsByIdxAction, GroupsActions, setSelectedGroupAction} from '~/store/groups';
import {useCommonByAction} from '~/services/utils';
import DetailsView from './DetailsView';
import {IPeople, IGroup, ListType, RootStackNavigation, Screen, RootStackParamList} from '~/types';

type Props = {
  navigation: RootStackNavigation;
  route: RouteProp<RootStackParamList, Screen.Details>;
};

const Details = ({navigation, route}: Props) => {
  const dispatch = useDispatch();

  const {type, index, name} = route?.params || {};

  const details: IPeople | IGroup | null = useSelector((state: IAppState) => {
    switch (type) {
      case ListType.People: {
        return state.people?.selected || null;
      }
      case ListType.Groups: {
        return state.groups?.selected || null;
      }
      default:
        return null;
    }
  });

  const {loading: isPeopleLoading, apiErrorMessage: errorGetPeople} = useCommonByAction(
    PeopleActions.PEOPLE_GET_BY_IDX,
  );
  const {loading: isGroupsLoading, apiErrorMessage: errorGetGroup} = useCommonByAction(
    GroupsActions.GROUPS_GET_BY_IDX,
  );
  const isLoading = isPeopleLoading || isGroupsLoading;

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

  const onAvatarPress = () => {
    navigation.navigate(Screen.Chat, {type, index, name});
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <DetailsView
      type={type}
      data={details}
      name={name}
      onAvatarPress={onAvatarPress}
      onBackPress={onBackPress}
      isLoading={!!isLoading}
    />
  );
};

export default Details;

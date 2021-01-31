import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {IAppState} from '~/store';
import {getPeopleAction, PeopleActions} from '~/store/people';
import {getGroupsAction, GroupsActions} from '~/store/groups';
import {useCommonByAction} from '~/services/utils';
import MainView from './MainView';
import {IPeople, IGroup, ListType, RootStackNavigation, Screen} from '~/types';

export interface INameIdx {
  name: string;
  idx: number;
}

export interface IListBlock {
  title: string;
  type: ListType;
  data: INameIdx[];
}

type Props = {
  navigation: RootStackNavigation;
};

const Main = ({navigation}: Props) => {
  const dispatch = useDispatch();

  const peopleList = useSelector((state: IAppState) => state.people?.list);
  const peoplePage = useSelector((state: IAppState) => state.people?.page);
  const planetsList = useSelector((state: IAppState) => state.groups?.list);
  const planetsPage = useSelector((state: IAppState) => state.groups?.page);
  const {loading: isPeopleLoading, apiErrorMessage: errorGetPeople} = useCommonByAction(
    PeopleActions.PEOPLE_GET,
  );
  const {loading: isGroupsLoading, apiErrorMessage: errorGetGroups} = useCommonByAction(
    GroupsActions.GROUPS_GET,
  );

  const [list, setList] = useState<IListBlock[]>([]);
  const [searchedValue, setSearchedValue] = useState<string>('');

  const filteredList = (val: string) => {
    const peopleData: INameIdx[] = peopleList
      .map((el: IPeople) => ({name: el?.name || '', idx: el.idx}))
      .filter((el) => el.name.toLowerCase().includes(val.toLowerCase()));
    const newPeopleList: IListBlock = {title: 'People', type: ListType.People, data: peopleData};

    const planetsData: INameIdx[] = planetsList
      .map((el: IGroup) => ({name: el?.name || '', idx: el.idx}))
      .filter((el) => el.name.toLowerCase().includes(val.toLowerCase()));
    const newGroupsList: IListBlock = {
      title: 'Groups',
      type: ListType.Groups,
      data: planetsData,
    };

    setList([newPeopleList, newGroupsList]);
  };

  useEffect(() => {
    filteredList(searchedValue);
  }, [peopleList, planetsList]);

  useEffect(() => {
    dispatch(getPeopleAction({page: 1}));
    dispatch(getGroupsAction({page: 1}));
  }, []);

  const onItemPress = (type: ListType, idx: number, name: string) => {
    navigation.navigate(Screen.Details, {type, index: idx + 1, name});
  };

  const onChatPress = (type: ListType, idx: number, name: string) => {
    navigation.navigate(Screen.Chat, {type, index: idx + 1, name});
  };

  const onLoadMorePress = (type: ListType) => {
    switch (type) {
      case ListType.People: {
        if (!isPeopleLoading) {
          dispatch(getPeopleAction({page: (peoplePage || 0) + 1}));
        }
        break;
      }
      case ListType.Groups: {
        if (!isGroupsLoading) {
          dispatch(getGroupsAction({page: (planetsPage || 0) + 1}));
        }
        break;
      }
    }
  };

  const search = (val: string) => {
    setSearchedValue(val);
    filteredList(val);
  };

  return (
    <MainView
      list={list}
      searchedValue={searchedValue}
      search={search}
      onItemPress={onItemPress}
      onChatPress={onChatPress}
      onLoadMorePress={onLoadMorePress}
    />
  );
};

export default Main;

import * as React from 'react';
import {View, SectionList, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

import {COLOR, FONT} from '~/constants/styles';
import {SafeAreaBackground, ScreenHeader} from '~/components/blocks';
import {Typography, ItemButton, SearchInput} from '~/components/ui';
import {IListBlock, INameIdx} from './Main';
import {ListType} from '~/types';

interface IMainViewProps {
  list: IListBlock[];
  searchedValue: string;
  search: (val: string) => void;
  onChatPress: (type: ListType, idx: number, name: string) => void;
  onItemPress: (type: ListType, idx: number, name: string) => void;
  onLoadMorePress: (type: ListType) => void;
}

const MainView = ({
  list,
  searchedValue,
  search,
  onItemPress,
  onChatPress,
  onLoadMorePress,
}: IMainViewProps) => {
  const renderItem = ({item, section: {type}}: {item: INameIdx; section: {type: ListType}}) => {
    const handleItemPress = () => onItemPress(type, item.idx, item.name);
    const hanvleChatPress = () => onChatPress(type, item.idx, item.name);

    return (
      <ItemWrapper>
        <TextWrapper onPress={handleItemPress}>
          <Typography fontSize={FONT.SIZE.fs16} color={COLOR.grey}>
            {item.name}
          </Typography>
        </TextWrapper>
        <ItemButton label={'Chat'} onPress={hanvleChatPress} />
      </ItemWrapper>
    );
  };

  const renderSectionHeader = ({section: {title}}: {section: {type: ListType; title: string}}) => {
    return (
      <ItemWrapper>
        <Typography fontSize={FONT.SIZE.fs20} color={COLOR.lavenderBlue}>
          {title}
        </Typography>
      </ItemWrapper>
    );
  };

  const renderSectionFooter = ({section: {type}}: {section: {type: ListType; title: string}}) => {
    const onPress = () => onLoadMorePress(type);
    return (
      <ItemWrapper>
        <ItemButton label={'LOAD MORE'} onPress={onPress} bgColor={COLOR.lavenderBlue} />
      </ItemWrapper>
    );
  };

  console.log('list', list);

  return (
    <SafeAreaBackground>
      <ScreenHeader title={'Star Wars Chat List'} color={COLOR.silver} />

      <SearchWrapper>
        <StyledSearch value={searchedValue} onChangeText={search} />
      </SearchWrapper>

      <ListWrapper>
        <SectionList
          sections={list}
          keyExtractor={(item, index) => item.name + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          renderSectionFooter={renderSectionFooter}
        />
      </ListWrapper>
    </SafeAreaBackground>
  );
};

const StyledSearch = styled(SearchInput)`
  margin-horizontal: 16px;
`;
const SearchWrapper = styled(View)`
  margin-horizontal: 16px;
`;
const ListWrapper = styled(View)`
  flex: 1;
  min-height: 300px;
  width: 100%;
  padding: 16px;
`;

const ItemWrapper = styled(View)`
  flex-direction: row;
  overflow: hidden;
  padding-horizontal: 8px;
  padding-vertical: 4px;
  align-items: center;
`;

const TextWrapper = styled(TouchableOpacity)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export default MainView;

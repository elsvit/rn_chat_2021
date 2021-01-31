import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ListType} from '~/types/IBaseEntities';

export enum Screen {
  MainStack = 'MainStack',
  Main = 'Main',
  Details = 'Details',
  Chat = 'Chat',
}

export type RootStackParamList = {
  [Screen.Main]: undefined;
  [Screen.Details]: {type: ListType; index: number; name: string};
  [Screen.Chat]: {type: ListType; index: number; name: string};
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

export type ScreenOptionsProps = {
  route: RouteProp<RootStackParamList, keyof RootStackParamList>;
  navigation: any;
};

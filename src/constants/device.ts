import {Dimensions, Platform, NativeModules, StatusBar} from 'react-native';
const {StatusBarManager} = NativeModules;

const instance = {
  statusBarHeight: StatusBar.currentHeight || 0,
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

switch (Platform.OS) {
  case 'ios':
    StatusBarManager.getHeight(({height}: {height: number}) => (instance.statusBarHeight = height));
    break;
  case 'android':
    instance.statusBarHeight = StatusBarManager.getConstants().HEIGHT;
    break;
  default:
}

export const DEVICE = instance;

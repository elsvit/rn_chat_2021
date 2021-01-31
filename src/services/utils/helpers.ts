import {shallowEqual, useSelector} from 'react-redux';
import {Linking} from 'react-native';

import {IAppState} from '~/store';

export const useCommonByAction = (action: string) => {
  const loading = useSelector((state: IAppState) => state.common.loading, shallowEqual)[action];
  const loaded = useSelector((state: IAppState) => state.common.loaded, shallowEqual)[action];
  const apiErrorObj = useSelector((state: IAppState) => state.common.error, shallowEqual)[action];
  let apiErrorMessage = apiErrorObj?.message || '';
  return {loading, loaded, apiErrorMessage};
};

export const onLinkPress = (url: string) => {
  if (url) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
      }
    });
  }
};

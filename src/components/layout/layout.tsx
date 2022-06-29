import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface LayoutInterface {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutInterface> = ({children}) => {
  const insets = useSafeAreaInsets();

  // eslint-disable-next-line react-native/no-inline-styles
  return <View style={{flex: 1, paddingTop: insets.top}}>{children}</View>;
};

export default Layout;

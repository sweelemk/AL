import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface LayoutInterface {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutInterface> = ({children}) => {
  const insets = useSafeAreaInsets();

  return <View style={{paddingTop: insets.top}}>{children}</View>;
};

export default Layout;

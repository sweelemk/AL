import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import {TabRoutes} from '../types/navigation.types';
import {FilesPage, ImagesPage, UploadPage} from '../../screens';

const Tab = createBottomTabNavigator<TabRoutes>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="UploadPage"
        component={UploadPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color}: {color: string}) => {
            return <Feather color={color} name="upload" size={24} />;
          },
        }}
      />
      <Tab.Screen
        name="ImagesPage"
        component={ImagesPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color}: {color: string}) => {
            return <Feather color={color} name="image" size={24} />;
          },
        }}
      />
      <Tab.Screen
        name="FilesPage"
        component={FilesPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color}: {color: string}) => {
            return <Feather color={color} name="file" size={24} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

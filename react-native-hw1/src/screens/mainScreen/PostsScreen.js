import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

import DefaultScreenPosts from '../nestedScreens/DefaultScreenPosts';
import MapScreen from '../nestedScreens/MapScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import { useDispatch } from 'react-redux';
import { authSignOutUser } from '../../redux/auth/authOperations';

const NestedScreen = createNativeStackNavigator();

export default function PostScreen() {
  const dispatch = useDispatch();
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={24}
              color="black"
              onPress={() => dispatch(authSignOutUser())}
            />
          ),
          title: 'Публикации',
        }}
        name="DefaultScreenPosts"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: 'Комментарии',
        }}
      />
      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: 'Геолокация',
        }}
      />
    </NestedScreen.Navigator>
  );
}

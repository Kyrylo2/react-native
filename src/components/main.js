import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '../route';
import { useSelector, useDispatch } from 'react-redux';

import { authStateChangeUser } from '../redux/auth/authOperations';

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);

  const route = useRoute(stateChange);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Main authStateChangeUser +++', stateChange);
    dispatch(authStateChangeUser());
  }, []);

  return (
    <NavigationContainer>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <>
          {route}
          <StatusBar style="auto" />
        </>
      </TouchableWithoutFeedback>
    </NavigationContainer>
  );
};

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  Keyboard,
  Button,
} from 'react-native';

import { useState, useEffect } from 'react';
import { mainContainerStyles } from '../styles/mainContainerStyles';

const initialState = {
  login: '',
  email: '',
  password: '',
};

const btnImg = require('../../../assets/images/add.png');

export default RegistrationScreen = ({ navigation }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [state, setState] = useState(initialState);
  const [isSequre, setIsSequre] = useState(true);

  const [loginInputIsFocused, setLoginInputIsFocused] = useState(false);
  const [emailInputIsFocused, setEmailInputIsFocused] = useState(false);
  const [passwordInputIsFocused, setPasswordInputIsFocused] = useState(false);

  const setShowKeyboard = () => {
    setKeyboardStatus(true);
  };

  useEffect(() => {
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  });

  const handleSubmit = () => {
    setState(initialState);
  };

  const toggleSequrePassword = () => {
    setIsSequre(!isSequre);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={require('../../../assets/images/bg_new.png')}
        style={mainContainerStyles.image}
      >
        <View style={mainContainerStyles.mainWrapper}>
          <View style={styles.form}>
            <View
              style={[
                styles.photoConteiner,
                {
                  transform: [{ translateX: -60 }],
                },
              ]}
            >
              <TouchableOpacity style={styles.addbutton} activeOpacity={0.5}>
                <ImageBackground
                  source={btnImg}
                  style={{ width: '100%', height: '100%' }}
                ></ImageBackground>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>Регистрация</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: loginInputIsFocused ? '#FF6C00' : 'transparent',
                },
                {
                  backgroundColor: loginInputIsFocused
                    ? 'transparent'
                    : '#F6F6F6',
                },
              ]}
              inputMode="text"
              placeholder={'Логин'}
              placeholderTextColor={'#BDBDBD'}
              value={state.login}
              onFocus={() => {
                setShowKeyboard();
                setLoginInputIsFocused(true);
              }}
              onBlur={() => {
                setLoginInputIsFocused(false);
              }}
              onChangeText={(value) => {
                setState((prevState) => ({ ...prevState, login: value }));
              }}
            />
            <TextInput
              style={[
                styles.input,
                { marginTop: 16 },
                {
                  borderColor: emailInputIsFocused ? '#FF6C00' : 'transparent',
                },
                {
                  backgroundColor: emailInputIsFocused
                    ? 'transparent'
                    : '#F6F6F6',
                },
              ]}
              inputMode="email"
              placeholder={'Адрес электронной почты'}
              placeholderTextColor={'#BDBDBD'}
              value={state.email}
              onFocus={() => {
                setShowKeyboard();
                setEmailInputIsFocused(true);
              }}
              onBlur={() => {
                setEmailInputIsFocused(false);
              }}
              onChangeText={(value) => {
                setState((prevState) => ({ ...prevState, email: value }));
              }}
            />
            <View
              style={{
                marginTop: 16,
                height: 50,
                marginBottom: keyboardStatus ? 32 : 0,
              }}
            >
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: passwordInputIsFocused
                      ? '#FF6C00'
                      : 'transparent',
                  },
                  {
                    backgroundColor: passwordInputIsFocused
                      ? 'transparent'
                      : '#F6F6F6',
                  },
                ]}
                placeholder={'Пароль'}
                placeholderTextColor={'#BDBDBD'}
                value={state.password}
                secureTextEntry={isSequre}
                onFocus={() => {
                  setShowKeyboard();
                  setPasswordInputIsFocused(true);
                }}
                onBlur={() => {
                  setPasswordInputIsFocused(false);
                }}
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, password: value }));
                }}
              />
              <TouchableOpacity
                style={styles.showPass}
                onPress={toggleSequrePassword}
              >
                <Text style={[styles.showPass]}>Показать</Text>
              </TouchableOpacity>
            </View>

            {!keyboardStatus && (
              <>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginBottom: 78,
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={styles.toggleButton}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text style={styles.toggleButton}>
                      Already have an account? Login
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  addbutton: {
    marginTop: '65%',
    left: '90%',
    height: 25,
    width: 25,
    pointerEvents: 'auto',
  },
  photoConteiner: {
    marginTop: -60,
    left: '50%',
    height: 120,
    width: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  container: { justifyContent: 'flex-end', flex: 1, alignItems: 'center' },
  input: {
    // justifyContent: "center",
    marginHorizontal: 16,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    height: 50,
    borderRadius: 6,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  form: {
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: '#FFFFFF',
  },
  title: {
    marginHorizontal: 40,
    color: '#212121',
    marginBottom: 33,
    marginTop: 32,
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    // fontWeight: 500,
    justifyContent: 'center',
  },
  button: {
    borderRadius: 100,
    backgroundColor: '#FF6C00',
    marginHorizontal: 16,
    marginTop: 43,
    marginBottom: 20,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  showPass: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    top: 8,
    right: 20,
    position: 'absolute',
  },
  btnTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  toggleButton: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#1B4371',
  },
});

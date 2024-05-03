import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import ChatsScreen from './screens/Chats';
import UsersScreen from './screens/Users';
import RegisterScreen from './screens/Register';
import Login from './screens/Login';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RegisterScreen"
          options={{headerShown: false}}
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="Users"
          options={{headerShown: false}}
          component={UsersScreen}
        />
        <Stack.Screen
          name="Chats"
          options={{headerShown: false}}
          component={ChatsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

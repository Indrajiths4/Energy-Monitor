import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import HomeScreen from './Screens/Home';
<<<<<<< HEAD
import Navbar from './Screens/Navbar';
=======
import Login from './Screens/Login';

const Stack = createStackNavigator();
>>>>>>> d98219d389cd73c57d440c069e13574fac5e26b7

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

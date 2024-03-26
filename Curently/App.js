import React from 'react';
import { SafeAreaView } from 'react-native';
import HomeScreen from './Screens/Home';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
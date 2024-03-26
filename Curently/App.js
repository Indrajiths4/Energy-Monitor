

import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { ref, onValue } from 'firebase/database';
import database from './firebaseConfig';

const UserData = () => {
  const [currentValue, setCurrentValue] = useState('');
  const [powerValue, setPowerValue] = useState('');

  useEffect(() => {
    const userDataRef = ref(database, '/UsersData/OUP0gXmVjCcD4p3NJNaudwQs7Er1');

    const unsubscribe = onValue(userDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentValue(data.current);
        setPowerValue(data.power);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={{ "flex": 1, "justifyContent": 'center', "alignItems": "center" }}>
      <Text>Current Value: {currentValue}</Text>
      <Text>Power Value: {powerValue}</Text>
    </SafeAreaView>
  );
};

export default UserData;
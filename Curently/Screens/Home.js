import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ref, onValue } from 'firebase/database';
import database from '../firebaseConfig';
// import Speedometer from 'react-native-speedometer-chart';

const HomeScreen = () => {
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
        <View style={styles.container}>
            <View style={styles.valueContainer}>
                <Text style={styles.label}>Current Value:</Text>
                <Text style={styles.value}>{currentValue}</Text>
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.label}>Power Value:</Text>
                <Text style={styles.value}>{powerValue}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    value: {
        fontSize: 16,
    },
});

export default HomeScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ref, onValue } from 'firebase/database';
import database from '../firebaseConfig';
import Navbar from './Navbar';

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
            <Navbar />

            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/home.png')} // Provide the path to your image
                    style={styles.image}
                    resizeMode="contain" // Adjust the resizeMode as needed
                />
            </View>

            <Text style={styles.text}>Energy Consumption Today</Text>
            <Text style={styles.currenttext}>{currentValue} kWh</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '400',
    },
    currenttext: {
        margin: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    imageContainer: {
        height: 200,
    },

    image: {
        flex: 1,
        width: '100%',
        height: 'auto',
    },
});

export default HomeScreen;

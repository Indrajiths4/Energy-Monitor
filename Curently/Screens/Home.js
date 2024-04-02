import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ref, onValue } from 'firebase/database';
import database from '../firebaseConfig';
import Navbar from './Navbar';
import { LineChart } from 'react-native-svg-charts';

const HomeScreen = () => {
    const [currentValue, setCurrentValue] = useState('');
    const [powerValue, setPowerValue] = useState('');
    const [newdata, setNewData] = useState([]);
    useEffect(() => {
        const userDataRef = ref(database, '/UsersData/OUP0gXmVjCcD4p3NJNaudwQs7Er1');

        const unsubscribe = onValue(userDataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setCurrentValue(data.current);
                setPowerValue(data.power);
                let newDataValue = data.current <= 0.28 ? 0 : data.current;
                setNewData(prevData => [...prevData, newDataValue]);
                console.log(newDataValue)
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

            <Text style={styles.text}>Current Consumption:</Text>
            <Text style={styles.currenttext}>{currentValue} A</Text>
            <View style={{}}>
                <LineChart
                    style={{ width: 300, height: 200 }}
                    data={newdata}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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

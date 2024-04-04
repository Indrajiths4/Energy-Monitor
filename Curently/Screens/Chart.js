import { ref, onValue } from 'firebase/database';
import { database }from '../firebaseConfig';
import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Chart = () => {
    const [newdata, setNewData] = useState([]);


    useEffect(() => {
        const userDataRef = ref(database, '/UsersData/OUP0gXmVjCcD4p3NJNaudwQs7Er1');
        const unsubscribe = onValue(userDataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                let newDataValue = data.current <= 0.28 ? 0 : data.current;
                setNewData((prevData) => {
                    const newData = [...prevData, newDataValue];
                    const maxDataPoints = 6;
                    if (newData.length > maxDataPoints) {
                        return newData.slice(newData.length - maxDataPoints);
                    }
                    return newData;
                });

           
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.chartCard}>
                <LineChart
                    data={{
                        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
                        datasets: [
                            {
                                data: newdata,
                            },
                        ],
                    }}
                    width={320}
                    height={220}
                    scrollAnimation={true}
                    yAxisSuffix="A"
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: "#FFF",
                        backgroundGradientFrom: "#FFF",
                        backgroundGradientTo: "#FFF",
                        decimalPlaces: 2,
                        color: (opacity = 0) => `rgba(255,0,0, ${opacity})`,
                        labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: "2",
                            stroke: "red",
                        },
                    }}
                    bezier
                    style={{ marginVertical: 20, borderRadius: 16 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 40,
    },
    chartCard: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: Dimensions.get('window').width - 40,
        backgroundColor: '#FFF',
        borderRadius: 16,
        shadowColor: 'rgba(255, 0, 0, 0.3)',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 6,
    },
});

export default Chart;

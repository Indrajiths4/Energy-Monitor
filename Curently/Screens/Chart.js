import { ref, onValue } from 'firebase/database';
import { database }from '../firebaseConfig';
import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Chart = () => {

    const [powerValue, setPowerValue] = useState('');
    const [newdata, setNewData] = useState([2, 3, 2, 3]);

    useEffect(() => {
        const userDataRef = ref(database, '/UsersData/OUP0gXmVjCcD4p3NJNaudwQs7Er1');

        const unsubscribe = onValue(userDataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {

                let newDataValue = data.current <= 0.28 ? 0 : data.current;
                setNewData(prevData => {
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
        <View style={{
            marginHorizontal: 20,
            marginTop: 40
        }}>
            <LineChart
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr"],
                    datasets: [
                        {
                            data:
                                newdata

                        },
                    ],
                }}
                width={Dimensions.get('window').width}
                height={220}
                yAxisSuffix='k'
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#FFF",
                    backgroundGradientFrom: "#FFF",
                    backgroundGradientTo: "#FFF",
                    decimalPlaces: 2,
                    color: (opacity = 0) => `rgba(255,0,0, ${opacity})`,
                    labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: "2",
                        stroke: "red"
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    );
};

export default Chart;

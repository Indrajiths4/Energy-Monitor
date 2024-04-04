import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo Icons


const Navbar = ({ onBackPress, onMenuPress }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Back Button */}


                {/* App Title */}
                <View style={styles.titleContainer}>

                    <Text style={styles.title}>Curently</Text>
                </View>

                {/* Hamburger Icon */}
                <TouchableOpacity onPress={onMenuPress} style={styles.button}>
                    <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        marginTop: 30,
        backgroundColor: 'white',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    titleContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,

    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
        color: 'black'
    },
    button: {
        padding: 8,
    },
});

export default Navbar;

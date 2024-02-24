import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const EditStudentForm = ({ route, navigation }) => {


    return (
        <View style={styles.container}>

            {/* Form elements to edit student's information */}
            <Text style={styles.label}>First Name:</Text>

            <Text style={styles.label}>Last Name:</Text>

            <Text style={styles.label}>Date of Birth:</Text>
            

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default EditStudentForm;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';

const AddStudentForm = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');

    const handleAddStudent = async () => {
        try {
            const studentsRef = collection(db, 'students');
            await addDoc(studentsRef, { firstName, lastName, dob });
            console.log('Student added successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>First Name:</Text>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={text => setFirstName(text)}
            />
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={text => setLastName(text)}
            />
            <Text style={styles.label}>Date of Birth:</Text>
            <TextInput
                style={styles.input}
                value={dob}
                onChangeText={text => setDob(text)}
            />
            <Button title="Add Student" onPress={handleAddStudent} />
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

export default AddStudentForm;

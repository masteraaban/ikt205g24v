import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const EditStudentForm = ({ navigation, route }) => {
    const { studentId } = route.params;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const studentDoc = await getDoc(doc(db, 'students', studentId));
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    setFirstName(studentData.firstName);
                    setLastName(studentData.lastName);
                    setDob(studentData.dob);
                } else {
                    console.error('Student not found!');
                }
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        fetchStudentDetails();
    }, [studentId]);

    const handleEditStudent = async () => {
        try {
            const studentRef = doc(db, 'students', studentId);
            await updateDoc(studentRef, { firstName, lastName, dob });
            console.log('Student edited successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error editing student:', error);
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
            <Button title="Save Changes" onPress={handleEditStudent} />
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

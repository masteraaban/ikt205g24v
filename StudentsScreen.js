import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getDocs, collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const StudentsScreen = ({ navigation }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'students'));
                const studentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setStudents(studentList);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        const unsubscribe = onSnapshot(collection(db, 'students'), fetchData);

        return () => {
            unsubscribe();
        };
    }, []);

    const handleDeleteStudent = async (studentId) => {
        try {
            await deleteDoc(doc(db, 'students', studentId));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleAddStudent = () => {
        navigation.navigate('AddStudentForm');
    };

    return (
        <View style={styles.container}>
            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>First Name</Text>
                <Text style={styles.headerText}>Last Name</Text>
                <Text style={styles.headerText}>Date of Birth</Text>
            </View>
            {/* Display student data */}
            {students.map((student, index) => (
                <View key={index} style={styles.studentRow}>
                    <Text style={styles.studentData}>{student.firstName}</Text>
                    <Text style={styles.studentData}>{student.lastName}</Text>
                    <Text style={styles.studentData}>{student.dob}</Text>
                    <Button title="Delete" onPress={() => handleDeleteStudent(student.id)} />
                </View>
            ))}
            {/* Navigation buttons */}
            <View style={styles.buttonContainer}>
                <Button title="Add Student" onPress={handleAddStudent} />
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 10,
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
    },
    studentRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    studentData: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default StudentsScreen;

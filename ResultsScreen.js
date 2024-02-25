import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, query, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const ResultsScreen = ({ navigation }) => {
    const [studentResults, setStudentResults] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'students'), async (snapshot) => {
            const resultsData = [];

            for (const studentDoc of snapshot.docs) {
                const studentData = studentDoc.data();
                const studentId = studentDoc.id;

                const resultsQuery = query(collection(studentDoc.ref, 'results'));
                const resultsSnapshot = await getDocs(resultsQuery);

                resultsSnapshot.forEach((resultDoc) => {
                    const resultData = resultDoc.data();
                    const result = {
                        id: resultDoc.id,
                        studentId: studentId,
                        firstName: studentData.firstName,
                        lastName: studentData.lastName,
                        dob: studentData.dob,
                        ...resultData,
                    };
                    resultsData.push(result);
                });
            }

            // Sort the results by classID
            resultsData.sort((a, b) => (a.classID > b.classID) ? 1 : -1);
            setStudentResults(resultsData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.tableHeader}>
                <Text style={[styles.headerText, styles.firstNameColumn]}>First Name</Text>
                <Text style={[styles.headerText, styles.lastNameColumn]}>Last Name</Text>
                <Text style={[styles.headerText, styles.dobColumn]}>Date of Birth</Text>
                <Text style={[styles.headerText, styles.classNameColumn]}>Class Name</Text>
                <Text style={[styles.headerText, styles.scoreColumn]}>Score</Text>
                <Text style={[styles.headerText, styles.gradeColumn]}>Grade</Text>
            </View>
            {/* Display results */}
            {studentResults.map((result, index) => (
                <View key={index} style={styles.studentRow}>
                    <Text style={[styles.studentData, styles.firstNameColumn]}>{result.firstName}</Text>
                    <Text style={[styles.studentData, styles.lastNameColumn]}>{result.lastName}</Text>
                    <Text style={[styles.studentData, styles.dobColumn]}>{result.dob}</Text>
                    <Text style={[styles.studentData, styles.classNameColumn]}>{result.className}</Text>
                    <Text style={[styles.studentData, styles.scoreColumn]}>{result.Score}</Text>
                    <Text style={[styles.studentData, styles.gradeColumn]}>{result.Grade}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
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
        fontWeight: 'bold',
    },
    studentRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    firstNameColumn: {
        flex: 2.5,
        textAlign: "left",
    },
    lastNameColumn: {
        flex: 2,
        textAlign: "left",
    },
    dobColumn: {
        flex: 2.5,
    },
    classIDColumn: {
        flex: 3,
    },
    classNameColumn: {
        flex: 2,
    },
    scoreColumn: {
        flex: 1.5,
    },
    gradeColumn: {
        flex: 1.5,
    },
    studentData: {
        textAlign: 'center',
    },
});

export default ResultsScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export default function StudentsScreen({ navigation }) {
    const [studentInfo, setStudentInfo] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const studentId = 'FciOxHLf9WKxtUwUa5aH';
                const docRef = doc(db, 'students', studentId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setStudentInfo({
                        dob: data.DOB,
                        fName: data.fName,
                        lName: data.lName,
                    });
                } else {
                    console.log('No such document for student with ID:', studentId);
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchStudentData();
    }, []);


    const stringifyValue = (value) => {
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value);
        }
        return value;
    };

    // Function to convert object to array of key-value pairs
    const objectToArray = (obj) => {
        return Object.entries(obj).map(([key, value]) => ({ key, value }));
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}>Student Information</Text>
            {studentInfo ? (
                objectToArray(studentInfo).map(({ key, value }) => (
                    <Text key={key}>{key}: {stringifyValue(value)}</Text>
                ))
            ) : (
                <Text>Loading...</Text>
            )}
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

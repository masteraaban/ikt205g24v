import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Pressable} from "react-native"
import {collection, query, onSnapshot, getDocs, doc} from 'firebase/firestore';
import { db } from './firebaseConfig';

function ClassScreen({ navigation }) {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        const getClasses = async () => {
            const snapshot = await getDocs(collection(db, "classes"));
            const classesList = snapshot.docs.map(doc => ({id: doc.id, ... doc.data()}));
            setClasses(classesList);
        };

        const unsubscribe = onSnapshot(collection(db, 'classes'), getClasses);

         return () => {
                    unsubscribe();
                };
    }, []);

    const onClassClick = async (classId) => {
        navigation.navigate("GradeD", {classId});
    }

    return(
        <View style = {styles.container}>
            <View style= {styles.tableHeader}>
                <Text style={styles.headerText}>ClassID</Text>
                <Text style={styles.headerText}>Class Name</Text>
            </View>
            {classes.map((classItem, index) => (
                <Pressable
                    key={index}
                    style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                    onPress={() => onClassClick(classItem.classID)}
                >
                    <View style={styles.classRow}>
                        <Text style={styles.classData}>{classItem.classID}</Text>
                        <Text style={styles.classData}>{classItem.className}</Text>
                    </View>
                </Pressable>
            ))}
        </View>

    );

}

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
    classRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 40,
    },
    classData: {
        flex: 1,
    },
});

export default ClassScreen;

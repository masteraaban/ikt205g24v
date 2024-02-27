import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Pressable, Button, Dimensions} from "react-native"
import {collection, query, onSnapshot, getDocs, getDoc, where, collectionGroup} from 'firebase/firestore';
import { db } from './firebaseConfig';
import {BarChart} from "react-native-chart-kit";



function GradeD({ navigation, route }) {
    const { classId } = route.params;

    const [results, setResults] = useState([]);
    useEffect(() => {
        const getResults = async () => {
            const studentRef = collection(db, "students");
            const snapshot = await getDocs(studentRef);

            const resultList = [];

            for (const studentDoc of snapshot.docs) {
                const resultSnapshot = await getDocs(query(collection(studentDoc.ref, "results"), where("classID", "==", classId)));
                resultSnapshot.forEach(resultDoc => {
                    resultList.push({ id: resultDoc.id, ...resultDoc.data() });
                });
            }

            setResults(resultList);
        };
        getResults();
        return () => {};

    }, [classId]);

    let grades = results.map(result => result.Grade);
    function counter(grades) {
        let counts = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0};
        for (let i = 0; i < grades.length; i++) {
            let grade = grades[i];
            if (counts.hasOwnProperty(grade)) {
                counts[grade]++;
            }
        }

        return Object.values(counts);
    }

    grades = counter(grades);
    const max = Math.max(...grades);

    return (

        <View>
            <Text>Grades of {classId}</Text>

            <BarChart
                data={{
                    labels: ["A", "B", "C", "D", "E", "F"],
                    datasets: [
                        {
                            data: grades
                        }
                    ]
                }}

                width={Dimensions.get("window").width}
                height={500}
                yAxisLabel=""

                segments={max}
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "rgba(255, 255, 255, 255)",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",

                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: () => `#006400`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

                    style: {
                        borderRadius: 16
                    },
                }}
            />
            <Text>The bar chart may take a few seconds to load</Text>

        </View>
    )
}

export default GradeD;

import * as React from 'react';
import {View, Text} from "react-native"

export default function ClassScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate("Class")}
                style={{ fontSize: 26, fontWeight: 'bold' }}>ClassScreen</Text>
        </View>
    );
}
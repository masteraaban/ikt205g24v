import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';
import StudentsScreen from '../StudentsScreen';

//Screen names
const homeName = "Home";
const resultsName = "Results";
const studentName = "Students";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === resultsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === studentName) {
              iconName = focused ? 'settings' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'light-blue',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={resultsName} component={ResultsScreen} />
        <Tab.Screen name={studentName} component={StudentsScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
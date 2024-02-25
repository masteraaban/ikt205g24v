import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';



// Screens
import ResultsScreen from '../ResultsScreen';
import StudentsScreen from '../StudentsScreen';
import AddStudentForm from '../AddStudentForm';
import EditStudentForm from '../EditStudentForm';
import ClassScreen from "./screens/ClassScreen";

// Screen names
const className = "Classes";
const resultsName = "Results";
const studentName = "Students";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainContainer() {
  return (
      <NavigationContainer>
        <Tab.Navigator
            initialRouteName={className}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === className) {
                  iconName = focused ? 'class' : 'class';

                } else if (rn === resultsName) {
                  iconName = focused ? 'list' : 'list';

                } else if (rn === studentName) {
                  iconName = focused ? 'person' : 'person-outline';

                }

                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'light-blue',
              inactiveTintColor: 'grey',
              labelStyle: { paddingBottom: 10, fontSize: 10 },
              style: { padding: 10, height: 70 }
            }}>

          <Tab.Screen name={className} component={ClassScreen} />

            <Tab.Screen name={resultsName} component={ResultsScreen} />
            <Tab.Screen name={studentName}>
            {() => (
                <Stack.Navigator initialRouteName="StudentsScreen">
                  <Stack.Screen name="StudentsScreen" component={StudentsScreen} options = {{title: 'Students'}}/>
                  <Stack.Screen name="AddStudentForm" component={AddStudentForm} options={{ title: 'Add Student'}}/>
                    <Stack.Screen name="EditStudentForm" component={EditStudentForm} options={{ title: 'Edit Student'}}/>
                </Stack.Navigator>
            )}
          </Tab.Screen>

        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default MainContainer;

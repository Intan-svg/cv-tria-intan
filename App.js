import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import AcademicScreen from './screens/AcademicScreen';
import ContactScreen from './screens/ContactScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
            else if (route.name === 'Portfolio') iconName = focused ? 'layers' : 'layers-outline';
            else if (route.name === 'My Score') iconName = focused ? 'school' : 'school-outline';
            else if (route.name === 'Contact') iconName = focused ? 'mail' : 'mail-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2563EB', 
          tabBarInactiveTintColor: '#94A3B8',
          tabBarStyle: { paddingBottom: 5, height: 60, backgroundColor: '#FFFFFF' },
          headerStyle: { backgroundColor: '#2563EB' },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' }
        })}
      >
        <Tab.Screen name="Profile" component={HomeScreen} options={{ title: 'Tria Intan - CV' }} />
        <Tab.Screen name="Portfolio" component={PortfolioScreen} options={{ title: 'Portofolio Tria' }} />
        <Tab.Screen name="My Score" component={AcademicScreen} options={{ title: 'Academic Score' }} />
        <Tab.Screen name="Contact" component={ContactScreen} options={{ title: 'Hubungi Saya' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
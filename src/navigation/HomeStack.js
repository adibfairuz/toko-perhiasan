import React from 'react'
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductDetail from '../screens/ProductDetail';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    headerShown: false,
                    headerTransparent: true,
                    headerTitleAlign: "center",
                    headerStyle:{
                        backgroundColor: "#20655f",
                    },
                    headerTitleStyle:{
                        color: "#fff"
                    }
                }} />
            <Stack.Screen 
                name="ProductDetail" 
                component={ProductDetail}
                options={{
                    headerTitle: "Detail",
                    headerTitleAlign: "center",
                    headerStyle:{
                        backgroundColor: "#20655f",
                    },
                    headerTitleStyle:{
                        color: "#fff"
                    }
                }} />
        </Stack.Navigator>
    )
}

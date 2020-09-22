import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native';
import ProductDetail from '../screens/ProductDetail';
import ProductsScreen from '../screens/ProductsScreen';

const Stack = createStackNavigator();

export default function ProductsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProductsStack"
                component={ProductsScreen}
                options={{
                    headerTitle: "Products",
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

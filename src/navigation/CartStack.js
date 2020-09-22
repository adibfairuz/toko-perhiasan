import React from 'react'
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/CartScreen';
import ProductDetail from '../screens/ProductDetail';

const Stack = createStackNavigator();

export default function CartStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen 
                name="Cart" 
                component={CartScreen}
                options={{
                    headerTitle: "Cart",
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

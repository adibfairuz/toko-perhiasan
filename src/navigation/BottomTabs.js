import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import WishlistScreen from '../screens/WishlistScreen';
import CartScreen from '../screens/CartScreen';
import * as React from 'react';
import HomeStack from './HomeStack';
import ProductsScreen from '../screens/ProductsScreen';
import ProductsStack from './ProductsStack';
import CartStack from './CartStack';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" barStyle={{backgroundColor: "#20655f"}} activeColor="#fff">
      <Tab.Screen
        name="Home" 
        component={HomeStack} 
        options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
        }}/>
        <Tab.Screen 
        name="Products" 
        component={ProductsStack} 
        options={{
            tabBarLabel: "Products",
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="diamond-stone" color={color} size={26} />
              ),
        }}/>
      {/* <Tab.Screen 
        name="Wishlist" 
        component={WishlistScreen} 
        options={{
            tabBarLabel: "Wishlist",
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="heart" color={color} size={26} />
              ),
        }}/> */}
      <Tab.Screen 
        name="Cart" 
        component={CartStack} 
        options={{
            tabBarLabel: "Cart",
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cart-outline" color={color} size={26} />
              ),
        }}/>
    </Tab.Navigator>
  );
}
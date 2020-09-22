import AsyncStorage from '@react-native-community/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import ProductList from '../components/ProductList'

export default function CartScreen(props) {
    const [data, setData] = useState([])
    const isFocused = useIsFocused()
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getCart()
    }, [])

    useEffect(() => {
        getCart()
    }, [isFocused])

    const onRefresh = () => {
        setRefreshing(true);
        getCart();
        setRefreshing(false)
    }
    
    const getCart = () => {
        AsyncStorage.getItem('cart').then(item => {
            let temp = item ? JSON.parse(item) : [];
            setData(temp);
        })
    }

    const handleChanged = () => {
        getCart()
    }

    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View>
                    {
                        data.length
                        ?
                        data.map(item => {
                            return <ProductList key={item.id} changed={handleChanged} data={item} {...props} />
                        })
                        :
                        <Text>Kosong</Text>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

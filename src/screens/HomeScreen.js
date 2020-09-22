import Axios from 'axios';
import React, {useState, useEffect} from 'react'
import {SafeAreaView, ScrollView} from 'react-native'
import { View, Text, Button, StyleSheet, ImageBackground, Image, RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import jewelryStore from '../assets/icons/jewelry.png'
import Products from '../components/Products';
import API_config from '../config/API_config';

export default function HomeScreen(props) {
    const [goldPrice, setGoldPrice] = useState(0);
    const [newProduct, setNewProduct] = useState(null);
    const [refreshing, setRefreshing] = useState(false)
    
    useEffect(() => {
        getGoldPrice();
        getNewProduct();
    }, [])

    const onRefresh = () => {
        setRefreshing(true);
        getGoldPrice();
        getNewProduct();
    }

    const getGoldPrice = async () => {
        try {
            let res = await Axios.get(`${API_config.api}/getmarkprice`);
            if (res.data.status) {
                setRefreshing(false)
                setGoldPrice(res.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getNewProduct = async () => {
        try {
            let res = await Axios.get(`${API_config.api}/getproduct`);
            if (res.data.status) {
                setRefreshing(false)
                let value = res.data.data;
                value.sort((a,b) => {
                    return b.id - a.id;
                })
                value = value.splice(0, 4);
                setNewProduct(value);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View>
                    <View style={styles.jumboTron}>
                        <Image source={jewelryStore} style={styles.jewelryStore}>
                        </Image>
                        <Text style={styles.welcomeText}>Selamat Datang di Toko Perhiasan</Text>
                        <View style={styles.statusPriceBox}>
                            <MaterialCommunityIcons style={styles.statusTitleText} name="gold" color="#fff" size={32} />
                            <Text style={styles.statusTitleText}>Harga Emas Saat Ini</Text>
                            <Text style={styles.statusPriceText}>Rp{goldPrice}</Text>
                        </View>                
                    </View>
                    <View style={styles.parentProducts}>
                        <Text style={styles.headingProducts}>New Products</Text>
                        <View style={styles.products}>
                            {
                                newProduct
                                ?
                                newProduct.length 
                                ? 
                                newProduct.map(item => {
                                    return <Products key={item.id} data={item} {...props} />
                                })
                                :
                                <Text>Product Tidak Ada</Text>
                                :
                                <ActivityIndicator />
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    jumboTron: {
        paddingTop: 100,
        paddingHorizontal: 20,
        height: 250,
        backgroundColor: "#20655f",
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
    },
    welcomeText: {
        textAlign: "center",
        fontSize: 18,
        color: "#fff",
    },
    statusPriceBox: {
        // flex: 1,
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 39,
        paddingVertical: 14,
        paddingHorizontal: 40,
        height: 129,
        backgroundColor: "#f8aa27",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#fff8b6",
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.43,
        shadowRadius: 5.51,
        elevation: 15,
    },
    statusTitleText: {
        color: "#fff",
        textAlign: "center",
        marginVertical: 3,
    },
    statusPriceText: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center"
    },
    jewelryStore:{
        flex: 1,
        resizeMode: "cover",
        transform: [{scale: 0.45}],
        position: "absolute",
        top: -135,
        right: -210,
        opacity: 0.2,
    },
    parentProducts: {
        marginTop: 80,
        paddingHorizontal: 20,
    },
    headingProducts: {
        fontSize: 18,
        marginBottom: 14,
    },
    products: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    }
})
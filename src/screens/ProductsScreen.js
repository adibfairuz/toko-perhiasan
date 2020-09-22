import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import { Searchbar, ActivityIndicator } from 'react-native-paper'
import Products from '../components/Products';
import Axios from 'axios'
import API_config from '../config/API_config';

export default function ProductsScreen(props) {
    const [product, setProduct] = useState([]);
    const [searchResult, setSearchResult] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [refreshing, setRefreshing] = useState(false)
    
    useEffect(() => {
        getProduct();
    }, [])

    useEffect(() => {
        searchProduct(searchInput)
    }, [searchInput])

    const onRefresh = () => {
        setRefreshing(true);
        getProduct();
        setSearchInput('');
    }
    
    const getProduct = async () => {
        try {
            let res = await Axios.get(`${API_config.api}/getproduct`);
            if (res.data.status) {
                setRefreshing(false)
                let value = res.data.data;
                setProduct(value);
                setSearchResult(value);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const searchProduct = (value) => {
        if (value.length > 1) {
            let temp = product.filter(e => {
                return e.name.toLowerCase().includes(value.toLowerCase()) || e.rfid.toString().includes(value);
            })
            setSearchResult(temp)
        }else{
            setSearchResult(product)
        }
    }
    return (
        <SafeAreaView>
            <Searchbar placeholder="Search" value={searchInput} onChangeText={(e) => setSearchInput(e)} />
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View>
                    <View style={styles.parentProducts}>
                        <Text style={styles.headingProducts}>Total Item: {searchResult && searchResult.length}</Text>
                        <View style={styles.products}>
                        {
                            searchResult && product.length
                            ?
                            searchResult.length 
                            ? 
                            searchResult.map(item => {
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
    parentProducts: {
        marginTop: 30,
        marginBottom: 60,
        paddingHorizontal: 20,
    },
    products: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    headingProducts: {
        fontSize: 18,
        marginBottom: 14,
    },
})

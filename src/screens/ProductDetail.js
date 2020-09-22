import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TextInput, Modal, TouchableOpacity } from 'react-native'
import { Avatar, Button, Card, Title, IconButton } from 'react-native-paper';
import Axios from 'axios';
import API_config from '../config/API_config';
import defaultPhoto from '../assets/img/default.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import ImageViewer from 'react-native-image-zoom-viewer';

let ScreenHeight = Dimensions.get("window").height;

export default function ProductDetail(props){
    const [data, setData] = useState({});
    const [zoomImage, setZoomImage] = useState(false)
    const [readMore, setReadMore] = useState(false)

    useEffect(() => {
        getProductDetail();
    }, [])

    const getProductDetail = async () => {
        try {
            let id = props.route.params.id;
            let res = await Axios.get(`${API_config.api}/getproduct/${id}`);
            if (res.data.status) {
                let value = res.data.data;
                setData(value);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const storeData = async (key, value) => {
        AsyncStorage.getItem(key).then(item => {
            let temp = item ? JSON.parse(item) : [];
            
            if (temp.find(e => e.id === value.id)){
                temp.forEach((e, i) => {
                    if (e.id === value.id) {
                        temp[i] = value;
                    }
                })
            }else{
                temp.push(value);
            }
            const setObjectValue = JSON.stringify(temp);
            AsyncStorage.setItem(key, setObjectValue);
        })
        alert('Sukses')
    }

    const handleAddToCart = () => {
        storeData('cart', data)
    }

    const handleZoomImage = () => {
        setZoomImage(!zoomImage)
    }
    return(
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">

                <View style={styles.container}>
                    <Modal visible={zoomImage} transparent={true}>
                        <ImageViewer enableSwipeDown={true} onSwipeDown={handleZoomImage} imageUrls={[{url: `${API_config.img}/${data.gambar}`}]} />
                    </Modal>
                    <Card>
                        {
                            data.gambar 
                            ?
                            <TouchableOpacity onPress={handleZoomImage}>
                                <Card.Cover height={20} source={{ uri: `${API_config.img}/${data.gambar}` }} />
                            </TouchableOpacity>
                            :
                            <Card.Cover height={20} source={defaultPhoto} />
                        }
                        <Card.Content>
                            <Title>{data.name && data.name}</Title>
                            <View style={styles.field}>
                                <Text style={styles.label}>Kode:</Text>
                                <Text>{data.kode && data.kode}</Text>
                            </View>
                            <View style={styles.field}>
                                <Text style={styles.label}>Deskripsi:</Text>
                                {
                                    !readMore
                                    ?
                                    <View>
                                        <Text style={{textAlign: "justify"}}>{`${data.detail && data.detail.substring(0, 160)}${data.detail && data.detail.length > 160 ? '...' : ''}`}</Text>
                                        {
                                            data.detail && data.detail.length > 160 &&
                                            <TouchableOpacity onPress={() => setReadMore(!readMore)}>
                                                <Text style={{color: "blue"}}>read more</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                    :
                                    <View>
                                        <Text style={{textAlign: "justify"}}>{data.detail && data.detail}</Text>
                                        <TouchableOpacity onPress={() => setReadMore(!readMore)}>
                                            <Text style={{color: "blue"}}>read less</Text>
                                        </TouchableOpacity>
                                    </View>

                                }
                            </View>
                            <View style={styles.field}>
                                <Text style={styles.label}>RF-id:</Text>
                                <Text>{data.rfid && data.rfid}</Text>
                            </View>
                            <View style={styles.field}>
                                <Text style={styles.label}>Weight:</Text>
                                <Text>{data.weight && data.weight}</Text>
                            </View>
                            <View style={styles.field}>
                                <Text style={styles.label}>Harga:</Text>
                                <Text>Rp{data.harga && data.harga}</Text>
                            </View>
                        </Card.Content>
                        <Card.Actions>
                            <Button style={{marginVertical: 12}} icon="cart-plus" mode="contained" color="#f8aa27" onPress={handleAddToCart}>
                                Add to Cart
                            </Button>
                        </Card.Actions>
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: ScreenHeight,
        backgroundColor: "#fff",
        paddingHorizontal: 9,
        paddingVertical: 9,
    },
    label: {
        fontWeight: "bold",
    },
    field: {
        marginVertical: 4
    },
    containerAddToCart: {
        flexDirection: "row"
    },
    counterInput: {
        textAlign: "center",
        alignSelf: "center",
        color: "#000",
        paddingHorizontal: 0,
        marginHorizontal: 0,
    }
})
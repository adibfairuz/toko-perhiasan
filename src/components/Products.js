import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import API_config from '../config/API_config';

export default function Products(props){
    const [data, setData] = useState(props.data);
    const handleClick = () => {
        props.navigation.navigate('ProductDetail', {id: data.id})
    }
    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const addToCart = () => {
        storeData('cart', data)
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

    return(
        <View style={styles.container} key={data.id}>
            <Card onPress={handleClick}>
                {data.gambar &&
                    <Card.Cover height={20} source={{ uri: `${API_config.img}/${data.gambar}` }} />
                }
                <Card.Content style={{minHeight: 120}}>
                    <Text style={styles.textNameProduct}>{data.name && data.name}</Text>
                    <Text>Rp{data.harga && data.harga}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button icon="cart-plus" mode="contained" color="#f8aa27" onPress={addToCart}>Add to Cart</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "50%",
        paddingHorizontal: 7,
        marginVertical: 9,
    },
    textNameProduct: {
        fontSize: 18,
        marginVertical: 8
    }
})
    

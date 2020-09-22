import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { List, Avatar, Button, IconButton } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import API_config from '../config/API_config';
import AsyncStorage from '@react-native-community/async-storage';

const ProductList = (props) => {
  const [data, setData] = useState(props.data)

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const handleClick = () => {
    props.navigation.navigate('ProductDetail', {id: data.id})
  }

  const removeData = (key, value) => {
    AsyncStorage.getItem(key).then(item => {
      let temp = item ? JSON.parse(item) : [];
      
      if (temp.find(e => e.id === value.id)){
          temp.forEach((e, i) => {
              if (e.id === value.id) {
                  temp.splice(i, 1);
              }
          })
      }else{
        temp.push(value);
      }
      const setObjectValue = JSON.stringify(temp);
      AsyncStorage.setItem(key, setObjectValue);
      props.changed();
    })
  }

  const handleRemove = () => {
    removeData('cart', data)
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
        props.changed();
    })
  }

  return(
    <Swipeable key={data.id} renderRightActions={() => {
      return(
        <TouchableOpacity onPress={handleRemove} style={{flex: 1, justifyContent: "center", backgroundColor: "red"}}>
          <Button icon="delete" color="#fff">
            remove
          </Button>
        </TouchableOpacity>
      )
    }}>
      <List.Item
        onPress={handleClick}
        style={styles.list}
        title={data.name ? data.name : '...'}
        description={data.harga ? 'Rp'+data.harga : '...'}
        left={props => <List.Section {...props}><Avatar.Image source={{uri: `${API_config.img}/${data.gambar}`}} /></List.Section>}
      />
    </Swipeable>
)};

const styles = StyleSheet.create({
    list: {
        backgroundColor: "#fff",
        borderBottomWidth: 0.4,
        borderBottomColor: "#000"
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

export default ProductList;
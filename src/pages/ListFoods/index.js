import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import DatePicker from 'react-native-date-picker'
import { format } from "date-fns";

import styles from './styles'

export default function ListFoods() {
    const [quantity, setQuantity] = useState('');
    const [selectedType, setSelectedType] = useState('')
    const [open, setOpen] = useState(false)
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState(new Date())
    const [foods, setFoods] = useState([])
    const { navigate } = useNavigation()
    const [toEditItem, setToEditItem] = useState({})

    const loadFoods = async () => {
        const listJson = await AsyncStorage.getItem('foods');
        const list = listJson ? JSON.parse(listJson) : [];
        if (list?.length > 0) {
            setFoods(list.reverse());
        } else {
            setFoods([]);
        }
    };

    const editFood = async (item) => {
        const foodsCopy = [...foods];
        const toEditItem = foodsCopy?.findIndex((food) => {
            return food === item
        });

        console.log(toEditItem)
        if (toEditItem !== -1) {
            foodsCopy.splice(toEditItem, 1, {
                ...item,
                quantity,
            });
            if (quantity !== '') {
                const list = JSON.stringify(foodsCopy);
                await AsyncStorage.setItem('foods', list);
            }
            await loadFoods()
            setOpen(false)
        }
    }

    const deleteFood = async (item) => {
        const foodsCopy = [...foods];
        const toRemoveIndex = foodsCopy.indexOf(item);
        if (toRemoveIndex > -1) {
            foodsCopy.splice(toRemoveIndex, 1);
            const list = JSON.stringify(foodsCopy);
            await AsyncStorage.setItem('foods', list);
            await loadFoods()
        }
    }

    useEffect(() => {
        loadFoods()
    }, [])

    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ color: 'white' }}>Type: {item.selectedType}</Text>
                    <Text style={{ color: 'white' }}>Validate: {item.date}</Text>
                    <Text style={{ color: 'white' }}>Quantity: {item.quantity}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => {
                        setOpen(true);
                        setToEditItem(item)
                        setQuantity(item.quantity)
                    }}><Text style={{ color: 'white' }}>Edit</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { deleteFood(item) }}><Text style={{ color: 'white' }}>Delete</Text></TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Modal isVisible={open}>
                <View>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Quantity"
                    placeholderTextColor="#555"
                    onChangeText={setQuantity}
                    value={quantity}
                />
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={.7}
                    onPress={() => editFood(toEditItem)}
                >
                    <Text sytle={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setOpen(false) }} style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}><Text style={{ color: 'white' }}>Sair</Text></TouchableOpacity>
            </Modal>
            <Text style={styles.title}>
                Foods!
            </Text>
            <FlatList
                style={{ marginTop: 20 }}
                ItemSeparatorComponent={() => (<View style={{ borderWidth: 1, borderColor: '#A370F7' }} />)}
                data={foods}
                renderItem={renderItem}
            />
        </View >
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 18,
        color: 'white',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
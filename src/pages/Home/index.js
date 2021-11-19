import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker'
import { format } from "date-fns";
import { useNavigation } from '@react-navigation/core';

import styles from './styles'

const typeProduct = [
    { label: 'Prato', value: 'prato' },
    { label: 'Lanche', value: 'lanche' },
    { label: 'Produto Fechado', value: 'produto fechado' }
]

export default function Home() {
    const [quantity, setQuantity] = useState('');
    const [selectedType, setSelectedType] = useState('')
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    const [foods, setFoods] = useState([])
    const { navigate } = useNavigation()

    const loadFoods = async () => {
        const listJson = await AsyncStorage.getItem('foods');
        const list = listJson ? JSON.parse(listJson) : [];
        if (list?.length > 0) {
            setFoods(list);
        } else {
            setFoods([]);
        }
    };

    console.log(foods)

    async function handleSubmit() {
        console.log(quantity, selectedType)
        if (quantity !== '' && selectedType !== '') {
            const list = JSON.stringify([...foods, { quantity, selectedType, date }]);
            await AsyncStorage.setItem('foods', list);
            console.log('success')
            navigate('ListFoods')
        }
        loadFoods()
    }

    useEffect(() => {
        loadFoods()
    }, [])

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Welcome!
            </Text>


            <View style={{
                backgroundColor: '#1F1E25', flexDirection: 'row', justifyContent: 'space-between', fontSize: 18,
                padding: 15,
                marginTop: 30,
                borderRadius: 7,
                alignItems: 'center'
            }}>
                <RNPickerSelect
                    style={pickerSelectStyles}
                    onValueChange={(value) => { setSelectedType(value) }}
                    items={typeProduct}
                />

            </View>
            <View style={{
                backgroundColor: '#1F1E25', flexDirection: 'row', justifyContent: 'space-between', fontSize: 18,
                padding: 15,
                marginTop: 30,
                borderRadius: 7,
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: 18, color: '#FFF' }}>
                    {format(date, "MMMM do, yyyy")}
                </Text>
                <TouchableOpacity onPress={() => { setOpen(true) }} style={{ padding: 5, backgroundColor: '#A370F7', borderRadius: 7 }}>
                    <Text>
                        Edit
                    </Text>
                </TouchableOpacity>
            </View >
            <View>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Quantity"
                placeholderTextColor="#555"
                onChangeText={setQuantity}
            />
            <TouchableOpacity
                style={styles.button}
                activeOpacity={.7}
                onPress={handleSubmit}
            >
                <Text sytle={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <DatePicker
                modal
                open={open}
                date={date}
                mode='date'
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
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
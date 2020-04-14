import React, { useState } from 'react';
import { AsyncStorage, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Alert } from 'react-native';

import api from '../services/api';
import Header from '../components/Header';

export default function Book({ navigation }) {
    const id = navigation.getParam('id')

    const [date, setDate] = useState('')
    // const [error, setError] = useState(false)

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user')
        const res = await api.post(`/spots/${id}/bookings`, { date }, {
            headers: { user_id }
        })

        if (res.status !== 200) {
            return Alert.alert('Ocorreu um erro... Tente novamente')
        }
        Alert.alert('Solicitação de reserva enviada')
        return navigation.navigate('List')
    }

    async function handleCancel() {
        return navigation.navigate('List')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Text style={styles.label}>DATA DE INTERESSE*</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCapitalize="none"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.cancelButton} */}
            <TouchableOpacity style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
            >
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        margin: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 16
    }
})
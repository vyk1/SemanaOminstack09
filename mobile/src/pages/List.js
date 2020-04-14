import React, { useState, useEffect } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import socketio from "socket.io-client";
import SpotList from "../components/SpotList";
import Header from '../components/Header';

export default function List() {
    const [techs, setTechs] = useState([])
    // const [email, setEmail] = useState('')
    // const [error, setError] = useState(false)

    useEffect(() => {
        AsyncStorage.getItem('user').then((user_id) => {
            const socket = socketio('http://192.168.0.105:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        })
    }, [])
    useEffect(() => {
        AsyncStorage.getItem('techs').then(storedTechs => {
            const techArray = storedTechs.split(',').map(tech => tech.trim())
            setTechs(techArray)
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    },
})
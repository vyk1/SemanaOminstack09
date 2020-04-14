import React from 'react';
import logo from "../assets/logo.png";
import { Image, StyleSheet, View, AsyncStorage, Alert } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

function Header({ navigation }) {

    async function logout() {
        AsyncStorage.removeItem('user')
        AsyncStorage.removeItem('techs')

        Alert.alert('Logout efetuado com sucesso.')
        return navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <TouchableOpacity onPress={logout}>
                <AntDesign name="logout" size={20} style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10,
        // alignItems: '',
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        justifyContent: 'flex-start',
    },
    icon: {
        justifyContent: 'flex-end',
        // flexDirection: 'column',
        // alignSelf: 'flex-start'
    }
})

export default withNavigation(Header)

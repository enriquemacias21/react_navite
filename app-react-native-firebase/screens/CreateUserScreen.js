import React, {useState} from "react";
import { View, Text, Button, TextInput, ScrollView, StyleSheet} from "react-native";

import { db } from '../database/firebase'
import { collection, addDoc} from 'firebase/firestore';

import UserList from "./UserList";

const CreateUserScreen = (props) => {
    
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleChangeText = (name, value) => {
        setState ({...state, [name]: value})
    }

    
    const saveNewUser = async () => {
        //console.log(state)
            if (state.name ===''){
                alert('Datos vacíos')
            } else {
                try{
                const docRef = await addDoc(collection(db,'users'), {
                    name: state.name,
                    email: state.email,
                    phone: state.phone
                });
                
                alert("Datos Guardado");
                props.navigation.navigate(UserList)
            }catch(e){
                alert("Error al agregar");
                console.log(e)
            }
            }
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name User"  onChangeText={(value)=> handleChangeText('name', value)}/> 
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Email User"  onChangeText={(value)=> handleChangeText('email', value)}/> 
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone User"  onChangeText={(value)=> handleChangeText('phone', value)}/> 
            </View>
            <View>
                <Button title="Save USer" onPress={() => saveNewUser()}/> 
            </View>
        </ScrollView> 
    )
}

const styles = StyleSheet.create({
    container:{
        felx: 1,
        padding: 35
    },
    inputGroup:{
        flex: 1,
        padding:0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor:'#cccccc'
    }
})

export default CreateUserScreen
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { doc, updateDoc} from 'firebase/firestore';
import { db } from '../database/firebase'

import UserList from './UserList';

const EditUserScreen = (props) => {
  
  const { route, navigation } = props;
  const { user, refreshUsers } = route.params; // Recibimos los datos del usuario para editar
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSaveChanges = async () => {
    // Actualizamos los datos en Firestore
    try {
      const userRef = doc(db, 'users',user.id);//db.collection('users').doc(user.id); 
      await updateDoc(userRef, {
        name: name,
        email: email,
        phone: phone,
      });
      
      alert('Usuario actualizado con éxito', name);

      /*refreshUsers
      // Verifica si el callback 'refreshUsers' existe y llámalo*/
      if (refreshUsers) {
        refreshUsers(); // Recargar los usuarios en la lista
      }
      props.navigation.navigate(UserList)
      //navigation.goBack(); // Volver a la pantalla anterior
    } catch (error) {
      console.error("Error al actualizar el usuario: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      
      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4f83cc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditUserScreen;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../database/firebase'; // Asegúrate de que Firestore está correctamente importado

const UserDetailScreen = (props) => {
    const { route, navigation } = props;
    const { user, refreshUsers } = route.params;

    // Función para eliminar el usuario
  const handleDeleteUser = async () => {
    try {
      await deleteDoc(doc(db, 'users', user.id)); // Elimina el usuario de Firestore
      Alert.alert('Éxito', 'Usuario eliminado correctamente');
      refreshUsers(); // Refresca la lista de usuarios en UserList
      navigation.navigate('UserList'); // Navega de vuelta a la lista de usuarios
    } catch (error) {
      console.error('Error al eliminar el usuario: ', error);
      Alert.alert('Error', 'No se pudo eliminar el usuario');
    }
  };

       return(
           <View style={styles.container}>
      <View style={styles.card}>
        <FontAwesome name="user-circle" size={100} color="#4f83cc" style={styles.icon} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>
        <Text style={styles.infoLabel}>Teléfono:</Text>
        <Text style={styles.info}>{user.phone}</Text>

        {/* Botón para regresar o realizar otra acción */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>

        {/* Botón para Editar */}
        <TouchableOpacity 
          style={[styles.button, styles.editButton]} 
          onPress={() => navigation.navigate('EditUserScreen', { user ,refreshUsers })}
        >
          <Text style={styles.buttonText}>Editar Información</Text>
        </TouchableOpacity>

        {/* Botón para Eliminar */}
        <TouchableOpacity 
          style={[styles.button, styles.editButton]} 
          onPress={handleDeleteUser}
        >
          <Text style={styles.buttonText}>Eliminar Información</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3f3f3',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    card: {
      backgroundColor: '#fff',
      width: '100%',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    icon: {
      marginBottom: 20,
    },
    name: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    infoLabel: {
      fontSize: 16,
      fontWeight: '600',
      marginTop: 10,
      color: '#888',
    },
    info: {
      fontSize: 18,
      marginBottom: 10,
      color: '#4f83cc',
    },
    button: {
      backgroundColor: '#4f83cc',
      padding: 15,
      borderRadius: 10,
      marginTop: 30,
      width: '80%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default UserDetailScreen
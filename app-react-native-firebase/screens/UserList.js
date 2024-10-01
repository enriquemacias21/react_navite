import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { collection, getDocs } from 'firebase/firestore'; // Asegúrate de que Firestore está importado correctamente
import { db } from '../database/firebase'; // Importa tu configuración de Firebase

import UserCard from './UserCard';

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener usuarios de Firestore
  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList = [];
      querySnapshot.forEach((doc) => {
        userList.push({ id: doc.id, ...doc.data() }); // Agrega ID y datos del usuario
      });
      setUsers(userList);
    } catch (error) {
      console.error("Error al obtener usuarios: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para refrescar la lista de usuarios
  const handleRefreshUsers = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData(); // Obtener usuarios al montar el componente
  }, []);

  const handleNavigateToCreateUser = () => {
    //props.navigation.navigate('CreateUsers');
    navigation.navigate('CreateUserScreen');
    //props.navigation.goBack()
  };


  const renderItem = ({ item }) => (
    <UserCard
      user={item} 
      onPress={() => navigation.navigate('UserDetailScreen', { user: item, refreshUsers: handleRefreshUsers })}
    >
    </UserCard>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onRefresh={handleRefreshUsers}
        refreshing={loading}
      />
      <View>
        <Button title="Crear Usuario" onPress={() => handleNavigateToCreateUser()}/> 
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserList;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const UserCard = ({ user, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <View style={styles.infoContainer}>
        <Icon name="mail" size={20} color="#007BFF" />
        <Text style={styles.infoText}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon name="call" size={20} color="#007BFF" />
        <Text style={styles.infoText}>{user.phone}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 2, // Para dar sombra en Android
    shadowColor: '#000', // Para dar sombra en iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default UserCard;

import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';

const EntrenamientoScreen = () => {
  const [mensaje, setMensaje] = useState('');

  const entrenarModelo = async () => {
    try {
      const response = await fetch('http://192.168.1.67:8000/mosquito/entrenamiento/', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(data.mensaje);
        //navigation.navigate('Resultado', { predictionData: data });
      } else {
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error);
      // Manejar el error de la solicitud
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Entrenamiento de Modelo</Text>
      <Button title="Entrenar" onPress={entrenarModelo} />
      <Text>Resultado: {mensaje}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagen: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});

export default EntrenamientoScreen;

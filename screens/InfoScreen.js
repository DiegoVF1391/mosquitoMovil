import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//import axios from 'axios';

const InfoScreen = ({ navigation }) => {
  const [informacionModelo, setInformacionModelo] = useState(null);
  const [nombresCapas, setNombresCapas] = useState([]);

  useEffect(() => {
    obtenerInformacionModelo();
  }, []);

  const obtenerInformacionModelo = async () => {
    try {
      const response = await fetch('http://192.168.1.67:8000/mosquito/informacion-modelo/');
      if (response.ok) {
        const data = await response.json();
        setInformacionModelo(data.informacion_modelo);
        setNombresCapas(data.informacion_modelo.nombres_capas);
      } else {
        console.error('Error al obtener la información del modelo');
      }
    } catch (error) {
      console.error('Error al obtener la información del modelo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Información del sistema</Text>
      <View style={styles.predictionContainer}>
        {informacionModelo && (
            <View>
            <Text style={styles.enfasis}>Estado actual del sistema: {informacionModelo.sistema}</Text>
            <Text style={styles.characteristics}>Modelo: {informacionModelo.modelo}</Text>
            <Text style={styles.characteristics}>Dataset: {informacionModelo.dataset}</Text>
            <Text style={styles.capas}>Numero de fotos de entrenamiento:</Text>
            <Text style={styles.characteristics}>Aegypti: {informacionModelo.train_aegypti}</Text>
            <Text style={styles.characteristics}>Albopictus: {informacionModelo.train_albopictus}</Text>
            <View style={styles.capas}>
                <Text style={styles.capas}>Capas del modelo:</Text>
                {nombresCapas.map((capa, index) => (
                    <Text key={index}>{capa}</Text>
                ))}
            </View>
            {/* Mostrar otras métricas o información del modelo según sea necesario */}
            </View>
        )}
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      padding: 20,
    },
    predictionContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
      },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    barra: {
      backgroundColor: '#000000',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginTop: 20,
      marginBottom: 10,
    },
    titulo: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom:16,
    },
    capas:{
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
    },
    button: {
      backgroundColor: '#000000',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginTop: 20,
      marginBottom: 10,
    },
    enfasis:{
        fontSize:18,
        fontWeight:'bold',
        color:'#343100',
        marginBottom:3,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    characteristics: {
        marginTop: 10,
      },
  });

export default InfoScreen;

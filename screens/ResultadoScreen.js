import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ResultadoPantalla = ({ navigation, route }) => {
  const { predictionData } = route.params;
  
  const characteristics = {
    'Aegypti': ' El Aedes Aegypti es un mosquito de color oscuro, con manchas blancas en las patas y un patrón característico en su abdomen.',
    'Albopictus': ' El Aedes Albopictus es conocido como mosquito tigre debido a sus rayas blancas y negras en el cuerpo y las patas.',
  };

  // Lógica para mostrar la imagen según la especie predicha
  const getImageForSpecies = (specie) => {
    switch (specie) {
      case 'Aegypti':
        return require('../assets/aegypti.jpg'); // Reemplaza con la ruta de la imagen correspondiente
      case 'Albopictus':
        return require('../assets/albopictus.jpg'); // Reemplaza con la ruta de la imagen correspondiente
      default:
        return require('../assets/idk.png'); // Imagen por defecto si no se encuentra la especie
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado de la Predicción</Text>
      <View style={styles.predictionContainer}>
        <Image source={getImageForSpecies(predictionData.prediccion)} style={styles.mosquitoImage} />
        <Text>Especie Predicha: {predictionData.prediccion}</Text>
        <Text>Probabilidad: {predictionData.accuracy}%</Text>
        <Text style={styles.characteristics}>
          Características:
          {characteristics[predictionData.prediccion]}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Regresar al Inicio</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  predictionContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  mosquitoImage: {
    borderRadius: 10,
    width: 220,
    height: 220,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  characteristics: {
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default ResultadoPantalla;

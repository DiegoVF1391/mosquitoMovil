import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const EntrenamientoScreen = () => {
  const [mensaje, setMensaje] = useState('');
  const [history, setHistory] = useState({ accuracy: [], val_accuracy: [] });

  const entrenarModelo = async () => {
    try {
      const response = await fetch('http://192.168.1.67:8000/mosquito/entrenamiento/', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(data.mensaje);
        setHistory(data.history);
      } else {
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error);
    }
  };

  useEffect(() => {
    entrenarModelo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Entrenamiento de Modelo</Text>
      <LineChart
        data={{
          labels: Array.from({ length: history.accuracy.length }, (_, i) => (i + 1).toString()),
          datasets: [
            {
              data: history.accuracy,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: history.val_accuracy,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        }}
        width={350}
        height={220}
        yAxisSuffix="%" // Sufijo para los valores del eje Y
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
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
});

export default EntrenamientoScreen;

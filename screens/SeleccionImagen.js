import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import { AntDesign } from '@expo/vector-icons';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off); // Estado para el modo de flash
  const navigation = useNavigation(); // Obtiene el objeto de navegación
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    setLoading(true);
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();

      const data = new FormData();
      data.append('imagen', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      try {
        const response = await fetch('http://192.168.1.67:8000/mosquito/prediccion/', {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.ok) {
          const jsonData = await response.json();
          // Aquí manejas la respuesta de la API y rediriges a otra pantalla
          console.log(jsonData);
          setLoading(false); // Desactivar la barra de carga después de recibir la respuesta
          navigation.navigate('Resultado', { predictionData: jsonData });
        } else {
          throw new Error('Error en la solicitud');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al enviar la imagen a la API.');
        setLoading(false);
      }
    }
  };

  const toggleFlash = () => {
    // Cambiar el estado del modo de flash
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={(ref) => setCameraRef(ref)}
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        flashMode={flashMode} // Establecer el modo de flash
        autoFocus={Camera.Constants.AutoFocus.on}
      >
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Procesando...</Text>
          </View>
        )}
        <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
            <Text style={styles.flashText}>
              Flash: {flashMode === Camera.Constants.FlashMode.off ? 'Apagado' : 'Encendido'}
            </Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.takePictureButton} onPress={takePicture}>
            <AntDesign name="camera" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    opacity: 0.7
  },
  takePictureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    color:'#ffffff',
    borderRadius: 35,
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 20,
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
  flashButton: {
    alignSelf: 'flex-start',
    margin: 20,
  },
  flashText: {
    color: 'white',
  },
});

export default CameraScreen;

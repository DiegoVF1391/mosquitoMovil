import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SeleccionImagen from './screens/SeleccionImagen';
import ResultadoScreen from './screens/ResultadoScreen';
import EntrenarScreen from './screens/EntrenarScreen';
import InfoScreen from './screens/InfoScreen';
import GraficaScreen from './screens/GraficaScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SeleccionImagen" component={SeleccionImagen} />
        <Stack.Screen name="Resultado" component={ResultadoScreen} />
        <Stack.Screen name="Entrenar" component={EntrenarScreen} />
        <Stack.Screen name="Informacion" component={InfoScreen} />
        <Stack.Screen name="Grafica" component={GraficaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

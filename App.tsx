
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import WeatherMain from './components/WeatherMain';
import {ImageLoader} from './components/img/ImageLoader';
import  Colors from './constants/Colors';
import 'react-native-gesture-handler';
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode } 

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary:'#69A297',
    accent: '#50808E',
    background: '#DDD8C4'
  },
};


export default function App() {

   ImageLoader("./");
    
    return (
      <PaperProvider theme={theme}>
        <WeatherMain></WeatherMain>
      </PaperProvider>
    );
  }


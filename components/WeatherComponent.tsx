
import React, { useEffect, useState } from 'react'; // we need this to make JSX compile
import { ActivityIndicator, Appbar, Snackbar, Text } from 'react-native-paper';
import useWeatherData from '../hooks/useWeatherData';
import { DisplayModel, DisplayTableModel, toMainDisplayModel, toTableDisplayModel } from '../models/WeatherRequestModel';
import { StyleSheet, View } from 'react-native';
import { ColorSet } from '../constants/Colors';
import WeatherDetailed from './WeatherDetailed';
import WeatherTable from './WeatherTable';
import WeatherChart from './WeatherChart';

const styles = StyleSheet.create({
  stretch: {
    width: 20,
    height: 20,
    resizeMode: 'stretch',
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
  }
});
type WeatherComponentProps = {
  ort: string,
  coordinates: string
}

const WeatherComponent = ({ ort, coordinates }: WeatherComponentProps) => {

  const [response, setResponse] = useState<DisplayModel[]>(new Array);
  const [responseTable, setResponseTable] = useState<DisplayTableModel[]>(new Array);

  const [loadingMain, setLoadingMain] = useState<boolean>(true);
  const [loadingTable, setLoadingTable] = useState<boolean>(true);

  const [isDetailedView, setDetailedView] = useState<boolean>(true);

  const { fetchData24h, fetchMinMaxDataPast24hNext10Days } = useWeatherData();

  useEffect(() => {
    setLoadingMain(true);

    fetchData24h(coordinates).then(value => {

      const res = value.data.data;
      const mainDisplayModel: Array<DisplayModel> = toMainDisplayModel(res);

      setResponse(mainDisplayModel);
      setLoadingMain(false);
    }
    )
      ;
  }, []);

  useEffect(() => {
    setLoadingTable(true);

    fetchMinMaxDataPast24hNext10Days(coordinates).then(value => {
        
      const res = value.data.data;
      const tableDisplayModel: Array<DisplayTableModel> = toTableDisplayModel(res);

      setResponseTable(tableDisplayModel);
      setLoadingTable(false);
    })
      ;
  }, []);


  if (loadingMain || loadingTable)
    return <View style={styles.centered}>
      <ActivityIndicator size='large' animating={true} color={ColorSet.c4} />
    </View>


  return (
    <View >
    <Appbar.Header>

    {!isDetailedView && <Appbar.BackAction onPress={()=>setDetailedView(true)} />}
    <Appbar.Content title={isDetailedView ? "Heute":"10-Tage-Vorhersage"}/>

    {isDetailedView && <Appbar.Action icon="format-list-bulleted" onPress={()=>setDetailedView(false)} />}
  </Appbar.Header>

    {isDetailedView ? 
      
  <View style={[styles.container, {
    flexDirection: "column",
    paddingTop: 40,
    alignItems:'center'
  }]}>

    <WeatherDetailed data={response}></WeatherDetailed>
    <WeatherChart data={response}></WeatherChart> 
      </View>:
    <WeatherTable data={responseTable}></WeatherTable>   }
    </View>
  )
};


export default WeatherComponent;
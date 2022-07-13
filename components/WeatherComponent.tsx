
import React, { useEffect, useState } from 'react'; // we need this to make JSX compile
import { ActivityIndicator, Snackbar, Text } from 'react-native-paper';
import useWeatherData from '../hooks/useWeatherData';
import { DisplayModel, DisplayTableModel, toMainDisplayModel, toTableDisplayModel } from '../models/WeatherRequestModel';
import { StyleSheet, View } from 'react-native';
import { ColorSet } from '../constants/Colors';
import WeatherDetailed from './WeatherDetailed';
import WeatherTable from './WeatherTable';

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

  const [mainDate, setMainDate] = useState<Date>(new Date());
  const [response, setResponse] = useState<DisplayModel[]>(new Array);
  const [responseTable, setResponseTable] = useState<DisplayTableModel[]>(new Array);

  const [loadingMain, setLoadingMain] = useState<boolean>(true);
  const [loadingTable, setLoadingTable] = useState<boolean>(true);

  const [snackBarVisible, setSnackbarVisible] = useState<boolean>(false);

  const [textSnackbar, setTextSnackbar] = useState<string>("");

  const { fetchData24h, fetchMinMaxDataPast24hNext10Days } = useWeatherData();

  useEffect(() => {
    setLoadingMain(true);
    setResponse(new Array);


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
    setResponseTable(new Array);

    fetchMinMaxDataPast24hNext10Days(coordinates).catch(error => {
        setSnackbarVisible(true);
        setTextSnackbar(error.toString());
    }).then(value => {

      const res = value.data.data;
      const tableDisplayModel: Array<DisplayTableModel> = toTableDisplayModel(res);

      setResponseTable(tableDisplayModel);
      setLoadingTable(false);
    })
      ;
  }, []);


  if (loadingMain && loadingTable)
    return <View style={styles.centered}>
      <ActivityIndicator size='large' animating={true} color={ColorSet.c4} />
      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        {textSnackbar}
      </Snackbar>
    </View>


  return <View style={[styles.container, {
    flexDirection: "column"
  }]}>
    <WeatherDetailed style={{flex:3}} data={response}></WeatherDetailed>
    <WeatherTable data={responseTable}></WeatherTable>   
    </View>

};


export default WeatherComponent;
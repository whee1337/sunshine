import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import WeatherComponent from './WeatherComponent';



const WeatherMain = () => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'home1', title: 'Elz', icon: 'school', color: 'red', customName: "Elz", coordinates: "50.4166700,8.0333300"},
    { key: 'home2',title: 'Lahnstein', icon: 'paw', color:'#ded831', customName: "Lahnstein", coordinates: "50.307827,7.609363"},
    { key: 'home3', title: 'Hadamar',icon:'home', color:'#ded831',customName: "Hadamar",coordinates: "50.446816,8.045462" }
  //  { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline', color:'#ded831' },
  ]);

  const weatherComponent = () => <WeatherComponent ort={routes[index].customName} coordinates={routes[index].coordinates}></WeatherComponent>;

  const renderScene = BottomNavigation.SceneMap({
    home1: weatherComponent,
    home2: weatherComponent,
    home3: weatherComponent

  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default WeatherMain;
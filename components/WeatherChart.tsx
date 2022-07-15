import React from "react";
import { Area, Chart, HorizontalAxis, Line, VerticalAxis } from "react-native-responsive-linechart";
import { ColorSet } from "../constants/Colors";
import { DisplayModel } from "../models/WeatherRequestModel";
import { Text } from 'react-native-paper';

type WeatherChartProps= {
    data: Array<DisplayModel>,
}

const WeatherChart = ({data}: WeatherChartProps) => {


    if(!data || data.length <= 0)
    return (<Text>Keine Daten vorhanden!</Text>)

    const viewData = data.filter(value => value.date.getHours() <= 22 && value.date.getHours()>=6).map( value => {return {x: value.date.getHours(), y: value.temp}}) //.
    console.log(viewData)
    const tempArray: number[] = data.map(value => value.temp);
    const min = Math.min(...tempArray);
    const max = Math.max(...tempArray);

    return (<Chart
        style={{ height: 300, width: 390, marginTop: 5 }}
        data={ viewData}
        padding={{ left: 40, bottom: 20, right: 20, top: 10 }}
        xDomain={{ min: 6, max: 22}}
        yDomain={{ min: min-2, max:max+2 }}
      >
        <VerticalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toString()} }} />
        <HorizontalAxis tickValues={[0, 4, 8, 12, 16, 20]} theme={{ labels: { formatter: (v) => v.toString() +' Uhr' } }} />

        <Area theme={{ gradient: { from: { color: ColorSet.c2 }, to: { color:  ColorSet.c3, opacity: 0.4 } }}} />
        <Line theme={{ stroke: { color: ColorSet.c3, width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
      </Chart>)
}

export default WeatherChart;
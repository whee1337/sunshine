import { DisplayModel } from "../models/WeatherRequestModel";
import { View, } from "react-native"
import { NumberToImage } from "./img/ImageLoader";
import { Text, Card } from "react-native-paper"
import React from "react";
import { ColorSet } from "../constants/Colors";

type WeatherDetailedProps = {
    data: Array<DisplayModel>,
}

const WeatherDetailed = ({ data }: WeatherDetailedProps) => {

    if (!data || data.length <= 0)
        return <Text>Es konnten keine Daten gefunden werden!</Text>

    const findFirst = (list: Array<DisplayModel>) => {
        if (!list)
            return undefined;

        if (list.length < 1)
            return undefined;

        const now: Date = new Date();
        const hours: number = now.getHours();

        return list.find(value => value.date.getHours() === hours);
    }

    const valueNow = findFirst(data);
    const todayMax = Math.max(...data.map(value => value.temp));
    const todayMin = Math.min(...data.map(value => value.temp));

    const today = new Date();

    if (!valueNow)
        return <Text>Es konnten leider eine Daten gefunden werden</Text>

    return (
        <Card style={{ width: 230, height: 230, marginTop: -30, backgroundColor: ColorSet.c4 }}>
            <Card.Title title={"Heute, " + today.getDate() + "." + today.getMonth()} />
            <Card.Cover style={{ width: 80, height: 60, backgroundColor: ColorSet.c4, alignSelf: 'center' }} source={NumberToImage(valueNow.icon)} />
            <Card.Content>
                <View style={{ flex:1,flexDirection: "row",flexWrap: "wrap"}}>
                    <Text style={{ color: 'red', flex: 2, alignSelf:'stretch', textAlign: "center"}}>{todayMax}</Text>
                    <Text style={{ color: 'white', flex: 3, fontSize: 40, fontWeight: '300',textAlign: "center" }}>{valueNow.temp}</Text>
                    <Text style={{ color: 'blue', flex: 2,textAlign: "center" }}>{todayMin}</Text>
                </View>
            </Card.Content>
        </Card>
    )

}    

export default WeatherDetailed;
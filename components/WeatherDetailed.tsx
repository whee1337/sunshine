import { DisplayModel } from "../models/WeatherRequestModel";
import {Image, StyleProp, View, ViewStyle} from "react-native"
import { NumberToImage } from "./img/ImageLoader";
import {Text} from "react-native-paper"

type WeatherDetailedProps= {
    data: Array<DisplayModel>,
    style?: StyleProp<ViewStyle>
}

const WeatherDetailed = ({data,style}: WeatherDetailedProps) => {

    const findFirst = (list: Array<DisplayModel>) =>
    {
        if(!list)
            return undefined;

        if(list.length < 1)
            return undefined;

        const now: Date = new Date();
        const hours:number = now.getHours();

        return list.find(value => value.date.getHours() === hours);
    }

    const valueNow = findFirst(data);

    if(!valueNow)
        return <Text>Es konnten leider eine Daten gefunden werden</Text>

    return (
        <View style={style}> 
    <Text>{valueNow.temp}</Text>
    <Text>{valueNow.icon}</Text>

    <Image style={{
    width: 50,
    height: 50,
  }} 
  source = {NumberToImage(valueNow.icon)}

  
  />
    </View>
    )
}

export default WeatherDetailed;
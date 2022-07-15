import { DisplayModel, DisplayTableModel } from "../models/WeatherRequestModel";
import {Image, ScrollView} from "react-native"
import { DataTable } from "react-native-paper";
import { NumberToImage } from "./img/ImageLoader";
import {Text}  from 'react-native-paper'
import React from "react";

type WeatherTableProps= {
    data: Array<DisplayTableModel>
}

const WeatherTable = ({data}:WeatherTableProps) => {

const toTag = (date: Date) => {
    
    switch(date.getDay())
    {
        case 0: return "Sonntag";
        case 1: return "Montag";
        case 2: return "Dienstag";
        case 3: return "Mittwoch";
        case 4: return "Donnerstag";
        case 5: return "Freitag";
        case 6: return "Samstag";
        default: "UNKNOWN"
    }
}
const toReadable = (date: Date) => {
     const day = toTag(date);

     return day +" " + date.getDate() + "." + date.getMonth() +1;
}

    return (

<DataTable  style={{height: 800, alignItems:'center'}}>
    {data.map((model:DisplayTableModel)=> {
        return (
            <DataTable.Row key={Math.random()} >
            <DataTable.Cell style={{flex: 2}}><Text style={{fontSize:12}}>{toReadable(model.date)}</Text></DataTable.Cell>
            <DataTable.Cell style={{flex: 1}}><Text style={{fontSize:12,color:'blue'}}>{model.min}</Text></DataTable.Cell>
            <DataTable.Cell style={{flex: 1}}><Text style={{fontSize:12, color:'red'}}>{model.max}</Text></DataTable.Cell>
            <DataTable.Cell style={{flex: 1}}>    
                <Image style={{
                    flex: 2,
                    width: 23,
                    height: 23,
                    resizeMode: 'contain'
                }} 
                
                source = {NumberToImage(model.icon)}
                />
            </DataTable.Cell>
          </DataTable.Row>
        )
    })}
    </DataTable>
    )
}

export default WeatherTable;
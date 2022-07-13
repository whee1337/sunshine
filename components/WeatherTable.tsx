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

    return (
        <ScrollView>

<DataTable  style={{height: 650}}>
    {data.map((model:DisplayTableModel)=> {
        return (
            <DataTable.Row key={Math.random()} >
            <DataTable.Cell style={{flex: 5}}><Text style={{fontSize:12}}>{model.date.toString()}</Text></DataTable.Cell>
            <DataTable.Cell style={{flex: 1}}><Text style={{fontSize:12,color:'blue'}}>{model.min}</Text></DataTable.Cell>
            <DataTable.Cell style={{flex: 1}}><Text style={{fontSize:12, color:'red'}}>{model.max}</Text></DataTable.Cell>
            <DataTable.Cell style={{flex: 2}}>    
                <Image style={{
                    height: 35,
                    width: 50,
                }} 
                
                source = {NumberToImage(model.icon)}
                />
            </DataTable.Cell>
          </DataTable.Row>
        )
    })}

    </DataTable>
    </ScrollView>
    )
}

export default WeatherTable;
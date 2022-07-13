export interface RequestModel 
{
    parameter: string;
    coordinates: Array<Coordinate>;
}

export interface Coordinate
{
    lat: number;
    lng: number;
    dates: Array<DataModel>;
}

export interface DataModel{
    date: Date;
    value: number;
}

export interface DisplayModel {
    icon: number;
    temp: number;
    date: Date;
}

export interface DisplayTableModel {
    icon: number;
    min: number;
    max: number;
    date: Date;
}

export function toMainDisplayModel(model: Array<RequestModel>)
{
    let result: Array<DisplayModel> = new Array();

    let iconArray;
    let valueArray;

    if(isIconArray(model[0].parameter))
    {
            iconArray = model[0].coordinates[0].dates;
            valueArray = model[1].coordinates[0].dates;
    }
    else{
            iconArray = model[1].coordinates[0].dates;
            valueArray = model[0].coordinates[0].dates;
    }

    const len = iconArray.length;

    for(let i = 0; i< len ; i++)
    {
        result.push({icon:iconArray[i].value,
            temp:valueArray[i].value,date:new Date(iconArray[i].date)})
    }

    return result;
}

export function toTableDisplayModel(model: Array<RequestModel>)
{
    let result: Array<DisplayTableModel> = new Array();

    // TODO Error handler if > 3
    let iconArray;
    let minArray;
    let maxArray;

    if(isIconArray(model[0].parameter))
    {      
        iconArray = model[0].coordinates[0].dates;
    }
    else if(isIconArray(model[1].parameter)){
        iconArray = model[1].coordinates[0].dates;
    }
    else
    {
        iconArray = model[2].coordinates[0].dates;
    }

    if(isMinArray(model[0].parameter))
    {
        minArray = model[0].coordinates[0].dates;
    }
    else if(isMinArray(model[1].parameter)){

        minArray = model[1].coordinates[0].dates;
    }
    else
    {        
        minArray = model[2].coordinates[0].dates;
    }

    if(isMaxArray(model[0].parameter))
    {   
        maxArray = model[0].coordinates[0].dates;

    }
    else if(isMaxArray(model[1].parameter)){

        maxArray = model[1].coordinates[0].dates;
    }
    else
    {
        maxArray = model[2].coordinates[0].dates;
    }
    const len = iconArray.length;

    for(let i = 0; i< len ; i++)
    {
        result.push({icon:iconArray[i].value,
            min:minArray[i].value,max: maxArray[i].value ,date:new Date(iconArray[i].date)})
    }
    return result;
}

function isIconArray(parameter: string)
{
    if (parameter === 'weather_symbol_24h:idx')
        return true;
    if (parameter === 'weather_symbol_1h:idx')
        return true;

    return false;
}

function isMinArray(parameter: string)
{
    if (parameter === 't_min_2m_24h:C')
        return true;

    return false;
}

function isMaxArray(parameter: string)
{
    if (parameter === 't_max_2m_24h:C')
        return true;

    return false;
}


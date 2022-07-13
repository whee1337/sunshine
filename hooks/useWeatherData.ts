import axios, { AxiosResponse } from "axios";
import { RequestModel } from "../models/WeatherRequestModel";

const baseUrl ='https://api.meteomatics.com/';
const prefType = "/json";
const username = "***";
const password = "***";

export default function useCachedResources() {


    async function fetchData24h (coordinates: string) {

    const date = new Date();
    date.setHours(23,59);

    const dateBegin = new Date();
    dateBegin.setHours(0,1);

    const url = createRequestTimezone1hUrl('t_2m:C,weather_symbol_1h:idx',dateBegin.toISOString(),date.toISOString(),coordinates);

    return axios.get<AxiosResponse<Array<RequestModel>>>(url, 
        {auth: {username: username, password: password}})
        
  };

  async function fetchMinMaxDataPast24hNext10Days(coordinates: string) {

    const date = new Date();

    date.setHours(23);
    date.setMinutes(59);

    const dateEnd = new Date(date);
    dateEnd.setDate(dateEnd.getDate() + 9);

    const url = createRequestTimezoneUrl('t_min_2m_24h:C,t_max_2m_24h:C,weather_symbol_24h:idx',date.toISOString(),dateEnd.toISOString(),coordinates);

    return axios.get(url, 
        {auth: {username: username, password: password}});
  };


  function createRequestUrl(argument: string, time: string, coordinates: string)
  {
    return baseUrl + time + "/" + argument + "/" + coordinates + prefType;
  }

  function createRequestTimezoneUrl(argument: string, begin: string,end: string, coordinates: string)
  {
    return baseUrl + begin + "--"+ end +":PT24H" + "/" + argument + "/" + coordinates + prefType;
  }

  function createRequestTimezone1hUrl(argument: string, begin: string,end: string, coordinates: string)
  {
    return baseUrl + begin + "--"+ end +":PT1H" + "/" + argument + "/" + coordinates + prefType;
  }

  return {fetchData24h,fetchMinMaxDataPast24hNext10Days}
}
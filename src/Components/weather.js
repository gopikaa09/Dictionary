import axios from "axios"
import { useEffect, useRef, useState } from "react"

const WeatherApi=()=>{
    const[inputvalue,setInputValue]=useState("")
    const[data,setData]=useState("")
    const apiref=useRef(null)
    const fetchWeatherApi=async()=>{
        try{
            const response =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=fda3e585a190e729b4e4db2c03e31c7f`)
            console.log(response.data.main);
            setData(response.data.main)
        }catch{

        }
    }
    useEffect(()=>{
        fetchWeatherApi()
    },[inputvalue])

    const handleInput=(e)=>{
        e.preventDefault();
        setInputValue(apiref.current.value)
    }
    return(
        <div>
        <form>
        <input type="text" placeholder="enter city" ref={apiref}/>
        <button onClick={handleInput}>search</button>
        </form>
        {
            <div>
            <p>Average Temperature:{data.temp}</p>
            <p>Maximum Temperature:{data.temp_max}</p>
            <p>Minimum Temperature:{data.temp_min}</p>
            </div>
        }
        
        </div>
    )
}
export default WeatherApi
import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';
import Lottie from "react-lottie";
import cloudImg from "./Assets/Animation - 1717781150665.json";

let DisplayWeatherDetails = lazy(() => import('./DisplayWeatherDetails'))
function WeatherCompo() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: cloudImg,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    let [isLoading, setLoading] = useState(false);
    let [weatherData, setWeatherData] = useState(null);
    let [cityName, setCityName] = useState('bokaro')
    let searchInputRef = useRef();

    useEffect(() => {
        searchInputRef.current.focus();
    }, []);


    let handleSearch = (e) => {
        setCityName(searchInputRef.current.value);
        searchInputRef.current.value = ""
        searchInputRef.current.focus();
    }

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=ef6c520e86f78c747a590411d51c38ab`)
            .then((response) => {
                setLoading(false);
                setWeatherData(response.data);
            }).catch((err) => {
                setWeatherData(err.response.data);
            })
    }, [cityName]);


    return (
        <main className='mainContainer'>
            <header>
                <Lottie options={defaultOptions} height={100} width={110} className='animation' />
                <input type="text" className="searchInput" placeholder='Search Your City' ref={searchInputRef} />
                <button className='SearchBtn' onClick={handleSearch}>Search</button>
            </header>
            {
                Number(weatherData?.cod) === 200 ? <>
                    {
                        isLoading ? <div className="container">
                            <div className="ball1 ball"></div>
                            <div className='ball2 ball'></div>
                            <div className='ball3 ball'></div>
                            <div className='ball4 ball'></div>
                            <div className='ball5 ball'></div>
                        </div>
                            :
                            <Suspense fallback={<div className="container">
                                <div className="ball1 ball"></div>
                                <div className='ball2 ball'></div>
                                <div className='ball3 ball'></div>
                                <div className='ball4 ball'></div>
                                <div className='ball5 ball'></div>
                            </div>}>

                                <DisplayWeatherDetails value={weatherData} />

                            </Suspense>

                    }
                </> : <p className="errorMessage">{weatherData?.message} {weatherData?.cod}</p>
            }
        </main>
    )
}

export default WeatherCompo

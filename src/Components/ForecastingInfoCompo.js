import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Lottie from "react-lottie";
import WindSpeedImg from "./Assets/Animation - 1717782969488.json";
import temperatureImg from "./Assets/Animation - 1717783423666.json";
import visibilityImg from "./Assets/Animation - 1717783720075.json";
import humidityImg from "./Assets/Animation - 1717784089976.json";
import weatherImg from "./Assets/Animation - 1717784731410.json";


function ForecastingInfoCompo() {
  let navigateToHome = useNavigate();
  let currentDate = useParams().Date;
  let filteredData = useLocation().state?.list.filter((item) => item.dt_txt.split(" ")[0] === currentDate)

  const windSpeed = {
    loop: true,
    autoplay: true,
    animationData: WindSpeedImg,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const temperature = {
    loop: true,
    autoplay: true,
    animationData: temperatureImg,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const visibility = {
    loop: true,
    autoplay: true,
    animationData: visibilityImg,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const humidity = {
    loop: true,
    autoplay: true,
    animationData: humidityImg,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const weathericon = {
    loop: true,
    autoplay: true,
    animationData: weatherImg,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className='FullWeatherInfoContainer'>
      <header>
        <Lottie options={weathericon} height={90} width={90} className='AppLogo' />
        {/* <img src={Logo} alt="WeatherLogo" className='AppLogo' /> */}
        <h1 className='head'>Weather Forecast : {currentDate}</h1>
      </header>

      <div className='currentWeatherInfoContainer'>

        <div className="infoBox">
          <p className='infoHeading'>{filteredData[0].weather[0].main}</p>
          <img className='weatherIcon' src={`https://openweathermap.org/img/wn/${filteredData[0].weather[0].icon}@2x.png`} alt="ImageNhaihai" />
          <p className='infodata'>{Math.floor(filteredData[0].main.temp - 273.15)}<sup>°C</sup></p>
        </div>

        <div className="infoBox">
          <p className="infoHeading">Wind Speed</p>
          <Lottie options={windSpeed} height={100} width={110} className='animation' />
          <p className='infodata'>{filteredData[0].wind.speed} Km/h</p>
        </div>

        <div className="infoBox">
          <p className="infoHeading">Feel Like</p>
          <Lottie options={temperature} height={100} width={110} className='animation' />
          <p className='infodata'>{Math.floor(filteredData[0].main.feels_like - 273.15)}<sup>°C</sup></p>
        </div>

        <div className="infoBox">
          <p className="infoHeading">Visibility</p>
          <Lottie options={visibility} height={100} width={110} className='animation' />
          <p className='infodata'>{Number(filteredData[0].visibility) / 1000} Km</p>
        </div>

        <div className="infoBox">
          <p className="infoHeading">Humidity</p>
          <Lottie options={humidity} height={100} width={110} className='animation' />
          <p className='infodata'>{filteredData[0].main.humidity}%</p>
        </div>

      </div>

      <h3 className='forCaseHeading'>{currentDate} Forcast</h3>
      <div className="todayForcastContainer">
        {
          filteredData.filter((item, index) => index !== 0).map((item, index) => {
            return <div className="TforecastBox" key={index}>
              <p className="TforeCastTime">{(item.dt_txt.split(" ")[1])}</p>
              <img className='TforeCastICon' src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="ImageNhaihai" />
              <h2 className='TforeCasttempLabel'>{Math.floor(item.main.temp - 273.15)}<sup>°C</sup></h2>
            </div>
          })
        }
      </div>
      <button className='showForeCastBtn' onClick={() => navigateToHome("/")} >Go To Home Page</button>

    </section>
  )
}

export default ForecastingInfoCompo

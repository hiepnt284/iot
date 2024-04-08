import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import '../reset.css';
import Temperature from './Temperature';
import Led from './Led';
import Fan from './Fan';
import Chart from './Chart';
import Humidity from './Humidity';
import Intensity from './Intensity';
import axios from "axios";

function Main() {
  const [data, setData] = useState({
    temperature: 0,
    humidity: 0,
    light: 0,
    timestamp: new Date().toLocaleTimeString(),
  });

  let chartData = useRef([data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:8081/getSensor');
        // const data = await response.json();
        let newdata = {
          temperature: Math.floor(Math.random() * 20) + 20,
          humidity: Math.floor(Math.random() * 50) + 50,
          light: Math.floor(Math.random() * 1000) + 1,
          timestamp: new Date().toLocaleTimeString(),
        };

        const nextChartData = [...chartData.current, newdata];
        if (nextChartData.length > 10) {
          chartData.current = nextChartData.slice(1);
        } else {
          chartData.current = nextChartData;
        }

        setData(newdata);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    const interval = setInterval(fetchData, 2000);

    return () => {
      console.log("cancel");
      clearInterval(interval);
    };
  }, []);

    const [ledState, setLedState] = useState("off");
    const [fanState, setFanState] = useState("off");
    

  useEffect(() => {
        let ignore = false;
        axios
          .get("http://localhost:8081/api/lastaction")
          .then((response) => {
            const lastAction = response.data;
            console.log(lastAction);
            if (lastAction && lastAction.length > 0 && !ignore) {
              if (lastAction[0].deviceName === "den") {
                setLedState(lastAction[0].action);
                setFanState(lastAction[1].action);
              } else {
                setLedState(lastAction[1].action);
                setFanState(lastAction[0].action);
              }
            }
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
    
      return () => {
        ignore = true;
        console.log("cancel api lastaction")
      };
      }, []);

    return (
      <>
        <div className="label">IOT-DASHBOARD</div>
        <div className="container">
          <Temperature temperature={data.temperature} />
          <Humidity humidity={data.humidity} />
          <Intensity intensity={data.light} />
          <Chart chartData={chartData.current} />
          <Led state={ledState} />
          <Fan state={fanState} />
        </div>
      </>
    );
}

export default Main;






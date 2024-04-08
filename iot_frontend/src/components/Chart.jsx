import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ chartData }) => {
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     setData(chartData);
    // }, [chartData]);

    return (
        <div className="chart box">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    animationDuration={100}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis yAxisId="left1" orientation="left" domain={[0, 100]} ticks={Array.from({ length: 11 }, (_, index) => index * 10)} />
                    <YAxis yAxisId="left2" orientation="right" domain={[0, 1000]} ticks={Array.from({ length: 11 }, (_, index) => index * 100)} />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="red"
                        name="Temperature"
                        unit="°C"
                        yAxisId="left1"
                        activeDot={{ r: 8 }}
                        isAnimationActive={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="humidity"
                        stroke="blue"
                        name="Humidity"
                        unit="%"
                        yAxisId="left1"
                        activeDot={{ r: 8 }}
                        isAnimationActive={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="light"
                        stroke="#cfbd20"
                        name="Light"
                        unit="lux"
                        yAxisId="left2"
                        activeDot={{ r: 8 }}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;

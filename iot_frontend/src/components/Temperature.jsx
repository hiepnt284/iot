import React from 'react';
import { LiaTemperatureHighSolid } from 'react-icons/lia';
import { TbTemperatureCelsius } from 'react-icons/tb';

const Temperature = ({ temperature }) => {
    // Hàm để tính toán màu gradient dựa trên nhiệt độ
    const calculateGradientColor = (temperature) => {
        // Bạn có thể tùy chỉnh logic này dựa trên các khoảng nhiệt độ của bạn
        const minTemperature = 20;
        const maxTemperature = 40;
        const normalizedTemperature = Math.min(
            Math.max(minTemperature, temperature),
            maxTemperature
        );

        // Chuyển đổi giá trị nhiệt độ thành một giá trị từ 0 đến 1
        const percentage = (normalizedTemperature - minTemperature) / (maxTemperature - minTemperature);

        // Tạo một màu gradient từ cam đến đỏ dựa trên giá trị nhiệt độ
        const hue = (1 - percentage) * 30; // Màu cam ở giá trị thấp, đỏ ở giá trị cao
        return `linear-gradient(to top right, hsl(${hue + 30}, 100%, 50%), red)`;
    };

    return (
        <>
            <div className="param temperature box" style={{ background: calculateGradientColor(temperature) }}>
                <div className="value">
                    <div>
                        <h1>Temperature</h1>
                        <h1 className="valu">{temperature} <TbTemperatureCelsius /></h1>
                    </div>
                </div>
                <div className="display">
                    <LiaTemperatureHighSolid />
                </div>
            </div>
        </>
    );
};

export default Temperature;

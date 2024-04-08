import React from 'react';
import { WiHumidity } from 'react-icons/wi';

const Humidity = ({ humidity }) => {
    // Hàm để tính toán màu gradient dựa trên độ ẩm
    const calculateGradientColor = (humidity) => {
        // Bạn có thể tùy chỉnh logic này dựa trên các khoảng độ ẩm của bạn
        const minHumidity = 60;
        const maxHumidity = 90;
        const normalizedHumidity = Math.min(
            Math.max(minHumidity, humidity),
            maxHumidity
        );

        // Chuyển đổi giá trị độ ẩm thành một giá trị từ 0 đến 1
        const percentage = (normalizedHumidity - minHumidity) / (maxHumidity - minHumidity);

        // Tạo một màu gradient từ xanh đậm đến xanh nhạt dựa trên giá trị độ ẩm
        const hue = 200 + percentage * 50; // Màu xanh đậm ở giá trị thấp, xanh nhạt ở giá trị cao
        return `linear-gradient(to top right, hsl(186, 100%, 50%), hsl(${hue}, 100%, 50%))`;
    };

    return (
        <>
            <div className="param humidity box" style={{ background: calculateGradientColor(humidity) }}>
                <div className="value">
                    <div>
                        <h1>Humidity</h1>
                        <h1 className="valu">{humidity}%</h1>
                    </div>
                </div>
                <div className="display">
                    <WiHumidity />
                </div>
            </div>
        </>
    );
};

export default Humidity;

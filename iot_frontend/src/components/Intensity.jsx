import { CiLight } from "react-icons/ci";
export default function Intensity({ intensity }) {
    const calculateGradientColor = (intensity) => {
        // Bạn có thể tùy chỉnh logic này dựa trên các khoảng độ ẩm của bạn
        const minHumidity = 500;
        const maxHumidity = 900;
        const normalizedHumidity = Math.min(
            Math.max(minHumidity, intensity),
            maxHumidity
        );

        // Chuyển đổi giá trị độ ẩm thành một giá trị từ 0 đến 1
        const percentage = (normalizedHumidity - minHumidity) / (maxHumidity - minHumidity);

        // Tạo một màu gradient từ xanh đậm đến xanh nhạt dựa trên giá trị độ ẩm
        const hue = 60 - percentage * 20; // Màu xanh đậm ở giá trị thấp, xanh nhạt ở giá trị cao
        return `linear-gradient(to top right, hsl(56, 100%, 99%), hsl(${hue}, 100%, 54%))`;
    };
    return (

        <>
            <div className="param intensity box " style={{ background: calculateGradientColor(intensity) }}>
                <div className="value">
                    <div>
                        <h1>Light</h1>
                        <h1 className="valu">{intensity} lux</h1>
                    </div>
                </div>
                <div className="display">
                    <CiLight />
                </div>
            </div>
        </>
    );
}

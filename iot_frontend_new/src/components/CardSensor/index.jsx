import React, { Fragment } from 'react'

const CardSensor = ({ heading, dataValue, icon, color1, color2 }) => {
    
    return (
      <Fragment>
        <div
          className="flex h-full w-full justify-evenly p-2 rounded-xl shadow-xl items-center"
          style={{
            backgroundImage: `linear-gradient(45deg, ${color1}, ${color2})`,
            borderRadius: "12px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <div>
            <h1 className="uppercase text-2xl font-bold">{heading}</h1>
                    <h2 className="uppercase text-2xl font-bold">{dataValue} </h2>
          </div>
          <div className="text-[80px]">{icon}</div>
        </div>
      </Fragment>
    );
};

export default CardSensor
import React from "react";
import "./FourColGrid.css";

const FourColGrid = ({ children, header, loading }) => {
  const renderElements = () => {
    const gridElements = children.map((element, i) => {
      return (
        <div key={i} className="rmdb-grid-element">
          {element}
        </div>
      );
    });
    return gridElements;
  };

  return (
    <div className="rmdb-grid">
      {header && !loading ? header : null}
      <div className="rmdb-grid-content">{renderElements()}</div>
    </div>
  );
};

export default FourColGrid;

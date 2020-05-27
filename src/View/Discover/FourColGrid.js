import React from "react";
import "./FourColGrid.css";

const FourColGrid = ({ children, header, loading }) => (
  <div className="md-grid">
    {header && !loading ? header : null}
    <div className="md-grid-content">
      {children.map((element, i) => (
        <div key={i} className="md-grid-element">
          {element}
        </div>
      ))}
    </div>
  </div>
);

export default FourColGrid;

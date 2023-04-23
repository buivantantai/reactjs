import React from "react";

export default function AnimeSynopsis({ animeLocal }) {
  return (
    <div
      style={{
        textAlign: "start",
        color: "white",
        marginLeft: "5px",
        marginRight: "5px",
      }}
    >
      <div className="synopsis-header inline">
        <h4>Synopsis</h4>
      </div>
      <div className="synopsis-content">
        <p style={{ color: "#7a8293" }}>
          {`
          ${animeLocal.data.synopsis}`}
        </p>
      </div>
      <div className="synopsis-header inline">
        <h4>Background</h4>
      </div>

      <div className="synopsis-content">
        <p style={{ color: "#7a8293" }}>{`${animeLocal.data.background}`}</p>
      </div>
      <div className="clear"></div>
    </div>
  );
}

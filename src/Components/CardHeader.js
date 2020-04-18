import React, { useEffect, useState } from "react";
import "./style.css";
class CardHeader extends React.Component {
    render() {
      const { image } = this.props;
      var style = {
        backgroundImage: "url(" + image + ")"
      };
      return (
        <header style={style} id={image} className="card-header">
          <h4 className="card-header--title">News</h4>
        </header>
      );
    }
  }
  export default CardHeader;
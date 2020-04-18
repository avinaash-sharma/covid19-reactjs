import React, { useEffect, useState } from "react";
import "./style.css";
import CardHeader from "./CardHeader";
 
  
  class CardBody extends React.Component {
    render() {
      return (
        <div className="card-body">
          <p className="date">March 20 2015</p>
  
          <h2>{this.props.title}</h2>
  
          
            
  
          
        </div>
      );
    }
  }
  
  export default class Card extends React.Component {
      

    render() {
       console.log(this.props.data);
      return (
        <article className="card">
          <CardHeader image={this.props.image}/>
          <CardBody title={this.props.title}/>
        </article>
      );
    }
  }
  
 
  
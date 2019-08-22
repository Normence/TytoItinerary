import React, { Component } from 'react';
import {Spinner} from "react-bootstrap";

const HoverHighlightList = ({ textList, onClick, selectedText }) => (
  <div>
    {!!textList && !!textList.length
      ?
      textList.map(text => (
        <div 
          className={`_hoverHighlightItem${text === selectedText ? ' _hoverHighlightItem-selected' : ''}`}
          onClick={() => onClick(text)} 
          key={text}
        >
          <span>{text}</span>
        </div>
      ))
      :
      <div style={{ margin: "auto", width: 50 }}>
        <Spinner animation="border" role="status" />
      </div>
    }
  </div>
)

export default HoverHighlightList;
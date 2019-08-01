import React, { Component } from 'react';
import {Spinner} from "react-bootstrap";

class HoverHighlightList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {!!this.props.textList
          ?
          this.props.textList.map(text => {
            return <div className="_hoverHighlightItem" onClick={() => this.props.onClick(text)}><span>{text}</span></div>
          })
          :
          <div style={{ margin: "auto" }}><Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></div>}
      </div>
    )
  }
}

export default HoverHighlightList;
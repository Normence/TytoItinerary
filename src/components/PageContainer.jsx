import React, { Component } from 'react';
import {Button} from "react-bootstrap";


// THIS IS ABANDONED


class PageContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="row justify-content-center">
        <div className={"col-12 col-sm-1 col-md-2 col-lg-3"}>
          <Button className="btn btn-primary btn-lg" onClick={() => this.props.goTo(this.props.prevPage)}>Back</Button>
        </div>
        <div className="col col-sm-10 col-md-8 col-lg-6">
          <h1>THIS IS ABANDONED</h1>
          {this.props.children}
        </div>
        <div className={"_spacer col-12 col-sm-1 col-md-2 col-lg-3"}></div>
      </div>
    )
  }
}

export default PageContainer;
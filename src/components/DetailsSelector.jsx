import React, { Component } from 'react';
import {Button, Form} from "react-bootstrap";

class DetailsSelector extends Component {

  handleChange(e) {
    const value = e.target.value;
    console.log(value);
  }

  render() {
    return(
      <div className="card _selector _detailsSelector">
        <div className="card-body">
          <h2 style={{"text-align":"center"}}>Enter Details</h2>
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Trip name..." onChange={this.handleChange.bind(this)} />
            </Form.Group>
          </Form>
        </div>
        <div className="card-footer">
          <Button>Back</Button>
        </div>
      </div>
    )
  }
}

export default DetailsSelector;
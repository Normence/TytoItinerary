import React, { Component } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Form, } from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

class GeoSelector extends Component {
  constructor(props) {
    super(props)
  }

  getTypeAhead(query) {

  }

  render() {
    return(
      <div>
        <div>Select Your Destination</div>
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Where to?" />
          </Form.Group>
        </Form>
        <HoverHighlightList>

        </HoverHighlightList>
      </div>
    )
  }
}

class HoverHighlightList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        {this.props.textList.map(text => {
          return <div><h1>{text}</h1></div>
        })}
      </div>
    )
  }
}

export default GeoSelector;
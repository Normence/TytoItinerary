import React, { Component } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Form, Spinner } from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Axios from 'axios'
import { GET_TYPEAHEAD_API} from "../helpers/APIs";

class GeoSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textList: [],
      nameToId: {}
    }
  }

  selectGeo(name) {
    const geoId = this.state.nameToId[name];
    console.log(`selected geo ${geoId}`);
  }

  handleChange(e) {
    this.getTypeAhead(e.target.value);
  }

  getTypeAhead(query) {
    this.setState({
      textList: null
    });

    Axios.get(`${GET_TYPEAHEAD_API}?query=${query}`)
      .then(result => {
        const tList = [];
        const nMap = {};
        result.data.forEach(obj => {
          const listMask = `${obj.name}, ${obj.parent}`;
          tList.push(listMask);
          nMap[listMask] = obj.id;
        });
        const fList = tList.slice(0, 5);
        this.setState({
          textList: fList,
          nameToId: nMap
        });
      })
      .catch(err => {
        console.error(`Error fetching typeahead for query ${query}:\n${err}`);
      });

  }

  render() {
    return(
      <div>
        <h2 style={{"text-align":"center"}}>Select Your Destination</h2>
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Where to?" onChange={this.handleChange.bind(this)} />
            {/*<FontAwesomeIcon icon={faSearch} />*/}
          </Form.Group>
        </Form>
        <HoverHighlightList textList={this.state.textList} onClick={this.selectGeo.bind(this)} />
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
        {!!this.props.textList
          ?
          this.props.textList.map(text => {
            return <div className="_hoverHighlightItem" onClick={() => this.props.onClick(text)}><h3>{text}</h3></div>
          })
          :
          <div style={{margin:"auto"}}><Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></div>}
      </div>
    )
  }
}

export default GeoSelector;
import React, { Component } from 'react'
import { Spinner, Image } from 'react-bootstrap'
import Axios from 'axios';
import { GET_ITEM_INFO_API } from '../helpers/APIs'
import { actionCreators } from '../store/itineraryGrid.js'
import store from '../store'

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {}
    };
  }

  componentDidMount() {
    // this.setState({
    //   info: this.props.info
    // })
    const requestBody = [ this.props.id ];
    Axios.post(GET_ITEM_INFO_API, requestBody)
      .then(result => {
        store.dispatch(actionCreators.mockDataItem(result.data[0]))
        this.setState({
          info: result.data[0]
        });
      })
      .catch(err => {
        console.error(`Error fetching info for ItemCard with id ${this.props.id}:\n${err}`);
        this.setState({
          error: true
        });
      });
  }

  render() {
    return(
      <div className='card App-search-card mb-3' key={this.props.id} >
        <div className='card-body'>
          {this.state.error || !this.state.info
            ?
            <div className='row'>
              <div className='col-12'>
                <h1>Error</h1>
              </div>
            </div>
            :
            <div className='row'>
              <div className='col-auto App-item-card-thumbnail'>
                {!!this.state.info.thumbnail
                  ?
                  <a href={`https://tripadvisor.com${this.state.info.link}`} target="_blank">
                    <Image
                      src={this.state.info.thumbnail.photoSizes[2].url}
                      style={{width:"100px",height:"100px"}}
                      thumbnail
                    />
                  </a>
                  :
                  <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
              </div>
              <div className='col'>
                {!!this.state.info.name
                  ?
                  <>
                    <div>
                      <a 
                        href={`https://tripadvisor.com${this.state.info.link}`} 
                        target="blank"
                        style={{ 'textDecoration': 'none', 'color': '#00A680' }}
                      >
                        <h3>{this.state.info.name}</h3>
                      </a>
                    </div>
                    <div>
                      {this.props.deriveMoreInfo ? this.props.deriveMoreInfo(this.state.info) : ""}
                    </div>
                  </>
                  :
                  <><Spinner animation="grow" variant="dark" /><div>Loading...</div></>}
              </div>
              {!!this.props.createActionItem ? <div className='col-auto'>{this.props.createActionItem(this.props.id)}</div> : <></>}
            </div>}
        </div>
      </div>
    )
  }
}

export default ItemCard;
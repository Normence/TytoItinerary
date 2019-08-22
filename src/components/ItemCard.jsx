import React, { Component } from 'react'
import { Spinner, Image } from 'react-bootstrap'

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {}
    };
  }

  componentDidMount() {
    this.setState({
      info: this.props.info
    })
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
                  <a href={`https://tripadvisor.com${this.state.info.link}`} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={this.state.info.thumbnail.photoSizes[2].url}
                      style={{width:"100px",height:"100px"}}
                      thumbnail
                    />
                  </a>
                  :
                  <div className='flex-center' style={{ width: 100, height: 100 }}>
                    <Spinner animation="border" role="status" />
                  </div>
                }
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
                  <><Spinner animation="grow" variant="dark" /><div>Loading...</div></>
                }
              </div>
              {
                !!this.props.createActionItem && <div className='col-auto'>{this.props.createActionItem(this.props.info)}</div>
              }
            </div>}
        </div>
      </div>
    )
  }
}

export default ItemCard;
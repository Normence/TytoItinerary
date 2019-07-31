import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'react-avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons'
import { actionCreators } from '../store/auth'
import { actionCreators as itineraryStore } from '../store/itineraryGrid'
import SearchModal from './SearchModal'
import EditItineraryModal from './EditItineraryModal'

class UserGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchModalShown: false,
            editItineraryModalShown: false,
        };
    }

    toggleSearchModal() {
        this.setState({
            searchModalShown: !this.searchModalShown
        });
    }

    toggleEditItineraryModal() {
        this.setState({
            editItineraryModalShown: !this.searchModalShown
        });
    }

    render() {
        const { users, editItinerary, addItem } = this.props;
        return (
          <>
              <SearchModal
                geoId={this.props.geoId}
                show={this.state.searchModalShown}
                onHide={() => this.setState({ searchModalShown: false })}
                onAdd={(id, startTime, endTime) => addItem(id, startTime, endTime)}
              />
              <EditItineraryModal
                show={this.state.editItineraryModalShown}
                onHide={() => this.setState({ editItineraryModalShown: false })}
                onSave={(name, startDate, endDate) => editItinerary(name, startDate, endDate)}
              />
              <div className='App-usergroup'>
                  <div>
                        {
                            users.map(user => <Avatar
                                key={user.photoUrl}
                                className='App-usergroup-avatar'
                                name={user.username}
                                src={user.photoUrl}
                                round
                                size={50} />)
                        }
                  </div>
                  <div className="btn-group">
                        <button 
                            type="button" 
                            className="btn btn-success App-usergroup-button Ta-style" 
                            onClick={this.toggleEditItineraryModal.bind(this)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-success App-usergroup-button Ta-style" 
                            onClick={this.toggleSearchModal.bind(this)}
                        >
                          <FontAwesomeIcon icon={faPlusCircle} />
                      </button>
                  </div>
              </div>
          </>
        )
    }
}


const mapStateToProps = (state) => {
    const { username, photoUrl, shared, deleteButtonChecked } = state.auth;
    const { geoId } = state.itinerary.data;

    return {
        users: [{
            username,
            photoUrl,
        }, ...shared],
        deleteButtonChecked,
        geoId,
    }
}

export default connect(
    mapStateToProps, 
    {...actionCreators, ...itineraryStore})(UserGroup)

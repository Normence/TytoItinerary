import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'react-avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { actionCreators } from '../store/auth';
import SearchModal from './SearchModal'

class UserGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchModalShown: false,
        };
    }

    toggleSearchModal() {
        this.setState({
            searchModalShown: !this.searchModalShown
        });
    }

    render() {
        const { users, deleteButtonChecked, toggleDeleteButton } = this.props;
        return (
          <>
              <SearchModal
                geoId={this.props.geoId}
                show={this.state.searchModalShown}
                onHide={() => this.setState({ searchModalShown: false })}
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
                  <div className="btn-group btn-group-toggle" data-toggle="buttons">
                      <button type="button" className="btn btn-success App-usergroup-button Ta-style" data-toggle="button" aria-pressed={deleteButtonChecked} autoComplete="off" onClick={toggleDeleteButton}>
                          <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button type="button" className="btn btn-success App-usergroup-button Ta-style" data-toggle="button" aria-pressed={this.state.searchModalShown} autoComplete="off" onClick={this.toggleSearchModal.bind(this)}>
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

export default connect(mapStateToProps, actionCreators)(UserGroup)

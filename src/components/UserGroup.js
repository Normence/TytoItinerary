import React from 'react'
import { connect } from 'react-redux'
import Avatar from 'react-avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { actionCreators } from '../store/auth';

const UserGroup = ({ users, deleteButtonChecked, toggleDeleteButton }) => {
    return (
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
                <button type="button" className="btn btn-success App-usergroup-button Ta-style">
                    <FontAwesomeIcon icon={faPlusCircle} />
                </button>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    const { username, photoUrl, shared, deleteButtonChecked } = state.auth

    return {
        users: [{
            username,
            photoUrl,
        }, ...shared],
        deleteButtonChecked,
    }
}

export default connect(mapStateToProps, actionCreators)(UserGroup)

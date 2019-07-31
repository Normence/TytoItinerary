import React from 'react'
import { connect } from 'react-redux'
import Avatar from 'react-avatar';

const UserGroup = ({ users }) => {
    return (
        <div className='App-usergroup'>
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
    )
}


const mapStateToProps = (state) => {
    const { username, photoUrl, shared } = state.auth

    return {
        users: [{
            username,
            photoUrl,
        }, ...shared]
    }
}

export default connect(mapStateToProps)(UserGroup)

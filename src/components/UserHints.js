import React from 'react'
import PropTypes from 'prop-types'
import UserList from './UserList'
import {FadingCircle} from 'better-react-spinkit'
import pure from 'recompose/pure'

const UserHints = ({waiting, foundUsers, onUserSelect}) => {
    let style = {
        position: 'absolute',
        margin: '0 15px',
        maxHeight: '350px',
        overflowX: 'hidden',
        overflowY: 'auto',
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#fff',
        border: '1px solid rgba(0,0,0,.15)',
        borderRadius: '4px',
        boxShadow: '0 6px 12px rgba(0,0,0,.175)'
    }

    let placeholder = <span>Users not found!</span>

    if (waiting || !foundUsers.length) {
        style = {
            ...style,
            minHeight: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    if (waiting) {
        foundUsers = []
        placeholder = <FadingCircle size={30}/>
    }

    return <UserList users={foundUsers} onUserClick={onUserSelect} style={style} placeholder={placeholder}/>
}

UserHints.propTypes = {
    waiting: PropTypes.bool,
}

export default pure(UserHints)
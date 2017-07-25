import React from 'react'
import PropTypes from 'prop-types'
import UserEntry from './UserEntry'
import {ListGroup} from 'react-bootstrap'

const UserList = ({ users, selected, onUserClick, onUserRemove, placeholder=null, ...props }) =>
    <ListGroup {...props}>
        {users.length ?
            users.map(user =>
                <UserEntry
                    key={user.login}
                    login={user.login}
                    name={user.name}
                    avatar_url={user.avatar_url}
                    stars={user.stars}
                    selected={selected === user.login}
                    onClick={ onUserClick ? () => onUserClick(user) : null }
                    onRemove={ onUserRemove ? () => onUserRemove(user) : null }/>)
            : placeholder
        }
    </ListGroup>

UserList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            login: PropTypes.string.isRequired,
            name: PropTypes.string,
            photoUrl: PropTypes.string,
            stars: PropTypes.number,
        }).isRequired
    ).isRequired,
    onUserClick: PropTypes.func.isRequired
}

export default UserList

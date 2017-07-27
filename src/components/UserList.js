import React from 'react'
import PropTypes from 'prop-types'
import UserEntry from './UserEntry'
import SummaryUserEntry from './SummaryUserEntry'
import {ListGroup} from 'react-bootstrap'
import {SUMMARY_USER} from '../constants'

const UserList = ({ users, selected, onUserClick, onUserRemove, onUserRefresh,
                      summary=false, placeholder=null, ...props }) =>
    <ListGroup {...props}>
        {summary && users.length > 1 &&
            <SummaryUserEntry
                selected={selected === SUMMARY_USER}
                onClick={ onUserClick ? () => onUserClick({login: SUMMARY_USER}) : null }
                onRefresh={ () => users.map(onUserRefresh) }
            />
        }
        {users.length ?
            users.map(user =>
                <UserEntry
                    key={user.login}
                    login={user.login}
                    name={user.name}
                    avatar_url={user.avatar_url}
                    selected={selected === user.login}
                    onClick={ onUserClick ? () => onUserClick(user) : null }
                    onRemove={ onUserRemove ? () => onUserRemove(user) : null }
                    onRefresh={ onUserRefresh ? () => onUserRefresh(user) : null }
                />
            )
            : placeholder
        }
    </ListGroup>

UserList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            login: PropTypes.string.isRequired,
            name: PropTypes.string,
            avatar_url: PropTypes.string,
            stars: PropTypes.number,
        }).isRequired
    ).isRequired,
    onUserClick: PropTypes.func.isRequired
}

export default UserList

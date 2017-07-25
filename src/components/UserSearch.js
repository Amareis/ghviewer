import React from 'react'
import {Glyphicon, FormGroup, FormControl, Dropdown} from 'react-bootstrap'
import PropTypes from 'prop-types'
import UserHints from './UserHints'

const UserSearch = ({value, pending=true, foundUsers, onTyping, onUserSelect}) =>
    <form onSubmit={e => {e.preventDefault();}}>
        <FormGroup>
            <FormControl
                type="text"
                placeholder="Enter user name or nickname"
                value={value}
                onChange={e => {e.preventDefault(); onTyping(e.target.value)}} />
            <FormControl.Feedback>
                <Glyphicon glyph="search"/>
            </FormControl.Feedback>
        </FormGroup>
        {value ?
            <UserHints
                foundUsers={foundUsers}
                onUserSelect={onUserSelect}
                waiting={pending}/>
            : null
        }
    </form>

UserSearch.propTypes = {
    value: PropTypes.string.isRequired,
    onTyping: PropTypes.func,
    onSubmit: PropTypes.func
}

export default UserSearch
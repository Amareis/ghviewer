import React from 'react'
import {Badge} from 'react-bootstrap'

const UserStars = ({ stars, ...props }) =>
    <Badge {...props}>{stars} stars</Badge>

export default UserStars

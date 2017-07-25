import React from 'react'
import PropTypes from 'prop-types'
import {ListGroupItem} from 'react-bootstrap'
import moment from 'moment'

let fmt = {
    sameDay: '[Today] HH:mm',
    lastDay: '[Yesterday] HH:mm',
    lastWeek: '[Last] dddd HH:mm',
    sameElse: 'DD.MM.YYYY HH:mm'
}

const CommitEntry = ({ hash, date, author, description }) =>
    <ListGroupItem header={`${hash.substring(0, 6)} - ${author} at ${moment(date).calendar(null, fmt)}`}>
        {description}
    </ListGroupItem>

CommitEntry.propTypes = {
    hash: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string,
    author: PropTypes.string.isRequired,
}

export default CommitEntry
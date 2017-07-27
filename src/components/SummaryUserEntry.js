import React from 'react'
import PropTypes from 'prop-types'
import {ListGroupItem, Badge, Col, Row} from 'react-bootstrap'
import SummaryUserStarsContainer from '../containers/SummaryUserStarsContainer'

const SummaryUserEntry = ({ selected, onClick }) =>
    <ListGroupItem onClick={onClick} active={selected}>
        <Col>
            <strong>All users</strong>
            <SummaryUserStarsContainer pullRight />
        </Col>
    </ListGroupItem>

SummaryUserEntry.defaultProps = {
    stars: -1
};

SummaryUserEntry.propTypes = {
    stars: PropTypes.number,
    onClick: PropTypes.func,
}

export default SummaryUserEntry
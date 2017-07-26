import React from 'react'
import PropTypes from 'prop-types'
import {ListGroupItem, Badge, Col, Row} from 'react-bootstrap'

const SummaryUserEntry = ({ stars, selected, onClick }) =>
    <ListGroupItem onClick={onClick} active={selected}>
        <Col>
            <strong>All users</strong>
            {stars > -1 &&
                <Badge className="align-middle" pullRight>{stars} stars</Badge>
            }
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
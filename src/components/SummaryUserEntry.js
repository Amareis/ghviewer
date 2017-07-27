import React from 'react'
import PropTypes from 'prop-types'
import {ListGroupItem, Col, Glyphicon} from 'react-bootstrap'
import SummaryUserStarsContainer from '../containers/SummaryUserStarsContainer'

const SummaryUserEntry = ({ selected, onClick, onRefresh }) =>
    <ListGroupItem onClick={onClick} active={selected}>
        <Col>
            <strong>All users</strong>
            <SummaryUserStarsContainer pullRight style={{marginRight: '10px'}}/>
        </Col>
        {onRefresh &&
            <Glyphicon
                onClick={(e) => {
                    e.stopPropagation();
                    onRefresh()
                }}
                glyph="refresh"
                style={{position: 'absolute', top: '3px', right: '3px'}}
            />
        }
    </ListGroupItem>

SummaryUserEntry.defaultProps = {
    stars: -1
};

SummaryUserEntry.propTypes = {
    stars: PropTypes.number,
    onClick: PropTypes.func,
}

export default SummaryUserEntry
import React from 'react'
import PropTypes from 'prop-types'
import {ListGroupItem, Badge, Image, Grid, Col, Row, Glyphicon} from 'react-bootstrap'

const RepoEntry = ({ name, description, selected, stars, onClick, onRefresh }) =>
    <ListGroupItem onClick={onClick} active={selected}>
        <Col xs={12}>
            <Row><strong>{name}</strong></Row>
            <Row>
                <small>{description}</small>
                {stars > -1 &&
                    <Badge className="align-middle" pullRight>{stars} stars</Badge>
                }
            </Row>
        </Col>
        { selected && onRefresh &&
            <Glyphicon
                onClick={(e) => {e.stopPropagation(); onRefresh()}}
                glyph="refresh"
                style={{position: 'absolute', top: '3px', right: '3px'}}
            />
        }
    </ListGroupItem>

RepoEntry.defaultProps = {
    stars: -1
};

RepoEntry.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    stars: PropTypes.number,
    onClick: PropTypes.func,
}

export default RepoEntry
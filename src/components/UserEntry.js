import React from 'react'
import PropTypes from 'prop-types'
import {ListGroupItem, Badge, Image, Grid, Col, Row, Glyphicon} from 'react-bootstrap'

const UserEntry = ({ login, name, avatar_url, stars, selected, onClick, onRemove}) =>
    <ListGroupItem onClick={onClick} active={selected}>
        <Col xs={3} style={{paddingLeft: "5px", paddingRight: "7px"}}>
            <Image responsive src={avatar_url || `https://github.com/identicons/${login}.png`}  />
        </Col>
        <Col xs={9}>
            <Row><strong>{name ? name : login}</strong></Row>
            <Row>
                <small>{name ? login : null}</small>
                {stars > -1 &&
                    <Badge className="align-middle" pullRight>{stars} stars</Badge>
                }
            </Row>
        </Col>
        {onRemove &&
            <Glyphicon
                onClick={e => {e.stopPropagation(); onRemove()}}
                glyph="remove"
                style={{position: 'absolute', top: '2px', right: '2px'}}/>
        }
    </ListGroupItem>

UserEntry.defaultProps = {
    stars: -1
};

UserEntry.propTypes = {
    login: PropTypes.string.isRequired,
    name: PropTypes.string,
    photoUrl: PropTypes.string,
    stars: PropTypes.number,
    onClick: PropTypes.func,
}

export default UserEntry
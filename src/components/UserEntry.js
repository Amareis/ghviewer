import React from 'react'
import PropTypes from 'prop-types'
import {ListGroupItem, Badge, Image, Col, Row, Glyphicon} from 'react-bootstrap'
import UserStarsContainer from '../containers/UserStarsContainer'

const UserEntry = ({ login, name, avatar_url, selected, onClick, onRefresh, onRemove}) =>
    <ListGroupItem onClick={onClick} active={selected}>
        <Col xs={3} style={{paddingLeft: "5px", paddingRight: "7px"}}>
            {avatar_url &&<Image responsive src={avatar_url}  />}
        </Col>
        <Col xs={9}>
            <Row><strong>{name ? name : login}</strong></Row>
            <Row>
                <small>{name ? login : null}</small>
                <UserStarsContainer userLogin={login} pullRight/>
            </Row>
        </Col>
        {onRemove &&
            <Glyphicon
                onClick={e => {e.stopPropagation(); onRemove()}}
                glyph="remove"
                style={{position: 'absolute', top: '3px', right: '3px'}}/>
        }
        { selected && onRefresh &&
        <Glyphicon
            onClick={(e) => {e.stopPropagation(); onRefresh()}}
            glyph="refresh"
            style={{position: 'absolute', top: '3px', right: '20px'}}
        />
        }
    </ListGroupItem>


UserEntry.propTypes = {
    login: PropTypes.string.isRequired,
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    onClick: PropTypes.func,
}

export default UserEntry
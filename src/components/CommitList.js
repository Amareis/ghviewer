import React from 'react'
import PropTypes from 'prop-types'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import CommitEntry from './CommitEntry'
import VisibilitySensor from 'react-visibility-sensor'

const CommitList = ({ commits, loadNextPage }) => {
    if (!commits.length)
        return null;

    return <ListGroup>
        {commits.map(commit =>
            <CommitEntry key={commit.hash} {...commit}/>
        )}

        {loadNextPage &&
            <VisibilitySensor scrollCheck={true} onChange={vis => vis && loadNextPage()}>
                <ListGroupItem onClick={loadNextPage}>
                    Load more commits...
                </ListGroupItem>
            </VisibilitySensor>
        }
    </ListGroup>
}

CommitList.defaultProps = {
    commits: []
};

CommitList.propTypes = {
    commits: PropTypes.arrayOf(
        PropTypes.shape({
            hash: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            description: PropTypes.string,
            author: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
}

export default CommitList

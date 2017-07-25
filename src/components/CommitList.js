import React from 'react'
import PropTypes from 'prop-types'
import {ListGroup} from 'react-bootstrap'
import CommitEntry from "./CommitEntry";

const CommitList = ({ commits }) => {
    if (!commits.length)
        return null;

    return <ListGroup>
        {commits.map(commit =>
            <CommitEntry key={commit.hash} {...commit}/>
        )}
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

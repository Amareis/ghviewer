import React from 'react'
import PropTypes from 'prop-types'
import RepoEntry from './RepoEntry'
import {ListGroup} from 'react-bootstrap'

const RepoList = ({ repos, selected, onRepoClick }) => {
    if (!repos.length)
        return null;

    return <ListGroup>
        {repos.map(repo =>
            <RepoEntry
                key={repo.name}
                name={repo.full_name}
                description={repo.description}
                selected={selected === repo.full_name}
                stars={repo.stargazers_count}
                onClick={ () => onRepoClick(repo) }/>
        )}
    </ListGroup>
}

RepoList.defaultProps = {
    repos: []
};

RepoList.propTypes = {
    repos: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            stars: PropTypes.number,
            onClick: PropTypes.func,
        }).isRequired
    ).isRequired,
    onRepoClick: PropTypes.func.isRequired
}

export default RepoList

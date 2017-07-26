import React from 'react'
import {Grid, Col, Row} from 'react-bootstrap'
import UserSearchContainer from '../containers/UserSearchContainer'
import UserList from './UserList'
import RepoList from './RepoList'
import CommitList from './CommitList'

const App = ({users, repos, commits, pages, onUserSelect, onUserRemove, onRepoSelect, loadMoreCommits}) =>
    <Grid>
        <Row style={{height: 20}}/>
        <Col sm={3}>
            <UserSearchContainer/>
            <UserList
                users={users.users}
                selected={users.selected}
                onUserClick={onUserSelect}
                onUserRemove={onUserRemove}
            />
        </Col>
        <Col sm={3}>
            <RepoList
                repos={repos.repos[users.selected]}
                selected={repos.selected}
                onRepoClick={(repo) => {
                    onRepoSelect(repo);
                    if (pages.commits[repo.full_name] === undefined)
                        loadMoreCommits(repo)}}
            />
        </Col>
        <Col sm={6}>
            <CommitList
                commits={commits[repos.selected]}
                loadNextPage={
                    pages.commits[repos.selected] ?
                        () => loadMoreCommits(
                            repos.repos[users.selected].find(repo => repo.full_name === repos.selected),
                            pages.commits[repos.selected])
                        : null
                }
            />
        </Col>
    </Grid>

export default App

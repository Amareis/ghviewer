import React from 'react'
import {Grid, Col, Row} from 'react-bootstrap'
import UserSearchContainer from '../containers/UserSearchContainer'
import UserList from './UserList'
import RepoList from './RepoList'
import CommitList from './CommitList'

const App = ({users, repos, commits, pages, selectUser, removeUser, selectRepo, loadMoreCommits, loadMoreRepos}) =>
    <Grid>
        <Row style={{height: 20}}/>
        <Col sm={3}>
            <UserSearchContainer/>
            <UserList
                users={users.users}
                selected={users.selected}
                onUserClick={(user) => {
                    selectUser(user)
                    if (pages.repos[user.login] === undefined)
                        loadMoreRepos(user)
                }}
                onUserRemove={removeUser}
            />
        </Col>
        <Col sm={3}>
            <RepoList
                repos={repos.repos[users.selected]}
                selected={repos.selected}
                onRepoClick={(repo) => {
                    selectRepo(repo);
                    if (pages.commits[repo.full_name] === undefined)
                        loadMoreCommits(repo)}
                }
                loadNextPage={
                    pages.repos[users.selected] ?
                        () => loadMoreRepos(
                            users.users.find(user => user.login === users.selected),
                            pages.repos[users.selected])
                        : null
                }
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

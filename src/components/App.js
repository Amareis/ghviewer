import React from 'react'
import {Grid, Col, Row} from 'react-bootstrap'
import UserSearchContainer from '../containers/UserSearchContainer'
import UserList from './UserList'
import RepoList from './RepoList'
import CommitList from './CommitList'
import {SUMMARY_USER} from "../constants/index";

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
                summary
            />
        </Col>
        <Col sm={3}>
            <RepoList
                repos={
                    users.selected === SUMMARY_USER ?
                        //соединяем все имеющиеся репы в один список и вообще это бы надо кешировать
                        Object.values(repos.repos).reduce((acc, el) => Array.concat(acc, el), [])
                        : repos.repos[users.selected]
                }
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

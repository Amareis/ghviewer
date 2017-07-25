import React from 'react'
import {Grid, Col, Row} from 'react-bootstrap'
import UserSearchContainer from '../containers/UserSearchContainer'
import UserList from './UserList'
import RepoList from './RepoList'
import CommitList from './CommitList'

const App = ({users, repos, commits, onUserSelect, onUserRemove, onRepoSelect}) =>
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
                onRepoClick={onRepoSelect}/>
        </Col>
        <Col sm={6}>
            <CommitList commits={commits[repos.selected]}/>
        </Col>
    </Grid>

export default App

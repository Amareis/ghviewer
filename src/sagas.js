import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import {QUERY_TYPED, USER_ADDED, REPO_SELECTED, MORE_COMMITS} from './constants'
import {successSearch, failRequest, updateUser, updateRepos, addCommits} from './actions'
import RestClient from 'another-rest-client'

var api = new RestClient('https://api.github.com');
api.res({
    users: 'repos',
    repos: 'commits',
    search: 'users'
});

let delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function* searchUsers(action) {
    if (!action.query)
        return
    try {
        yield call(delay, 500)
        let req = yield call(api.search.users.get, {q: action.query, per_page: 15})
        yield put(successSearch(req.items))
    } catch (e) {
        yield put(failRequest(e.message))
    }
}

function* getUserDetails(action) {
    try {
        let user = yield call(api.users(action.user.login).get)
        yield put(updateUser(user))
        let repos = yield call(api.users(action.user.login).repos.get)
        yield put(updateRepos(user, repos))
    } catch (e) {
        yield put(failRequest(e.message))
    }
}

function* getCommits(action) {
    try {
        let page = action.page || 1;
        let link = "";

        let commits = yield api.repos(action.repo.full_name).commits.get({per_page: 20, page: page}).
            on('success', x => link = x.getResponseHeader('Link'))

        let nextPage = link && link.includes('rel="next"') ? page + 1: null

        yield put(addCommits(action.repo, commits, nextPage))
    } catch (e) {
        yield put(failRequest(e.message))
    }
}


function* mySaga() {
    yield takeLatest(QUERY_TYPED, searchUsers)
    yield takeEvery(USER_ADDED, getUserDetails)
    yield takeEvery(MORE_COMMITS, getCommits)
}

export default mySaga
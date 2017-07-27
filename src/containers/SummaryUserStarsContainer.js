import React from 'react'
import { connect } from 'react-redux'
import UserStars from '../components/UserStars'
import {createSelector} from 'reselect';

const getCanComputeStars = (state) => Object.values(state.pages.repos).every(t => t === null)
const getAllRepos = (state) => Object.values(state.userRepos.repos).reduce((acc, arr) => acc.concat(arr), []) || []


export const getStars = createSelector(
    [ getCanComputeStars, getAllRepos ],
    (canComputeStars, allRepos) => {
        if (!canComputeStars)
            return null
        return allRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
    }
)

const mapStateToProps = (state, props) => ({
    stars: getStars(state, props)
})

const SummaryUserStarsContainer = connect(mapStateToProps)(
    ({stars, dispatch, ...props}) =>
        stars !== null ? <UserStars stars={stars} {...props}/> : null
)

export default SummaryUserStarsContainer
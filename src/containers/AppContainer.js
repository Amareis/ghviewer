import {connect} from 'react-redux'
import App from '../components/App'
import { bindActionCreators } from 'redux'
import {selectUser, removeUser, selectRepo, loadMoreCommits} from '../actions'

function mapStateToProps (state) {
    return {
        users: state.users,
        repos: state.userRepos,
        commits: state.repoCommits,
        search: state.search,
        pages: state.pages
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        onUserSelect: selectUser,
        onUserRemove: removeUser,
        onRepoSelect: selectRepo,
        loadMoreCommits: loadMoreCommits
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)

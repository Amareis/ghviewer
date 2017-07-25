import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserSearch from '../components/UserSearch'
import {handleSearch, addUser} from '../actions'

const mapStateToProps = state => ({
    value: state.search.query,
    foundUsers: state.search.found,
    pending: state.search.active
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({onTyping: handleSearch, onUserSelect: addUser}, dispatch)

const UserSearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserSearch)

export default UserSearchContainer
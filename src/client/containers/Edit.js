import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Edit from '../components/Edit';
import * as entityActions from '../actions/entity';

function mapStateToProps(state) {
    return {
        applicationDomain: state.applicationDomain,
        user: state.user,
        entity: state.entity
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(entityActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from '../components/Search';
import * as entityActions from '../actions/model';
import * as modalActions from '../actions/modal';

function mapStateToProps(state) {
    return {
        applicationDomain: state.applicationDomain,
        model: state.model,
        modal: state.modal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modelActions: bindActionCreators(entityActions, dispatch),
        modalActions: bindActionCreators(modalActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

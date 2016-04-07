import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from '../components/Search';
import * as entityActions from '../actions/model';
import * as modalActions from '../actions/modal';
import * as notificationActions from '../actions/notification';

function mapStateToProps(state) {
    return {
        applicationDomain: state.applicationDomain,
        model: state.model,
        modal: state.modal,
        notification: state.notification
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modelActions: bindActionCreators(entityActions, dispatch),
        modalActions: bindActionCreators(modalActions, dispatch),
        notificationActions: bindActionCreators(notificationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

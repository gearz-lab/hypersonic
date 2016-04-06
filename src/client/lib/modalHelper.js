import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {MODAL_TYPE_CONFIRMATION} from '../actions/modal';
import {MODAL_BUTTON_SET_YES_NO, MODAL_BUTTON_SET_OK_CANCEL} from '../../constants';

export default {

    buildModal: function (modal, index) {
        if (!modal) throw Error('\'modal\' should be truthy');
        switch (modal.modalType) {
            case MODAL_TYPE_CONFIRMATION:
                return this.buildConfirmationModal(modal, index);
            default:
                throw Error('Unsupported modal type');
        }
    },

    buildButtonSet: function (buttonSet, onSubmit, onCancel) {
        let buttonLabels = {};
        switch (buttonSet) {
            case MODAL_BUTTON_SET_YES_NO:
                buttonLabels = {
                    submit: 'Yes',
                    cancel: 'No'
                };
                break;
            case MODAL_BUTTON_SET_OK_CANCEL:
                buttonLabels = {
                    submit: 'Ok',
                    cancel: 'Cancel'
                };
                break;
            default:
                throw Error('Unsupported button set');
        }

        return <Modal.Footer>
            <Button bsStyle="primary" onClick={onSubmit}>{buttonLabels.submit}</Button>
            <Button onClick={onCancel}>{buttonLabels.cancel}</Button>
        </Modal.Footer>
    },

    buildConfirmationModal: function (modal, index) {
        return <div key={`modal-${index}`} className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>{modal.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modal.text}
                </Modal.Body>
                {
                    this.buildButtonSet(modal.buttonSet, modal.onSubmit, modal.onCancel)
                }
            </Modal.Dialog>
        </div>
    },

    buildModals(modals) {
        return <div> { modals.map(this.buildModal.bind(this)) }</div>;
    }
};
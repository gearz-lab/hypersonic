import React from 'react';
import TextBox from '../components/editors/TextBox';

// component definitions
import TextBoxDefinition from './componentDefinitions/TextBoxDefinition.js';

export default {
    getComponent: function(metadata) {
        return React.createElement(TextBox, {});
    }
}
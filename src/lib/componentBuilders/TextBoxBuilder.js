import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import ComponentBuilder from '../ComponentBuilder.js';

class TextBoxDefinition extends ComponentBuilder
{
    buildComponent(metadata) {
        return React.createElement(Input, {});
    }
}

export default TextBoxDefinition;
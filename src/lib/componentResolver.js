import React from 'react';
import TextBox from '../components/editors/TextBox';
import _ from 'underscore';

// component definitions
import TextBoxBuilder from './componentDefinitions/TextBoxBuilder.js';

class ComponentFactory {

    constructor() {
        // this is expected to contain a property for each supported type
        // and this property's value is expected to be an array of ComponentBuilder
        this.buildersByType = { }

        // this is expected to contain a property for each component definition
        // and the value is expected to be the component definition itself
        this.buildersById = { }

        // defaultBuilders is expected to contain a property for each supported type
        // and this property's value is expected to be the component definition id
        this.defaultBuilders = { }
    }

    /**
     * Validates the given metadata
     * @param metadata
     */
    _validateMetadata(metadata) {
        if(!metadata)
            throw "Metadata should not be null or undefined";
        if(!metadata.type)
            throw "Metadata should have a type";
    }

    /**
     * Registers a component definition
     * @param componentDefinition
     */

    registerBuilder(id, types, componentDefinition) {
        // registers the component definition in each given type
        for(var i = 0; i < types.length; i++)
        {
            const type = types[i];
            if(!this.buildersByType[type])
                this.buildersByType[type] = [];
            this.buildersByType[type].push({ id: id, componentDefinition: componentDefinition} );
        }
        // registers the component definition
        this.buildersById[id] = componentDefinition;
    }

    /**
     * Gets a componnent definition by id
     * @param The id the component definition was registered with
     */
    getBuilder(id) {
        var componentDefinition = this.buildersById[id];
        if(!componentDefinition) throw `Could not find the given component definition. Id: ${id}`;
        return this.buildersById[id];
    }

    /**
     * Returns the current component definitions.
     * If a type is specified, returns the definitions for that type only
     * @returns {{}|*}
     */
    getBuilders(type) {
        if(!type)
            return this.buildersByType;
        return this.buildersByType[type];
    }

    /**
     * Returns the default component definition for the given type
     * @param type
     */
    getDefaultBuilder(type) {
        if(!type) throw 'type should have a value';
        if(this.defaultBuilders[type])
            return this.getBuilder(this.defaultBuilders[type]);
        const componentsForType = this.getBuilders(type);
        const component = _.first(componentsForType);
        if(!component)
            throw `Coundn\'t find any component for the given type. Type: ${type}`;
        return component;
    }

    /**
     * Sets the default component per type.
     * @param defaultDefinitions - An object that should contain a type as a key and a ComponentBuilder as value
     */
    setDefaultBuilders(defaultDefinitions) {
        this.defaultBuilders = defaultDefinitions;
    }



    /**
     * Gets the appropriate component based on the given metadata
     * @param metadata
     * @returns {*}
     */
    buildComponent(metadata) {
        this._validateMetadata(metadata);
        var componentDefinition;
        if(metadata.component) {
            // if the metadata explicitly specify a component, let's use it
            componentDefinition = this.buildersById[metadata.component];
            if(!componentDefinition)
                throw `Coundn\'t find component. Component id: ${metadata.component}`;
        }
        else
        {
            // If the metadata doesn't explicitly specify a component, let's return
            // the default component for type. If there's no default, let's take the first
            // that matches the type
            componentDefinition = this.getDefaultBuilder(metadata.type);
        }
        return componentDefinition.buildComponent(metadata);
    }
}

var componentFactory = new ComponentFactory();

// Registers all component definitions
componentFactory.registerBuilder('textbox', ['string'], new TextBoxBuilder());

// Registers the component defaults
componentFactory.setDefaultBuilders({
    "string": 'textbox'
});

export default componentFactory;
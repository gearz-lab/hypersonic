import _ from 'underscore';

export default {
    /**
     * Merges actions from the entity with the layout
     * @param entity
     * @param layout
     */
    getActions: function(entity, layout) {
        if (!entity) throw Error('\'entity\' should be truthy');
        if(!layout || !layout.clientActions)
            return entity.clientActions || [];
        if(!entity.clientActions)
            return layout.clientActions;
        return layout.clientActions.map(lca => {
            let eca = _.find(entity.clientActions, eca => eca.name == lca.name);
            if(!eca) return lca;
            return Object.assign(eca, lca);
        });
    },

    /**
     * Invokes a client action
     * @param clientAction
     * @param selection
     * @param host
     */
    invoke(clientAction, selection, context) {
        if (!clientAction) throw Error('\'clientAction\' should be truthy');
        if (!selection) throw Error('\'selection\' should be truthy');
        if (!context) throw Error('\'context\' should be truthy');
        if(!clientAction.invoke) throw Error('clientAction should have an invoke method');

        clientAction.invoke(_.keys(selection).map(i => Number(i)), context);
    }
}
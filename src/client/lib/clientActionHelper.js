import _ from 'underscore';


export default {

    /**
     * Returns the system actions
     */
    getSystemActions: function () {

        let getItemsText = (count) => {
            return count == 1 ? `${count} item` : `${count} items`;
        };

        return [
            {
                name: 'new',
                displayName: 'New',
                icon: 'plus',
                entitySpecific: false
            },
            {
                name: 'edit',
                displayName: 'Edit',
                icon: 'pencil',
                allowMultiple: false
            },
            {
                name: 'delete',
                displayName: 'Delete',
                icon: 'trash',
                invoke: (s, c) => {
                    c.modalActions.enqueueConfirmation(
                        'Delete?',
                        `Are you sure you want to delete the selected ${ getItemsText(s.length)}? This operation cannot be reverted.`,
                        () => {
                            c.modelActions.deleteEntities(c.entityName, s, () => {
                                c.modalActions.dequeue();
                                c.notificationActions.enqueue({
                                    message: `${ getItemsText(s.length)} deleted successfully`,
                                    level: 'success'
                                });
                                c.modelActions.searchEntities(c.entityName, c.model.data.lastCriteria, c.model.data.page, {});
                            });
                        },
                        () => {
                            c.modalActions.dequeue();
                        }
                    );
                }
            }
        ]
    },

    /**
     * Merges actions from the entity with the layout
     * @param entity
     * @param layout
     */
    getEntitySpecificActions: function (entity, layout) {
        if (!entity) throw Error('\'entity\' should be truthy');
        if (!layout || !layout.clientActions)
            return entity.clientActions || [];
        if (!entity.clientActions)
            return layout.clientActions;

        let clientActions = layout.clientActions.map(lca => {
            let eca = _.find(entity.clientActions, eca => eca.name == lca.name);
            if (!eca) return lca;
            return Object.assign(eca, lca);
        });

        return _.uniq(_.union(clientActions, this.getSystemActions()), false, (item, key, a) => item.name);
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
        if (!clientAction.invoke) throw Error('clientAction should have an invoke method');

        // validate state
        if (!context.model) throw Error('\'context.model\' should be truthy');
        if (!context.modal) throw Error('\'context.modal\' should be truthy');
        if (!context.applicationDomain) throw Error('\'context.applicationDomain\' should be truthy');
        // validate actions
        if (!context.modelActions) throw Error('\'context.modelActions\' should be truthy');
        if (!context.modalActions) throw Error('\'context.modalActions\' should be truthy');
        if (!context.notificationActions) throw Error('\'context.notificationActions\' should be truthy');

        if (!context.entityName) throw Error('\'context.entityName\' should be truthy');

        clientAction.invoke(_.keys(selection).map(i => Number(i)), context);
    }
}
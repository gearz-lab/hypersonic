import _ from 'underscore';

export default {

    /**
     * Default handler for saving
     * @param object
     * @param layoutName
     * @param context
     * @returns {*}
     */
    save: function (object, layoutName, context) {
        if (!object) throw Error('\'object\' should be truthy');
        return context.dataContext.db[context.entity.name].saveAsync(object);
    },

    /**
     * Default hadler for loading
     * @param criteria
     * @param layoutName
     * @param context
     * @returns {*}
     */
    load: function (criteria, layoutName, context) {
        if (!criteria) throw Error('\'id\' should be truthy');
        return context.dataContext.db[context.entity.name].findOneAsync(criteria);
    },

    /**
     * Default handler for deleting
     * @param ids
     * @param layoutName
     * @param context
     * @returns {*}
     */
    delete: function (ids, layoutName, context) {
        if (!ids) throw Error('\'ids\' should be truthy');
        if (_.isArray(ids)) {
            let promises = ids.map(id => context.dataContext.db[context.entity.name].destroyAsync({ id }));
            return Promise.all(promises);
        }
        else
            return context.dataContext.db[context.entity.name].destroyAsync({ id: ids });
    },

    /**
     * Default handler for searching
     * @param criteria
     * @param page
     * @param layoutName
     * @param context
     * @returns {*}
     */
    search: function (criteria, page, layoutName, context) {
        if (!page) throw Error('\'page\' should be truthy');

        let quickSearchFields = context.entity.quickSearchFields;
        if (!quickSearchFields) {
            let stringFields = _.filter(context.entity.fields, f => f.type == 'string');
            stringFields = _.first(stringFields, 3);
            quickSearchFields = _.map(stringFields, f => f.name);
        }
        if (!quickSearchFields.length) throw Error(`Could not determine the quick search criteria for entity. Entity: ${context.entity.name}`);

        let queryFilter = {};
        if (criteria) {
            if (quickSearchFields.length == 1) {
                queryFilter[`${field} like`] = `%${criteria}%`;
            }
            else {
                queryFilter = {
                    or: _.map(quickSearchFields, field => {
                        let innerQueryFilter = {};
                        innerQueryFilter[`${field} like`] = `${criteria}%`;
                        return innerQueryFilter;
                    })
                }
            }
        }
        return context.repository.helpers.paginate(queryFilter, page);
    }
};
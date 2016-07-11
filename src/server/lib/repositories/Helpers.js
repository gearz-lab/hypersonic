
export default class Helpers {
    constructor(context) {
        if (!context) throw Error('\'context\' should be truthy');
        this.context = context;
    }

    paginate(where, page) {
        if (!where) throw Error('\'whereFunction\' should be truthy');
        if (!page) throw Error('\'page\' should be truthy');
        if (!this.context.appConfig.data || !this.context.appConfig.data) throw Error('The supplied appConfig object does not have a page size configuration');

        let queryOptions = {
            limit: this.context.appConfig.data.pageSize,
            offset: (page - 1) * this.context.appConfig.data.pageSize
        };

        let tableName = this.context.entity.tableName || this.context.entity.name;

        return Promise.all([
            this.context.dataContext.db[tableName].countAsync(where),
            this.context.dataContext.db[tableName].findAsync(where, queryOptions)
        ])
            .then(([count, rows]) => {
                let pages = Math.ceil(count / this.context.appConfig.data.pageSize);
                return { count, pages, rows };
            });
    }
}
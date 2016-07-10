import _ from 'underscore';

/**
 * Runs asynchronous pipelines
 */
export default {

    /**
     * Runs the given pipeline
     * @param {any} pipeline
     * @param {any} data
     * @param {any} context
     * @param {any} callback
     */
    run: function(pipeline, data, context , callback) {
        if(!pipeline) throw Error('Argument \'pipeline\' should be truthy');
        if(!data) throw Error('Argument \'data\' should be truthy');
        if(!context) throw Error('Argument \'context\' should be truthy');
        if(!callback) throw Error('Argument \'callback\' should be truthy');
        if(!(pipeline instanceof Array)) throw Error ('Argument \'pipeline\' should be an Array')
        
        let index = 0;
        let errors = [];

        /**
         * Merges errors
         * @param {any} error
         */
        let mergeErrors = (error) => {
            if (error) {
                if(_.isArray(error))
                    errors = errors.concat(error);
                else
                    errors.push(error);
            }
        }

        let mergeData = (newData) => {
            if (newData) {
                data = Object.assign(data, newData);
            }
        }

        /**
         * Finishes the pipeline
         * @param {any} error
         */
        let finish = (error) => {
            mergeErrors(error);
            callback(errors, data);
        };

        /**
         * The middleware next function
         * @param {any} error
         * @param {any} result
         */
        let next = (error, newData) => {
            mergeErrors(error);
            mergeData(newData);
            let nextIndex = index++;
            if (nextIndex < pipeline.length) {
                pipeline[nextIndex](errors, data, next, finish, context);
            }
            else {
                finish();
            }
        };

        pipeline[index++](errors, data, next, finish, context);
    }
}
/* @flow */
class ObjectHelper {

    /**
     * Evaluates the given expression for the given object. Returns the given defaultValue if there's an error
     * @param expression
     * @param object
     * @param defaultValue
     * @returns {*}
     */
    safeRead(expression: (m: any) => any, object: any, defaultValue: any): any {
        try {
            return expression(object);
        }
        catch(ex) {
            return defaultValue;
        }
    }
}

export default new ObjectHelper();
class DataEvaluator {
    evaluate(metadata, model) {
        if(!model) {
            return undefined;
        }
        if(model.hasOwnProperty(metadata.name)) {
            return model[metadata.name];
        }
        throw new Error(`Object should contain property. Property: ${metadata.name}`);
    }
}

export default new DataEvaluator();
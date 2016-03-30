var defaultAppConfig = {
    data: {
        pageSize: 10
    }
};

/**
 * Sets up the given appConfig to contain the default configurations
 */
export default function setupDefaults(appConfig) {
    if (!appConfig) throw Error('\'appConfig\' should be truthy');
    return Object.assign(defaultAppConfig, appConfig);
}
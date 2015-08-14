import httpApi from './HttpApi.js';

class MainMenuClientApi {

    load(next) {
        httpApi.get('/api/mainmenu/load', null, (response) => {
            next(null, response.data);
        })
    }
}

export default new MainMenuClientApi();
import httpApi from './HttpApi.js';

class MainMenuApi {

    load(next) {
        httpApi.get('/api/mainmenu/load', null, (response) => {
            next(null, response.data);
        })
    }
}

export default new MainMenuApi();
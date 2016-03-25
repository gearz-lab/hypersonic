import request from 'axios';

class MainMenuClientApi {

    load(next) {
        request.get(`/api/mainmenu/load`)
            .then(r => next(null, r.data))
            .catch(ex => next(ex));
    }
}

export default new MainMenuClientApi();
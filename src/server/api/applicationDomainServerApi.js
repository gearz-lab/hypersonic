export default {
    setup(router) {

        // routes
        router.route('/applicationdomain/load').get(function(req, res) {


            res.send(schema);
        });
    }
}
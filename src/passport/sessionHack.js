// this middleware solves the Express 4 + Passport.js bug.
// It will grab the user from req.session.userId and deserialize it and store on req.user
export default passport => {
    return (req, res, next) => {
        if(!req.session) {
            throw new Erro('You should call this hack when the session is already defined');
        }
        if(req.session.userId && passport._deserializers && passport._deserializers.length > 0) {
            let deserialize = passport._deserializers[0];
            console.log(deserialize.toString());
            deserialize(req.session.userId, (error, user) => {
                if(!error) {
                    req.user = user;
                    console.log(`user after the hack: ${user}`);
                    console.log(`the hack has worked. User: ${req.session.userId}. req.user: ${req.user}`);
                    next();
                } else {
                    next(error);
                }
            });
        }
        else {
            next();
        }
    };
}
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var usersDal = require('../lib/dal/users');
var rh = require('../lib/rethinkDb/rethinkHelpers');

class GoogleStrategyDal {

    /**
     * Creates a user based on the given Google profile
     * @param profile
     */
    create(profile) {

    }

    /**
     * Finds or creates a user based on the given Google profile
     * @param profile
     */
    findOrCreateUser(profile, next) {
        rh.connect((error, connection) => {
            let existingGoogleUser = usersDal.filter({googleId: profile.id}, (error, result) => {
                if(error) {
                    next(error);
                }
                if(result.length) {
                    // in this case, the user with such googleId does not exist
                    // let's try to find the user by the e-mail
                    usersDal.filter({email: profile.emails[0]}, (error, result) => {
                        if(error) {
                            next(error);
                        }
                        if(result.length) {
                            // we found the user by e-mail. We now need to associate this user with the Google Profile
                        }
                        // we did not find the user. We have to create it now
                    });
                }
                else {
                    // in this case, the user with such googleId exists
                    next(null, result[0]);
                }
            })
        });
    }
}

export default new GoogleStrategyDal();
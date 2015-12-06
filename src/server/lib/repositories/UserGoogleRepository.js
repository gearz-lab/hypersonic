import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../database/constants.js';
import objectHelper from '../../../common/lib/helpers/objectHelper.js';
import UserDal from './UserRepository.js';

class UserGoogleRepository extends UserDal {

    constructor(options) {
        super(options);
    }

    /**
     * Creates a user from the given Google Profile
     * @param connection
     * @param profile
     * @param next
     */
    createFromGoogleProfile(connection, profile, next) {
        let user = {
            displayName: profile.displayName,
            photo: objectHelper.safeRead((p) => p.photos[0].value, profile, null),
            email: objectHelper.safeRead((p) => p.emails[0].value, profile, null),
            externalProfiles: {
                google: {
                    id: profile.id,
                    raw: profile
                }
            }
        };
        this.upsert(connection, user, next);
    }

    /**
     * Updates the given user based on the given profile
     * @param connection
     * @param existingUser
     * @param profile
     * @param next
     */
    updateFromGoogleProfile(connection, existingUser, profile, next ) {
        if(!existingUser.displayName) {
            existingUser.displayName = profile.displayName;
        }
        if(!existingUser.photo) {
            existingUser.photo = objectHelper.safeRead((p) => p.photos[0].value, profile, null);
        }
        if(!existingUser.externalProfiles) {
            existingUser.externalProfiles = {};
        }
        existingUser.externalProfiles.google = {
            id: profile.id,
            raw: profile
        };
        this.upsert(connection, existingUser, next);
    }

    /**
     * Finds or creates a user from the given Google profile.
     * If a user with the same e-mail exists but it is not associated with
     * Google. The user will be updated
     * @param connection
     * @param profile
     * @param next
     */
    findOrCreateFromGoogleProfile(connection, profile, next) {
        let email = objectHelper.safeRead((p) => p.emails[0].value, profile, null);
        if(!email) {
            throw Error('Google profile is not valid');
        }
        this.findByEmail(connection, email, (error, user) => {
            // here we better throw instead of passing the error along
            if( error){
                throw error;
            }
            if(user) {
                // the user already exists
                let existingUserGoogleId = objectHelper.safeRead((u) => u.externalProfiles.google.id, user, null);
                if(existingUserGoogleId) {
                    // the user exists and is already associated with Google
                    next(null, user);
                } else {
                    // the user exists but is not associated with Google already
                    this.updateFromGoogleProfile(connection, user, profile, (error) => {
                        if(error) {
                            next(error);
                        }
                        else {
                            next(null, user);
                        }
                    })
                }
            }
            else {
                // the user does not exist
                this.createFromGoogleProfile(connection, profile, (error) => {
                    if(error) {
                        next(error);
                    }
                    else {
                        this.findByEmail(connection, email, next);
                    }
                });
            }
        });
    }
}

export default UserGoogleRepository;
import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../rethinkDb/rethinkConstants.js';
import objectHelper from '../helpers/objectHelper.js';
import UserDal from './UserDal.js';

class UserGoogleDal extends UserDal {

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
    updateUserFromGoogleProfile(connection, existingUser, profile, next ) {
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
            throw new Error('Google profile is not valid');
        }
        this.findByEmail(connection, email, (error, result) => {
            if(error) {
                next(error);
            }
            if(result.length) {
                // the user already exists
                let existingUser = result[0];
                let existingUserGoogleId = objectHelper.safeRead((u) => u.externalProfiles.google.id, existingUser, null);
                if(existingUserGoogleId) {
                    // the user exists and is already associated with Google
                    next(null, existingUser);
                } else {
                    // the user exists but is not associated with Google already
                    this.updateUserFromGoogleProfile(connection, existingUser, profile, (error) => {
                        if(error) {
                            next(error);
                        }
                        else {
                            next(null, existingUser);
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

export default UserGoogleDal;
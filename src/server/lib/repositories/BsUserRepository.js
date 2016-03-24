import Repository from './BsRepository';
import objectHelper from '../../../common/lib/helpers/objectHelper.js';

class UserRepository extends Repository {

    constructor(db) {
        super(db, 'user');
    }

    /**
     * Creates a user object from an OAuth Google profile
     * @param profile
     * @returns Promise
     */
    createFromGoogleProfile(profile) {
        if (!profile) throw Error('\'profile\' should be truthy');
        let user = {
            displayName: profile.displayName,
            photo: objectHelper.safeRead((p) => p.photos[0].value, profile, null),
            email: objectHelper.safeRead((p) => p.emails[0].value, profile, null),
            oauthProfiles: {
                google: {
                    id: profile.id,
                    raw: profile
                }
            }
        };
        return this.insert(profile);
    }

    /**
     * Updates a user object based on the given google profile
     * @param existingUser
     * @param profile
     */
    updateFromGoogleProfile(existingUser, profile) {
        if (!existingUser) throw Error('\'existingUser\' should be truthy');
        if (!profile) throw Error('\'profile\' should be truthy');

        if (!existingUser.displayName) {
            existingUser.displayName = profile.displayName;
        }
        if (!existingUser.photo) {
            existingUser.photo = objectHelper.safeRead((p) => p.photos[0].value, profile, null);
        }
        if (!existingUser.externalProfiles) {
            existingUser.externalProfiles = {};
        }
        existingUser.oauthProfiles.google = {
            id: profile.id,
            raw: profile
        };
        return this.update(existingUser);
    }

    findOrCreateFromGoogleProfile(profile) {
        if (!profile) throw Error('\'profile\' should be truthy');
        let email = objectHelper.safeRead((p) => p.emails[0].value, profile, null);
        if (!email)
            throw Error('Google profile is not valid');

        return new Promise((fulfill, reject) => {
            this.filter({email: email})
                .then((user) => {

                    if (user) {
                        let existingUserGoogleId = objectHelper.safeRead((u) => u.externalProfiles.google.id, user, null);
                        if (existingUserGoogleId) {
                            fulfill(user);
                        }
                        else {
                            this.updateFromGoogleProfile(user, profile)
                                .then((user) => {
                                    fulfill(user);
                                })
                                .catch((ex) => {
                                    reject(ex);
                                })
                        }
                    }
                    else {
                        this.createFromGoogleProfile(profile)
                            .then((user) => {
                                fulfill(user);
                            })
                            .catch((ex) => {
                                reject(ex);
                            });
                    }
                })
                .catch((ex) => {
                    reject(ex);
                });
        });
    }
}

export default UserRepository;
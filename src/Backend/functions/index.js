const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

db.settings({ timestampsInSnapshots: true });


function getUser(userToken) {
    // [START get_document]
    let userRef = db.collection('user_auth').doc(userToken);
    let getDoc = userRef
        .get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
                return 0;
            } else {
                console.log('Document  data get');
                return doc.data();
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
    // [END get_document]
    return getDoc;
}
async function getDocByKeyValue(collection, key, value) {
    let data = [];
    let querySnapshot = await db.collection(collection).where(key, "==", value).get();
    await querySnapshot.forEach(function (doc) {
        // console.log('doc id=>',doc.id)
        data.push(doc.data());
    });
    return data;
}
function getUser(userToken) {
    // [START get_document]
    let userRef = db.collection('user_auth').doc(userToken);
    let getDoc = userRef
        .get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
                return 0;
            } else {
                console.log('Document  data get');
                return doc.data();
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
    // [END get_document]
    return getDoc;
}
exports.sendRequestNotification = functions.firestore
    .document('user_requests/{id}')
    .onUpdate(async (change, context) => {
        let changeAfterData = change.after.data();
        let changeBeforeData = change.before.data();

        console.log("change " + JSON.stringify(changeAfterData))
        if (changeAfterData.status && changeAfterData.applicantFlag == changeBeforeData.applicantFlag && changeAfterData.readFlag == changeBeforeData.readFlag) {
            await getDocByKeyValue('user_auth', 'userId', changeAfterData.applicantId).then(async (item) => {
                console.log("item data " + JSON.stringify(item))
                if (item[0].fcmToken) {
                    const payload = {
                        notification: {
                            title: 'Post Request',
                            body: `${changeAfterData.teamName}  ${changeAfterData.status} your request for the post ${changeAfterData.vacancyName}`,
                        },
                    };
                    console.log(item[0].fcmToken)
                    admin.messaging().sendToDevice(item[0].fcmToken, payload).then(reponse => {
                        return console.log('Send Message Notification for new post ' + JSON.stringify(reponse));
                    });
                }

            })
        }
        else if (!changeAfterData.readFlag && changeAfterData.readFlag == changeBeforeData.readFlag && changeAfterData.applicantFlag == changeBeforeData.applicantFlag) {
            await getDocByKeyValue('user_auth', 'userId', changeAfterData.teamId).then(async (item) => {
                //  console.log(JSON.stringify(item))
                if (item[0].fcmToken) {
                    const payload = {
                        notification: {
                            title: 'Post Request',
                            body: `${changeAfterData.applicantName} request on your post ${changeAfterData.vacancyName}`,
                        },
                    };
                    admin.messaging().sendToDevice(item[0].fcmToken, payload).then(reponse => {
                        // return console.log('Send Message Notification for new post ' + reponse);
                    });
                }

            })
        }

    });
exports.sendMessageNotification = functions.firestore
    .document('chats/{id}')
    .onWrite(async (change, context) => {
        let after = change.after.data()
        let before = change.before.data()

        let id = context.params.id

        await getUser(id).then(async user => {
            if (user.fcmToken) {
                const payload = {
                    notification: {
                        title: 'Message',
                        body: `New Message Received..`,
                    },
                };
                admin
                    .messaging()
                    .sendToDevice(user.fcmToken, payload)
                    .then(reponse => {
                        return console.log('Send Message Notification ' + user.fcmToken);
                    });
            }
        });
    });

exports.sendfavPostDeleteNotification = functions.firestore
    .document('team_posts/{id}')
    .onWrite(async (change, context) => {

        let after = change.after.data()
        let before = change.before.data()

        console.log("asasas " + JSON.stringify(before.fArray))


        if (before.fArray === after.fArray) {
            console.log("asasassds " + JSON.stringify(before.fArray))
            before.fArray.forEach(async element => {
                // let senderData = await getUser(element.id);
                console.log("Get data " + element)
                await getDocByKeyValue('user_auth', 'userId', element.id).then(async (item) => {
                    console.log("item data " + JSON.stringify(item))
                    if (item[0].fcmToken) {
                        console.log("FCM  " + item[0].fcmToken)
                        const payload = {
                            notification: {
                                title: 'Post Deleted',
                                body: `${before.organizedby} deleted the Post ${before.title}`,
                            },
                        };
                        console.log(item[0].fcmToken)
                        admin.messaging().sendToDevice(item[0].fcmToken, payload).then(reponse => {
                            return console.log('Send Message Notification for new post ' + JSON.stringify(reponse));
                        });
                    }
                })
            });
        }
    });
exports.sendfavPlayerDeleteNotification = functions.firestore
    .document('player_posts/{id}')
    .onWrite(async (change, context) => {

        let after = change.after.data()
        let before = change.before.data()

        console.log("asasas " + JSON.stringify(before.fArray))
        if (before.fArray === after.fArray) {
            console.log("asasassds " + JSON.stringify(before.fArray))
            before.fArray.forEach(async element => {
                // let senderData = await getUser(element.id);
                console.log("Get data " + element)
                await getDocByKeyValue('user_auth', 'userId', element.id).then(async (item) => {
                    console.log("item data " + JSON.stringify(item))
                    if (item[0].fcmToken) {
                        console.log("FCM  " + item[0].fcmToken)
                        const payload = {
                            notification: {
                                title: 'Post Deleted',
                                body: `${before.organizedby} deleted the Post ${before.title}`,
                            },
                        };
                        console.log(item[0].fcmToken)
                        admin.messaging().sendToDevice(item[0].fcmToken, payload).then(reponse => {
                            return console.log('Send Message Notification for new post ' + JSON.stringify(reponse));
                        });
                    }

                })

            });

        }




    });

exports.sendfavplayerNotification = functions.firestore
    .document('player_posts/{id}')
    .onWrite(async (change, context) => {

        let after = change.after.data()
        let before = change.before.data()

        console.log("asasas " + JSON.stringify(after.fArray))
        if (before.fArray.length < after.fArray.length) {
            console.log("asasassds " + JSON.stringify(after.userId))

            await getDocByKeyValue('user_auth', 'userId', after.userId).then(async (item) => {
                console.log("item data " + JSON.stringify(item))
                if (item[0].fcmToken) {
                    console.log("FCM  " + item[0].fcmToken)
                    const payload = {
                        notification: {
                            title: 'Post like',
                            body: `Your Post got new like.`,
                        },
                    };
                    console.log(item[0].fcmToken)
                    admin.messaging().sendToDevice(item[0].fcmToken, payload).then(reponse => {
                        return console.log('Send Message Notification for new post ' + JSON.stringify(reponse));
                    });
                }

            })



        }




    });
exports.sendfavteamNotification = functions.firestore
    .document('team_posts/{id}')
    .onWrite(async (change, context) => {

        let after = change.after.data()
        let before = change.before.data()

        console.log("asasas " + JSON.stringify(after.fArray))
        if (before.fArray.length < after.fArray.length) {
            console.log("asasassds " + JSON.stringify(after.userId))

            await getDocByKeyValue('user_auth', 'userId', after.userId).then(async (item) => {
                console.log("item data " + JSON.stringify(item))
                if (item[0].fcmToken) {
                    console.log("FCM  " + item[0].fcmToken)
                    const payload = {
                        notification: {
                            title: 'Post like',
                            body: `Your Post got new like.`,
                        },
                    };
                    console.log(item[0].fcmToken)
                    admin.messaging().sendToDevice(item[0].fcmToken, payload).then(reponse => {
                        return console.log('Send Message Notification for new post ' + JSON.stringify(reponse));
                    });
                }

            })



        }



    });


exports.sendfavPlayerNotification = functions.firestore
    .document('user_auth/{id}')
    .onWrite(async (change, context) => {
        let after = change.after.data()
        let before = change.before.data()
        console.log("asasas " + JSON.stringify(before.fArray))
        if (before.fArray < after.fArray) {
            after.fArray.forEach(async element => {
                // let senderData = await getUser(element.id);
                let newid = before.fArray.filter((i) => i != element)
                console.log("Get data0 " + newid[0])
                if (newid.length > 0) {
                    await getDocByKeyValue('user_auth', 'userId', newid[0]).then(async (item) => {
                        console.log("item data " + JSON.stringify(item))
                        if (item[0].fcmToken) {
                            console.log("FCM  " + item[0].fcmToken)
                            const payload = {
                                notification: {
                                    title: 'Post Added',
                                    body: ` New Post added `,
                                },
                            };
                            console.log(item[0].fcmToken)
                            admin.messaging().sendToDevice(item[0].fcmToken, payload).then(reponse => {
                                return console.log('Send Message Notification for new post ' + JSON.stringify(reponse));
                            });
                        }
                    })
                }

            });
        }
    });
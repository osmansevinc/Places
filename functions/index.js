const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin:true});
const fs = require('fs');
const UUID = require('uuid-v4');

/*const gcconfig = {
    projectId:'project-1087238823494',
    keyFilename:'places.json'
}

const gcs = require("@google-cloud/storage")(gcconfig);*/

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({
    projectId:'project-1087238823494',
    keyFilename:'places.json'
});

admin.initializeApp({
    credential:admin.credential.cert(require('./places.json'))
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.storeImage = functions.https.onRequest((request, response) => {
     console.log('geldik');
     console.log(request.headers.authorization)
     return cors(request,response,() => {
         if(!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')){
             console.log('no token present!')
             response.status(403).json({error:'Unauthorized'});
             return;
         }
         let idToken;
         idToken = request.headers.authorization.split('Bearer ')[1];
         console.log(idToken)
         admin.auth().verifyIdToken(idToken)
             .then(function(decodedToken) {
                 console.log(request.body)
                 const body = JSON.parse(request.body);
                 console.log('body : ' + body)
                 fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
                     console.log('Hata var amk ' + err);
                     return response.status(500).json({ error: err });
                 });

                 const bucket = storage.bucket('places-1545241965872.appspot.com');
                 const uuid = UUID();
                 return bucket.upload(
                     "/tmp/uploaded-image.jpg",
                     {
                         uploadType: "media",
                         destination: "/places/" + uuid + ".jpg",
                         metadata: {
                             metadata: {
                                 contentType: "image/jpeg",
                                 firebaseStorageDownloadTokens: uuid
                             }
                         }
                     },
                     (err, file) => {
                         if (!err) {
                             return response.status(201).json({
                                 imageUrl:
                                 "https://firebasestorage.googleapis.com/v0/b/" +
                                 bucket.name +
                                 "/o/" +
                                 encodeURIComponent(file.name) +
                                 "?alt=media&token=" +
                                 uuid
                             });
                         } else {
                             console.log(err);
                             return response.status(500).json({ error: err });
                         }
                     });
             })
             .catch(function(error) {
                console.log('token is invalid');
                console.log(error)
                 response.status(403).json({error:'Unauthorized'});
                 return;
             })

    });
 });


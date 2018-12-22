const functions = require('firebase-functions');
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

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.storeImage = functions.https.onRequest((request, response) => {
     console.log('geldik')
     return cors(request,response,() => {
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
    });
 });


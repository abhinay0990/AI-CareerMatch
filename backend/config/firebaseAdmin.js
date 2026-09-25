const {
    initializeApp,
    getApps,
    cert
} = require("firebase-admin/app");

const {
    getAuth
} = require("firebase-admin/auth");

const fs = require("fs");
const path = require("path");

let credential;

const localServiceAccountPath = path.join(
    __dirname,
    "../firebase-service-account.json"
);

const renderServiceAccountPath =
    "/etc/secrets/firebase-service-account.json";

// Use Render Secret File in production
if (fs.existsSync(renderServiceAccountPath)) {

    credential = cert(
        require(renderServiceAccountPath)
    );

    console.log(
        "Firebase Admin: Using Render Secret File"
    );

}
// Use local JSON file during development
else if (fs.existsSync(localServiceAccountPath)) {

    credential = cert(
        require(localServiceAccountPath)
    );

    console.log(
        "Firebase Admin: Using local service account"
    );

}
else {

    throw new Error(
        "Firebase service account file not found"
    );

}

const firebaseApp =
    getApps().length === 0
        ? initializeApp({
              credential
          })
        : getApps()[0];

const firebaseAuth = getAuth(firebaseApp);

module.exports = firebaseAuth;
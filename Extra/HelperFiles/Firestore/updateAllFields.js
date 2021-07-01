const admin = require("firebase-admin");
require("dotenv").config({path:"./.env"});
// const serviceAccount = {
//   "type"                       : process.env.TYPE,
//   "project_id"                 : process.env.PROJECT_ID,
//   "private_key_id"             : process.env.PRIVATE_KEY_ID,
//   "private_key"                : process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
//   "client_email"               : process.env.CLIENT_EMAIL,
//   "client_id"                  : process.env.CLIENT_ID,
//   "auth_uri"                   : process.env.AUTH_URI,
//   "token_uri"                  : process.env.TOKEN_URI,
//   "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
//   "client_x509_cert_url"       : process.env.CLIENT_X509_CERT_URL
// }

const serviceAccount = {
    "type": "service_account",
    "project_id": "mbts-backend-api",
    "private_key_id": "800a203f9e96f8563563bac953b258be072a8a4a",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDK6zjgB4XjYOhR\nBlXrZWm1gvvxBVk2yag3Irr1nOaldt5KO/TON2nqyFZRxxLRqQ4MEzcxTqJnnizv\nmA2GUXKqWTZxCAUZkgYrDw2+lElWWH2mZbZ228IZ019G+u4G9L5Yvp0BShfxVOpJ\nl81294Re714eH2M56V9rTQwTON4Wn59KhVZL0j6Fe5Hgx/9913yIdrpMogD0rbX2\nufodvI5sYMifE0ywD0gvS5Zi/7X/uo6pJKqFt2oXkA1P29nEk3BZR+Pto+Gt08Ev\nOW0on+ah9AAGRNVAH/SODzvMfmTJHCoqmJvF8iS2kAXBb+GLGTQgWRhMBeV6RSK7\nC/B+oIwzAgMBAAECggEASr5R+NNMkfCEIjQ/ObHlOiLBQopBzliBSa3VR9s/afta\n7eUfy0XGEeExSnYVjHzE29XIIrVgROKSkr5jXPJrViv+TawylLSg6QNmgKiGSvPV\ndJFKoIVZ/cFJ+w861f0Yj//GPU9Zel9Y3Tq5R/TsITvyYw4UsqQvrYp3xCzSQWpp\nzAppzEw9gLWXWylKui3cmOObzlnsSprRrJeS0JpWgAcagM0IKkqkIATEg5pN8jSo\nVEh4/Xt4oBt0XtpydGsfUXm4UYOaLdE5x1/VK1gSsXhSz48KmnwEuY4QmuGZsIyX\nVoXecEg25n9CFxJP07bFr5/79UBJu/7tdMup6gF1AQKBgQD6oQErZ3soxnc5XOf9\nW+anqaXZo0IU2FvvnajoH2SmhAsynUWIdW7BPVD840d+U3XVuor/yE0l+YqG1vyB\nJH60M8WTA4EOxxZDDi9AUw67Wql06TWYv/5fJ8EeHzDlogUGa/SE2gwSjr7js2iG\nBTqekhTNjcDkBXglChtDxN5ykwKBgQDPRHix4jKV15ZaHnx5Cg1vX9pfQyBD9Iol\noLMTWVzg4h/FhICYgIERoLyTudixtSYcet9Dbal9pGeiyKIUNxOihNtACjSvgjaE\n3gru03mwixZoPwSGFOj2WnDKvMMpW7VdUSToEV6B/HvoFd89mIx8+DZXKLJfigDa\nssCVwlVj4QKBgFktZrQh+vGURKHVi/pbc+PeelPJQl8WaQgGii4l1XNmcnGNAku+\ntSzu+10wJaUuXzQwTvsaM1E6zG6UGn59FNRbw4Y+7fHrJuGvL2Ls6sYBSWB/BoIW\ndpU3GQD1yjk7ABy71uJaj4ce4Y81rBBb1fLMObi2Ipc/1vMe+HqRlzEfAoGBAK9U\nDnz7CStz2P2WuFhzRnYmMUVQNSUG4S1/SLxfZY/d+F5O/bEDUyskOyEDnuiEgh6p\nWd9iDnP39Krg6SoMhRF/LTB48aRdk9zFL55jSZcrsOKyHBOH8KEkVDFLiBOePkcX\n8w5UUwvGFtJ2Xgdu2biFBwKnrGvhA2P8vahxYWZBAoGBAKOF/n58MkxgGbLp2so8\n7IE97VlrKAKVH11SYXhrqUl2kcTMzYmIGH4e10BmjVPEiYzF83oKN/EQHGBvp2Uf\ngFf9g9jpSTXODUo/EZm75HSRCObxc+uoWG+u1OqoN/GHp0QVmg6mONZqb/2GibM2\n0SOqFiqAF3aektXpI8pjN1/1\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-6iunj@mbts-backend-api.iam.gserviceaccount.com",
    "client_id": "104725369049635409473",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6iunj%40mbts-backend-api.iam.gserviceaccount.com"
  }

admin.initializeApp({
  credential : admin.credential.cert(serviceAccount)
});

admin.firestore().collection("movie-reviews").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log(doc);
        doc.ref.update({
            capital: true,
            author: "writer@mbts.com",
            author_uid: "8U81SzcUPaSYyCfzFNlkmj0PNln1"
        });
    });
});
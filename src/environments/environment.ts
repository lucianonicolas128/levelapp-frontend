// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_api: 'https://levelapp-lm.herokuapp.com/api/',
  firebase: {
  /*   apiKey: "AIzaSyC4Pgt63mK_CgeJ5EuVUEhhm2qqLUqfMuo",
    authDomain: "levelapp-5f355.web.app",
    databaseURL: "https://levelapp-5f355.firebaseio.com/" ,
    projectId: "levelapp-5f355",
    storageBucket: "levelapp-5f355.appspot.com",
    messagingSenderId: "",
 */
  "type": "service_account",
  "project_id": "levelapp-5f355",
  "private_key_id": "f13c34abb78b8b773a119b45f230b055dcc14a77",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtOUf60EZHoXfm\nE7ti3yjJ05YD8RJ4xm42ghyzvbt9EqrVzzX14yoeuKPFY81a6Vf/AM12vZALME/l\nhnTl3l+Yb3Qr2CnX1xZmxIYKKf/mKezlyRAzsZPZFNe/3w3kmXD2hpJ29Z0LTwoN\nXXJTvgztbHfw5ylwZuhYIKTJIf8sgsw+gNdVp4v0ySRrHzzcwnBFYBTZ+yjdJsol\ntJqUZyHSjZbuJxdy7/Zfp7wV9eE4eLVreWwTlvQtB3t4B0Y/k65A+YyccOgyyn2Y\nkGvjyjOhnqUDLkbCnVEt0ORd0LVbx3j3ZHUigkZ4KW3q0L+2eCfM4ROELVGJEc5G\nIvxTrZPRAgMBAAECggEABHNNC97Xe2Yk2jKmFRF2Lw9CUqoaJyOz968KlTyZ6Un2\nPSWEdaOHNMBaJstcXopRsjG/VZ5jqcHtP5CfhrtameQ9KBY25v516yB/8Blpo2xu\n022Bvs5AZeqg62NL7FRb4F2PPEKtrPl0IOlGc2vV0bDAeR47RJHEROVbznYS4/4S\ndiXx03kYMWGAzpKBV3WvqXTAwKAN1v37kDplCGRlqi/QkByJAIyTLqplKNBldqGd\nj8LvhjCo1KAaYyqzGYPb0iNbAFrBz5P6LbT6DDs0vNdvsp8ndLJ4EEd+Y0gszSm1\n0WJHqUrqF2fLtDOTC6k4BEyYhwhPbJPXQRMDlKbY5QKBgQDW0kSFOvWYUmSNWtSH\nCJ4uAyl6Fl7qcY/f8HPdCX/Xf/DObZTlZVJyPAugJIE8XnCmdBWdCS7bhjbqPz0b\n9YhyYmaBu9EAsYBMx9tkGhNjNKzoy+h13bFY0HJRnnT0U2Sjv8VQosaatX+t3x4D\n8T2tAOrSGIH88Cg6skjjQYe1RQKBgQDObbt4KkqdPY8/SUKNFjzLh9LB7u7/bhZR\nON7JNMhXWPaaEJPZx72Pz0p9S0QGRKN93IRXGUddv8wxst2pejWaNjMVQqby+KL7\nYfWSRCUgAxjNzk9/McpKlNsbnnhJg8QauVYUaNbdsggdBQEJDDrLc7kCV4KqetgK\nkB/JEmMPHQKBgBDRl5HCwvWxBbRXdyo3T4MUtkubssSyLWx/++JDWyH5H1ZaF/05\nyJGvB8367a9XSYSOtB5+WI/RWz1NxDALMiqab6IanUtrmjrortGQhRIQTrVPOZz4\nxWjJsRmYyVlTqh5z5jPg+qGkMiHfxQ7T9Vs1Ji1aw9qUxuGJkdFRERntAoGAIEuA\nkcskAzeXSpJejA4Xksv8CAUmdOW3LhvUluvgD/JGGlJPnzmliXMntzRoPwbMASvX\ntHyq8prIClpuXU5WRnsGQOQ9lDOb4/IuZiStHjX90mzdeQvEFyj0onyHWxD3RCsM\nsYK5YtOwe0HGKLE2HZBMOHaSZbN0SyrDHkT3JG0CgYEA0+DM1YdxTKRMlfPuby/d\nDvnAjP7LLzdZQ6qPlGxCIDxkI1O5s9PsUDD577L0qn2XI4LTHOJ9AaI+8U/wTm7t\n9k5PoQhyaQ+vm9zY6kLhllrWMtSD8RFr74gTP1Z5+C3jqiV/2lM0FLGCadgnues3\n5lvpk0p6gSylKW+vXytcLtk=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-i3y8p@levelapp-5f355.iam.gserviceaccount.com",
  "client_id": "114498534104617786117",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-i3y8p%40levelapp-5f355.iam.gserviceaccount.com"

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

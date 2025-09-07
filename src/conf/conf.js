const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL), //endpoint
    appProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    tableId : String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    bucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;


/*this file is just created to import
env in the this and store them inside
variables which is easier to use in components

Why we typeCasted it in String is - And the impt thing sometimes in production 
it takes integers or characters only so to overcome from this taking int, char only
and take all the whole thing e.g(68af43d70008373d2120) we convert this into string 😊 Bkl(boht khas ladke)
 */ 
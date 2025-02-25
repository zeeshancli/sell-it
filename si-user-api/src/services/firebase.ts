import admin from 'firebase-admin'

export async function initializeFirebase() {
    let config = process.env.FIREBASE_CONFIG as string
    try {
        let parsedConfig = JSON.parse(config || 'null');
        if(parsedConfig) {
            admin.initializeApp({
                credential: admin.credential.cert(parsedConfig)
            });
            console.log("firebase application initialized ✅");
        } else {
            console.error("firebase app not initialized");
            process.exit(1);
        }
    } catch(e) {
        console.error(e);
        process.exit(1)
    }
}
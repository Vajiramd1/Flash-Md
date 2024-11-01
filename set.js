const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk1TcXowMldicS8vWWRRMldoSnBUUTgvMU90dmp2Ny9PcS9Sd04xMkgzWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0hJazVrS2FEaWkwZy9aOVVnT293U3ZYYTJjT0NjU1JSUG5NQ25DLzdCMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhR1FPV1Y4WW50ak9WRTFxcDhmK2VvUFNHRUhkTWNFTmdzYk5RMTBsazB3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2Njh3SDE0cGZKeGhsQjdpSTBpdjNuYjNOamI4eUkxdi9ubC96bmYvckcwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1QT2hUaXZIakhwUVFSakUvY3JCbDdNYjltT3o4UkRzNGhpSTdUQ0lXVms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRLQUNmUHVBQnNpOWh0WTEvS3hQRmk5am05WTlBeUNtZnZDaWJRYU5CRXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU1UM2V0VFp3cDFZSFNuWktzZHJ1M2x6RHY4bXhiMEI0MmtkNUNKdEcwRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGNYRHVHQUdMNkIrMHFiZVRRZmM5ck9JSEovOHpGclpxSkZRNmdQcmxIbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjAyd0htMjhMSStoY1lvY285TlZkVXU4T05IcEUyQllLVXk5RjJjUGpvWnlJOTBSZnRRRTU3bk9CcEFKWURuQmN3d1MwWE1mSlhvZlhmdEcrNFhCMURnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE3LCJhZHZTZWNyZXRLZXkiOiJta1hzbmhsYzM5emxPRjBOMGpiZUhjL0xjNHY0aVUvVExlUFNSL1FMcGVJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJCYUVuVUIwMFQtR1NGaXo2MDFxU25RIiwicGhvbmVJZCI6IjVlYjQ4NTI1LWY1YTUtNDRiMy04NWFhLWUyM2VjOTUyMGFiZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1c1NNa05uQWFiMjBGenV2TFBCaExkREhZQlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWnZlZWJ4THo0ZnduNzFRZlpIUGluUlgyN3lZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJXOVZaMTJLIiwibWUiOnsiaWQiOiI5NDcxMDEzNjk5NDo0N0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSitZOEFVUStjV0p1UVlZQXlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQVZ1Ukh5cWZCUVhjLzBLZFhWbURnUDlCYUlDektsL0gvUVU1ZVA4VnduRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoidDlJQzBFalN3M0trSmpSRVpRZnhMajJvNFBWZ0NTR2FObStJM0ZhMGN1RjNHeDcyVDZjTUVwN2lmU1djUWtka1RmcS9LcHlxQW5LUlByc0RFL2xDQWc9PSIsImRldmljZVNpZ25hdHVyZSI6Ikw2RWI2VGo0UkFNbTdYNGFMVlFIcFZERVVXTmlXUkF5cUR4TlNWOSsyUjdiWTFNcEJhd3Y3bFNHMUFTTVBkRVVSWTZyTG9iaDFsbzBhcFhxcHpuVUR3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3MTAxMzY5OTQ6NDdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUUZia1I4cW53VUYzUDlDblYxWmc0RC9RV2lBc3lwZngvMEZPWGovRmNKeCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMDMwNjgyMiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPcFgifQ==',
    PREFIXES: (process.env.PREFIX || '.').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "CYBER SHAGEE",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "94710136994",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

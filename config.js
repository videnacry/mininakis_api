const getVariables = () => {
    switch (process.env.MODE) {
        case 'prod' :
            return {
                urlDB: process.env.PROD_URL_DB,
                urlsOrigin: process.env.PROD_URLS_ORIGIN.split(',')
            }
        case 'dev' :
            return {
                urlDB: process.env.DEV_URL_DB,
                urlsOrigin: process.env.DEV_URLS_ORIGIN.split(',')
            }
        default :
            return {
                urlDB: process.env.TEST_URL_DB,
                urlsOrigin: process.env.TEST_URLS_ORIGIN.split(',')
            }
    }
}

module.exports = {
    getVariables
}
const axios = require('axios');

async function main() {
    try {
        let bookmark, finalRes, response;

        do {
            let data = JSON.stringify({
                "user": "eth|493DA86081A7Fa84c59eF7590C5e5ceAfe0A3205",
                "limit": 100,
                "bookmark": bookmark
            });
                
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api-galaswap.gala.com/galachain/api/asset/token-contract/FetchTokenSwapsOfferedByUser',
                headers: {
                    'X-Wallet-Address': 'eth|493DA86081A7Fa84c59eF7590C5e5ceAfe0A3205', 
                    'Content-Type': 'application/json'
                },
                data: data,
            };
        
            response = (await axios.request(config))

            finalRes = { ...finalRes, ...response.data.Data }
            
            bookmark = response.data.Data.nextPageBookMark

        } while (response?.data.Data.nextPageBookMark);
        console.log(finalRes)
        return finalRes;

    } catch (error) {
        console.error(error)
    }
}

main()

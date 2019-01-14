const { request } = require('graphql-request');
const axios = require('axios'); 

market = "5c3bc55f6221478aac7a6544"
const query = `
            query {
                products{
                   upc
                   prices{
                       market {
                           marketName
                       }
                   }
                }
            }`
request('http://localhost:4000/graphql', query).then(({products}) => {
    products.forEach(element => {
        if (element.prices.length < 2){
            setPrice(element.upc)
        }
    });
})




function setPrice(upc){
    axios.get('https://super.walmart.com.mx/api/rest/model/atg/commerce/catalog/ProductCatalogActor/getSkuPriceInventoryPromotions', {
        params: {
            skuId: `0${upc}`,
            storeId: "0000009999"
        }
    })
    .then(function ({ data }) {
        let id = Object.keys(data.skuinfo);
        let price = data.skuinfo[id].activeOriginalPrice
        if (!price) return null;
        const query = `
        mutation {
            addPriceProduct(upc: "${upc}", price: "${price}", market: "${market}"){
                id
                description 
            }
        }`
        request('http://localhost:4000/graphql', query).then(data => console.log(data))
    })
    .catch(function (error) {
        console.log(error);
    });
}
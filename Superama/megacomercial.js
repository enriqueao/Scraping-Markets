const puppeteer = require('puppeteer');
var mysql = require('mysql');
var products = [];
var datos = [];


var connection = mysql.createConnection({
    host: '192.241.142.12',
    user: 'scanmarketpro',
    password: 'scanmarket@.',
    database: 'scanmarket_p'
});

connection.connect();

// connection.query("SELECT * FROM products WHERE codigodebarras LIKE '075%';", function (error, results, fields) {
//     if (error) throw error;
//     // console.log(results);
//     datos = results;
// });
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    for (let index = 0; index < 5; index++) {
        await page.goto('https://www.lacomer.com.mx/lacomer/doHome.action?key=Lomas-Anahuac&succId=14&succFmt=100&pago=false');
        await page.click("#idSearch");
        await page.keyboard.type("7501055909322");
        await page.click('#btnSearch');
        await page.waitFor(15000);
        const textContent = await page.evaluate(() => {
            let price = document.querySelector(".precio_normal").textContent;// Select all Products
            let data = [];
            data.push({ price }); // Push an object with the data onto our array
            console.log(data);
        });
    }
    //console.log(textContent); /* No Problem Mate */
    console.log(data);
    browser.close();
    // querys();
})();

var da = [];
function setData(data) {
    da.push(data);
}
// var fs = require('fs');
// function querys(datos) {
//     var txtFile = fs.createWriteStream("querys.txt");
//     txtFile.once('open', function (fd) {
//         for (var element of datos) {
//             txtFile.write('INSERT INTO products VALUES(' + element.id + ',NULL ,"' + element.title + '","' + element.upc + '","' + element.img + '",NOW(),NOW()); \n');
//             txtFile.write('INSERT INTO productsprices VALUES(NULL ,' + element.id + ',"' + element.price + '",4 ,10 ,NOW(),NOW()); \n');
//         }
//         txtFile.end();
//         console.log("Listo!");
//     });
// }
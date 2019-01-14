const puppeteer = require('puppeteer');
const { request } = require('graphql-request');
var products = [];
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://www.superama.com.mx/catalogo/d-lavanderia-hogar-y-mascotas/f-limpieza/l-limpiadores-y-desmanchadores');
    await page.click('.btnSuperama.btnSuperama-blanco');
    await page.waitFor(5000);
    await page.click('.btnSuperama.btnSuperama-blanco'); // > 44
    await page.waitFor(5000);
    await page.click('.btnSuperama.btnSuperama-blanco'); //> 70
    await page.waitFor(5000);
    await page.click('.btnSuperama.btnSuperama-blanco'); // > 90
    await page.waitFor(5000);
    await page.click('.btnSuperama.btnSuperama-blanco');
    await page.waitFor(5000);
    // await page.click('.btnSuperama.btnSuperama-blanco'); // > 44
    // await page.waitFor(5000);
    // await page.click('.btnSuperama.btnSuperama-blanco'); //> 70
    // await page.waitFor(5000);
    // await page.click('.btnSuperama.btnSuperama-blanco'); // > 90
    // await page.waitFor(5000);
    const textContent = await page.evaluate(() => {
        let data = []; // Create an empty array that will store our data
        let elements = document.querySelectorAll("div#contenedor div.itemGrid");// Select all Products
        // console.log(elements);
        for(var element of elements) { // Loop through each proudct
            let price = element.querySelector(".upcPrice").textContent.replace("$", "").trim(); // Select the title
            let title = element.querySelector(".nombreProductoDisplay").textContent.trim(); // Select the price
            let img = element.querySelector(".upcImage img").src; // Select the price
            let upc = element.querySelector("#upcProducto").value; // Select the price
            
            if (title != ""){
                // console.log({ title, price, img, upc })
                data.push({ title, price, img, upc }); // Push an object with the data onto our array
            }
        }   

        return data; // Return our data array
    });
    //console.log(textContent); /* No Problem Mate */
    browser.close();
    querys(textContent);
})();


// var fs = require('fs');
function querys(datos){
    // var txtFile = fs.createWriteStream("querys.txt");
    // txtFile.once('open', function (fd) {
        for (var element of datos) {
            // txtFile.write(`INSERT INTO products VALUES('${element.id}',NULL ,NULL, "${element.upc}", NULL, NOW(),NOW()); \n`);
            // txtFile.write(`INSERT INTO productsprices VALUES(NULL ,'${element.id},"${element.price}",3 ,10 ,NOW(),NOW()); \n `);
            // txtFile.write();

            const query = `
            mutation {
                addProduct(description: "${element.title}", format: "N/A", upc: "${element.upc}", pic: "${element.img}", price: "${element.price}", market: "Superama"){ 
                    id
                }
            }`

            request('http://localhost:4000/graphql', query).then(data => console.log(data))
            
        }
        // txtFile.end();
        // console.log("Listo!");
    // });
}
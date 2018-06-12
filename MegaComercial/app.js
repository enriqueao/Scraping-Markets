const puppeteer = require('puppeteer');
var mysql = require('mysql');
var products = [];
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://www.superama.com.mx/catalogo/d-jugos-y-bebidas/f-jugos-y-nectares/l-jugo-de-frutas');
    await page.click('.btnSuperama.btnSuperama-blanco');
    await page.waitFor(8000);
    await page.click('.btnSuperama.btnSuperama-blanco'); // > 44
    await page.waitFor(8000);
    await page.click('.btnSuperama.btnSuperama-blanco'); //> 70
    await page.waitFor(8000);
    await page.click('.btnSuperama.btnSuperama-blanco'); // > 90
    await page.waitFor(8000);
    await page.click('.btnSuperama.btnSuperama-blanco');
    await page.waitFor(8000);
    await page.click('.btnSuperama.btnSuperama-blanco'); // > 44
    await page.waitFor(8000);
    await page.click('.btnSuperama.btnSuperama-blanco'); //> 70
    await page.waitFor(8000);
    await page.click('.btnSuperama.btnSuperama-blanco'); // > 90
    await page.waitFor(8000);
    const textContent = await page.evaluate(() => {
        let data = []; // Create an empty array that will store our data
        let elements = document.querySelectorAll(".item.thumb.graphic.portfolio-grid.isotope-item");// Select all Products
        var id = 976; //el ultimo id + 1
        for(var element of elements) { // Loop through each proudct
            let price = element.childNodes[9].innerText.replace("$", "").trim(); // Select the title
            let title = element.childNodes[7].innerText.trim(); // Select the price
            let img = element.childNodes[1].childNodes[0].childNodes[0].src; // Select the price
            let upc = element.childNodes[1].childNodes[0].childNodes[1].getAttribute('data-upc'); // Select the price
            
            if (title != ""){
                data.push({ id, title, price, img, upc }); // Push an object with the data onto our array
                id++;
            }
        }   

        return data; // Return our data array
    });
    //console.log(textContent); /* No Problem Mate */
    browser.close();
    querys(textContent);
})();


var fs = require('fs');
function querys(datos){
    var txtFile = fs.createWriteStream("querys.txt");
    txtFile.once('open', function (fd) {
        for (var element of datos) {
            txtFile.write('INSERT INTO products VALUES(' + element.id + ',NULL ,NULL, "' + element.upc + '", NULL, NOW(),NOW()); \n');
            txtFile.write('INSERT INTO productsprices VALUES(NULL ,' + element.id + ',"' + element.price + '",1 ,10 ,NOW(),NOW()); \n');
        }
        txtFile.end();
        console.log("Listo!");
    });
}
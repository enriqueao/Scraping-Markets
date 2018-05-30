const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.lacomer.com.mx/lacomer/goBusqueda.action?succId=376&ver=mislistas&succFmt=100&criterio=7501001604325#/7501001604325');

    const textContent = await page.evaluate(() => {
        return {
            precioNormal: document.querySelector('.precio_normal').textContent,
        };
    });

    console.log(textContent); /* No Problem Mate */

    browser.close();
})();
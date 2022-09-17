const puppeteer = require("puppeteer");

(async () => {
  const url = "https://fr.wikipedia.org/wiki/Sport";
  const browser = await puppeteer.launch({ headless: true, args: ['--window-size=1920,1080'] });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height:1080
  })
  await page.goto(url);
  await page.waitForSelector(".mw-parser-output");
  const sport = await page.evaluate(() => {
    const container = document.querySelector(".mw-parser-output > table:nth-child(43) > tbody > tr");
                      
            let category;
            const newObj = {}

            for (let i = 0; i < container.childElementCount; i++) {
              const column = container.children[i];
              for (let x = 0; x < column.childElementCount; x++) {
                const element = column.children[x];
                if(element.localName === "p"){
                  category = element.textContent.trim()
                }else{
                  newObj[category.replace(/[^a-zA-Z0-9 ]/g, '')] = element.innerText.split('\n')
                }
              }
            }
            
        return newObj
          
  });

  console.log(sport);
  
  await browser.close();
  return sport
})();

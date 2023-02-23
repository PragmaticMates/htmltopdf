const puppeteer = require("puppeteer-core");

const saveToPdf = async htmlContent => {
  // Browser actions & buffer creator
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--run-all-compositor-stages-before-draw"] // SEE BELOW WARNING!!!
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, {
    waitUntil: ["networkidle0", "load"],
  });
  const pdf = await page.pdf({
    printBackground: true,
    format: 'A4'
  });
  await browser.close();
  // Return Buffer
  return pdf;
};

/******************** WARNING ********************* WARNING ********************* WARNING *********************
 
 If you absolutely trust the content you open in Chrome, you can launch Chrome with the --no-sandbox argument...
 Running without a sandbox is strongly discouraged. Consider configuring a sandbox instead!!!

 More Info Here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md

******************** WARNING ********************* WARNING ********************* WARNING *********************/

module.exports = saveToPdf;

const puppeteer = require("puppeteer-core");


const browserHelper = (function() {
  let instance; // Private variable to hold the single instance

  async function createInstance() {
    // Private method to create a new instance of the browser
    const newInstance = await puppeteer.launch({
      headless: 'new',
      executablePath: "/usr/bin/chromium-browser",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--run-all-compositor-stages-before-draw"] // SEE BELOW WARNING!!!
    });
    return newInstance;
  }

  return {
    getInstance: function() {

      // Public method to get the single instance
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
     resetInstance: function() {
      instance = null;
    }
  };
})();

const saveToPdf = async (htmlContent) => {
  // Browser actions & buffer creator
  const browser = await browserHelper.getInstance();

  try {
    const startTime = performance.now();
    const page = await browser.newPage();
    await page.setContent(htmlContent, {
      waitUntil: ["load"],
    });
    await page.waitForNetworkIdle({idleTime: 200});
    const pdf = await page.pdf({
      printBackground: true,
      format: 'A4'
    });
    await page.close();

    // duration
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log("saveToPdf duration: " + duration + " milliseconds");

    // Return Buffer
    return pdf;

  } catch (e) {
    console.log('saveToPdf failed ' + e);
    await browser.close();
    browserHelper.resetInstance();
  }

  return null;
};

/******************** WARNING ********************* WARNING ********************* WARNING *********************
 
 If you absolutely trust the content you open in Chrome, you can launch Chrome with the --no-sandbox argument...
 Running without a sandbox is strongly discouraged. Consider configuring a sandbox instead!!!

 More Info Here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md

******************** WARNING ********************* WARNING ********************* WARNING *********************/

module.exports = saveToPdf;

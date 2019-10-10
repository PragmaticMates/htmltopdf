const express = require("express");
const router = express.Router();
const saveToPdf = require("../controller/safeToPdf");
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const fileUrl = require('file-url');

router.post("/generate-pdf", async (req, res, __) => {
    let fileName = '';
    let inputFileName = '';

    do {
        fileName = uuidv4();
        inputFileName = `/tmp/${fileName}.html`;
    }
    while (fs.existsSync(inputFileName));

    let outputFileName = `${fileName}.pdf`;
    let htmlContent = req.text;

    fs.writeFile(inputFileName, htmlContent, function (err) {
        if (err) {
            return console.error(err);
        }
        // console.log("The file was saved!");
    });

    let url = fileUrl(inputFileName);
    let result = await saveToPdf(url);

    fs.unlink(inputFileName, (err) => {
        if (err) {
            return console.error(err);
        }
        // console.log("The file was removed!");
    });

    res.attachment(outputFileName);
    res.contentType("application/pdf");
    res.send(result);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const saveToPdf = require("../controller/safeToPdf");

router.post("/generate-pdf", async (req, res, __) => {
    let result = await saveToPdf(req.text);
    res.attachment('output.pdf');
    res.contentType("application/pdf");
    res.send(result);
});

module.exports = router;

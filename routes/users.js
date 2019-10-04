const express = require("express");
const router = express.Router();
const Image = require('../models/image');
const Video = require('../models/video');
const Pdf = require('../models/pdf');



router.get('/main', isAuthenticated, (req, res, next) => {
    if (req.user.client === 'tovi') { res.render('controlPanel') } else {
        res.render('main_page');
    }
});

router.get('/image/:id', (req, res) => {
    res.send('profile image');
});

router.get('/test', (req, res) => {
    res.render('volMarketing');
});

//Vol-Report
router.get('/vol-report-audio', (req, res) => {
    res.render('Vol_Report/vol_report_audio');
});

/*Vol Report Fotografia Años

*/

router.get('/vol-report-fotografia', async(req, res) => {
    const images = await Image.find({ user: req.user.client, "logo": false }).sort({ timestamp: 1 });
    res.render('Vol_Report/vol_report_fotografia', { images: images });
});

router.post('/vol-report-fotografia', async(req, res) => {
    let evento = Object.keys(req.body);
    console.log(req.body);
    const images = await Image.find({ user: req.user.client, "logo": false, "date": evento[0] }).sort({ timestamp: 1 });
    res.render('Vol_Report/vol_report_fotografia', { images: images });
});



/*Vol Report Video Años

 */

router.get('/vol-report-video', async(req, res) => {
    const videos = await Video.find({ user: req.user.client }).sort({ timestamp: 1 });
    res.render('Vol_Report/vol_report_video', { videos: videos });
});

router.post('/vol-report-video', async(req, res) => {
    let evento = Object.keys(req.body);
    console.log(req.body);
    const videos = await Video.find({ user: req.user.client, "date": evento[0] }).sort({ timestamp: 1 });
    res.render('Vol_Report/vol_report_video', { videos: videos });
});

//Vol-Report End

/* Vol Media

*/
router.get('/impresions', async(req, res) => {
    const pdfTag = await Pdf.distinct("tag");

    const pdf = await Pdf.find({ user: req.user.client }).sort({ timestamp: 1 });
    res.render('Vol_Media/impresions', { pdf: pdf, pdfTag: pdfTag });
});

//Sort de los pdfs por evento
router.post('/impresions', async(req, res) => {
    const pdfTag = await Pdf.distinct("tag");
    let evento = Object.keys(req.body);
    const pdf = await Pdf.find({ user: req.user.client, "tag": evento[0] }).sort({ timestamp: 1 });
    res.render('Vol_Media/impresions', { pdf: pdf, pdfTag: pdfTag });

});


//Vol Media End




//Authentication
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

module.exports = router;
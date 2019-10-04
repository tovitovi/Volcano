const express = require("express");
const router = express.Router();
const Image = require('../models/image');
const Video = require('../models/video');
const Pdf = require('../models/pdf');
const User = require('../models/user');


//Upload Images
router.get('/controlpanel/images', (req, res, next) => {
    if (req.user.client === 'tovi') { res.render('controlPanel_images') } else {
        res.render('main_page');
    }
});

router.post('/controlpanel/images', async(req, res, next) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    image.date = req.body.date;
    image.user = req.body.client;
    image.logo = false;
    await image.save();

    console.log(image);

    res.redirect('/main');
});
//Upload Images End

//Upload Videos
router.get('/controlpanel/videos', async(req, res, next) => {
    if (req.user.client === 'tovi') {
        const videos = await Video.find().sort({ timestamp: 1 });
        res.render('controlPanel_videos', { videos: videos })
    } else {
        res.render('main_page');
    }
});

router.post('/controlpanel/videos', async(req, res, next) => {
    const video = new Video();
    video.title = req.body.title;
    video.description = req.body.description;
    video.filename = req.file.filename;
    video.path = '/uploads/' + req.file.filename;
    video.originalname = req.file.originalname;
    video.mimetype = req.file.mimetype;
    video.size = req.file.size;
    video.date = req.body.date;
    video.user = req.body.client;
    await video.save();

    console.log(video);

    res.redirect('../controlPanel/videos');
});
//Upload Videos End

//Upload pdfs
router.get('/controlPanel/pdfs', async(req, res, next) => {
    if (req.user.client === 'tovi') {
        const pdfs = await Pdf.find().sort({ timestamp: 1 });
        res.render('controlPanel_pdfs', { pdfs: pdfs })
    } else {
        res.render('main_page');
    }
});

router.post('/controlPanel/pdfs', async(req, res, next) => {
    const pdf = new Pdf();
    pdf.title = req.body.title;
    pdf.description = req.body.description;
    pdf.filename = req.file.filename;
    pdf.path = '/uploads/' + req.file.filename;
    pdf.originalname = req.file.originalname;
    pdf.mimetype = req.file.mimetype;
    pdf.size = req.file.size;
    pdf.date = req.body.date;
    pdf.user = req.body.client;
    await pdf.save();

    console.log(pdf);

    res.redirect('../controlPanel/pdfs');
});
//Upload pdfs End


//Upload Impresions
router.get('/controlPanel/impresions', async(req, res, next) => {
    if (req.user.client === 'tovi') {
        const pdfs = await Pdf.find().sort({ timestamp: 1 });
        const user = await User.find().sort({ timestamp: 1 });
        res.render('controlPanel_impresions', { pdfs: pdfs, user: user }, )
    } else {
        res.render('main_page');
    }
});

router.post('/controlPanel/impresions', async(req, res, next) => {
    const pdf = new Pdf();
    pdf.title = req.body.title;
    pdf.description = req.body.description;
    pdf.filename = req.file.filename;
    pdf.path = '/uploads/' + req.file.filename;
    pdf.originalname = req.file.originalname;
    pdf.mimetype = req.file.mimetype;
    pdf.size = req.file.size;
    pdf.date = req.body.date;
    pdf.user = req.body.client;
    pdf.tag = req.body.tag;
    pdf.evento = req.body.evento;
    await pdf.save();

    console.log(pdf);

    res.redirect('../controlPanel/impresions');
});
//Upload IMpresions End

module.exports = router;
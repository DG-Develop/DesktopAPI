const express = require('express');
const boom = require('@hapi/boom');
const DesktopService = require('../services/DesktopService');

const desktopApi = (app) => {
    const router = express.Router();
    app.use('/api/desktop', router);

    const desktopService = new DesktopService();

    router.get('/network-interfaces', (req, res) => {
        try {
            const networkInterfaces =  desktopService.getNetworkInterfaces();
            
            res.status(200).json(networkInterfaces);
        } catch (error) {
            next(error);
        }
    });
}

module.exports = desktopApi;
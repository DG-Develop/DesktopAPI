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
            console.log(error);
            // next(error);
            res.status(500).json({
                message: "Error getting network interfaces",
                description: error.message,
                error: error,            
            });
        }
    });
}

module.exports = desktopApi;
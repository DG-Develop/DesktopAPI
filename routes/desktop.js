const express = require('express');
const DesktopService = require('../services/DesktopService');
const IP = require('ip');

const desktopApi = (app) => {
    const router = express.Router();
    app.use('/api/desktop', router);

    const desktopService = new DesktopService();

    router.get('/network-interfaces', (req, res) => {
        try {
            const ipAddress = IP.address();
            
            const networkInterfaces =  desktopService.getNetworkInterfaces(ipAddress);
            
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
const os = require('os');

class DesktopService {

    getNetworkInterfaces() {
        
        try {
            const networkInterfaces = os.networkInterfaces();

            const ethnt = networkInterfaces.Ethernet;

            const mac = [... new Set(ethnt.map(item => item.mac))];
            const ip = [... new Set(ethnt.filter(item => item.family === "IPv4").map(item => item.address))];

            //console.log(mac[0].replaceAll(':', ''));

            //const macWithoutColon = mac[0].replaceAll(':', '').toUpperCase();


            const response = {
                macCliente: mac[0].toUpperCase().replace(/:/g, ''),
                ipCliente: ip[0],
                hostnameCliente: os.hostname()
            };

            return response;

        } catch (error) {
            console.log(error);
        }

    }

}

module.exports = DesktopService;
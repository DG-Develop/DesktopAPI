const os = require('os');

class DesktopService {

    /**
     * Método que obtiene la información de la MAC, IP y hostname del cliente
     * @returns response con información de la máquina cliente
     */
    getNetworkInterfaces() {
        
        try {
            const networkInterfaces = os.networkInterfaces();
            const regexInterfaces = new RegExp(/^(Ethernet|LAN)([\s][0-9])?/)

            const interfaces = Object.keys(networkInterfaces).filter(inter => regexInterfaces.test(inter))

            // * Obtengo una lista de los datos de Ethernet o LAN y filtro que tengan el atributo family y address
            // * y también verifico que la familia sea IPv4
            const ethntOrLan = interfaces.map(inter => {
                const interFound = networkInterfaces[inter].filter(item => item.family && item.address && item.family === "IPv4")[0]
                return interFound
            })
            
            // * Genero una lista de macs no repetibles
            const mac = [... new Set(ethntOrLan.map(item => item.mac))];
            // * Genero una lista de ip no repetibles
            const ip = [... new Set(ethntOrLan.filter(item => item.family === "IPv4").map(item => item.address))];
            
            const macWithoutColon = mac[0].toUpperCase().replace(/:/g, '');

            const response = {
                macCliente: macWithoutColon,
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
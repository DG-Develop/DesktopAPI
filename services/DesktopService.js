const os = require('os');


/**
 * Pruebas ✔
 * Ethernet 1 ✔
 * Ethernet ✔
 * LAN ✔
 * LAN 1 ✔
 * Loop inteface Ethernet 1 ✖
 * WLAN ✖
 * Ethernet1 ✔
 * LAN0 ✔

 */
class DesktopService {

    /**
     * Método que obtiene la información de la MAC, IP y hostname del cliente
     * @returns response con información de la máquina cliente
     */
    getNetworkInterfaces(ipAddress) {
        
        try {
            const networkInterfaces = os.networkInterfaces();

            // * Obtengo una lista de los datos de Ethernet o LAN y filtro que tengan el atributo family y address
            // * y también verifico que la familia sea IPv4

            let ethntOrLan;
            for(const key of Object.keys(networkInterfaces)){
                const ethn  = networkInterfaces[key].filter(inter => {                    
                    return inter.address && inter.family && inter.address == ipAddress && inter.family == 'IPv4'
                })

                if(ethn.length > 0){
                    ethntOrLan = ethn[0]
                }

            }
            
            // * Genero una lista de macs no repetibles
            const mac = ethntOrLan.mac

            // * Genero una lista de ip no repetibles
            const ip = ethntOrLan.address
            
            const macWithoutColon = mac.toUpperCase().replace(/:/g, '');

            const response = {
                macCliente: macWithoutColon,
                ipCliente: ip,
                hostnameCliente: os.hostname()
            };

            return response;

        } catch (error) {
            console.log(error);
        }

    }

}

module.exports = DesktopService;
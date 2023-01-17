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
            //const regexInterfaces = new RegExp(/^(Ethernet|LAN)[\s]?[0-9]?/)

            //const interfaces = Object.keys(networkInterfaces).filter(inter => regexInterfaces.test(inter))

            // * Obtengo una lista de los datos de Ethernet o LAN y filtro que tengan el atributo family y address
            // * y también verifico que la familia sea IPv4
            // const ethntOrLan = interfaces.map(inter => {
            //     const interFound = networkInterfaces[inter].filter(item => item.family && item.address && item.family === "IPv4" && item.address === ipAddress)[0]
            //     return interFound
            // })
            
            // const ethntOrLan = Object.keys(networkInterfaces).filter(key => {
            //     const ethn = networkInterfaces[key].find(inter => {
            //         return inter.address && inter.family && inter.address === ipAddress && inter.family === 'IPv4'
            //     })


            //     return ethn
            // })

            let ethntOrLan;

            for(const key of Object.keys(networkInterfaces)){
                const ethn  = networkInterfaces[key].filter(inter => {
                    // console.log(inter.address)
                    return inter.address && inter.family && inter.address == ipAddress && inter.family == 'IPv4'
                })

                if(ethn.length > 0){
                    ethntOrLan = ethn[0]
                }

            }
           

            console.log(ethntOrLan)
            
            // * Genero una lista de macs no repetibles
            // const mac = [... new Set(ethntOrLan.map(item => item.mac))];
            const mac = ethntOrLan.mac

            // * Genero una lista de ip no repetibles
            // const ip = [... new Set(ethntOrLan.filter(item => item.family === "IPv4").map(item => item.address))];
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
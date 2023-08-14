export function getAPI_URL(env: string) : string {
    if(env == 'dev') return 'https://generadordeinnova.westus.azurecontainer.io'
    if(env == 'prod') return 'https://generadordeinnova.westus.azurecontainer.io';
    return '';
}
// const ACI_URL = 'http://formationplanbackend.cgb2gegzehhzg2ak.westus.azurecontainer.io';

export function getAPI_URL(env: string) : string {
    if(env == 'dev') return 'http://localhost:8080'
    if(env == 'dev') return 'https://tesegenerador.crdxbyasb5hbdhh5.eastus.azurecontainer.io'
    if(env == 'prod') return 'http://formationplanackend.cgb2gegzehhzg2ak.westus.azurecontainer.io';
    return '';
}
// const ACI_URL = 'http://formationplanbackend.cgb2gegzehhzg2ak.westus.azurecontainer.io';

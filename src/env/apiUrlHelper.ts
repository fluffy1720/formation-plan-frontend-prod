export function getAPI_URL(env: string) : string {
    //if(env == 'dev') return 'http://localhost:8080'
    if(env == 'dev') return 'https://generadordedual.westus.azurecontainer.io'
    if(env == 'prod') return 'https://generadordedual.westus.azurecontainer.io';
    return '';
}
// const ACI_URL = 'http://formationplanbackend.cgb2gegzehhzg2ak.westus.azurecontainer.io';

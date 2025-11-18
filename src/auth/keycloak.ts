import Keycloak from 'keycloak-js';


const secret = import.meta.env.KCS;
const keycloak = new Keycloak ({
  url: 'https://auth.managementcorp.my.id',
  realm: 'service',
  clientId: 'iphish',
});

export default keycloak;
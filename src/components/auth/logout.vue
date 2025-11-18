import keycloak from '@/auth/keycloak';

const handleLogout = () => {
  keycloak.logout({
    redirectUri: window.location.origin,
  });
};
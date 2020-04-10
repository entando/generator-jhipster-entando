export const getKeycloakToken = () => {
  if (
    window &&
    window.entando &&
    window.entando.keycloak &&
    window.entando.keycloak.authenticated
  ) {
    return window.entando.keycloak.token;
  }
  return '';
};

export const getDefaultOptions = () => ({
  headers: new Headers({
    Authorization: `Bearer ${getKeycloakToken()}`,
    'Content-Type': 'application/json',
  }),
});

export const request = async (url, options) => {
  const response = await fetch(url, options);

  if (response.status === 204) {
    return {};
  }

  return response.status >= 200 && response.status < 300
    ? response.json()
    : Promise.reject(new Error(response.statusText || response.status));
};


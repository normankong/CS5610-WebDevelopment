const BASE_DOMAIN = window.location.protocol === "http:" ? process.env.REACT_APP_BASE_DOMAIN : "";

const config = {
  feature: {
    recommendation: `${BASE_DOMAIN}/recommendation`,
    list: `${BASE_DOMAIN}/feature`,
  },
  stocks: {
    quote: `${BASE_DOMAIN}/stock/`,
    etfInfo: `${BASE_DOMAIN}/stock/`,
    portfolio: `${BASE_DOMAIN}/portfolio/`,
    search: `${BASE_DOMAIN}/search/`,
  },
};

export default config;

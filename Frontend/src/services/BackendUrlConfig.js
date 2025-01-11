const HOST_URL = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`;
const HOST_URL_ADMIN_SERVER = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/admin-server`;
const HOST_URL_CLIENT_SERVER = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server`;


const GET_DONORS_SERVICE_URL = `${HOST_URL_ADMIN_SERVER}/donors`;
const GET_CHARITIES_SERVICE_URL = `${HOST_URL_ADMIN_SERVER}/charities`;
const DELETE_DONOR_SERVICE_URL = `${HOST_URL_ADMIN_SERVER}/donor/delete`;
const DELETE_CHARITY_SERVICE_URL = `${HOST_URL_ADMIN_SERVER}/charity/delete`;
const ADD_DONOR_SERVICE_URL = `${HOST_URL_ADMIN_SERVER}/donor/create`;
const ADD_CHARITY_SERVICE_URL = `${HOST_URL_ADMIN_SERVER}/charity/create`;
const FILTER_DONOR_BY_COUNTRY = `${HOST_URL_ADMIN_SERVER}/donors/filter?country=`;
const FILTER_CHARITY_BY_COUNTRY = `${HOST_URL_ADMIN_SERVER}/charities/filter?country=`;
const FILTER_CHARITY_BY_TYPE = `${HOST_URL_ADMIN_SERVER}/charities/filter?type=`;

export {
    GET_DONORS_SERVICE_URL,
    GET_CHARITIES_SERVICE_URL,
    DELETE_DONOR_SERVICE_URL,
    DELETE_CHARITY_SERVICE_URL,
    ADD_DONOR_SERVICE_URL,
    ADD_CHARITY_SERVICE_URL,FILTER_DONOR_BY_COUNTRY,
    FILTER_CHARITY_BY_COUNTRY,
    FILTER_CHARITY_BY_TYPE
}

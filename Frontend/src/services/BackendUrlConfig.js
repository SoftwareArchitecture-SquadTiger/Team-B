const HOST_URL_ADMIN_SERVER = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/admin-server`;
const HOST_URL_CLIENT_SERVER = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server`;


const GET_DONORS_SERVICE_URL = `${HOST_URL_ADMIN_SERVER}/donors`;
const GET_CHARITIES_SERVICE_URL = `${HOST_URL_ADMIN_SERVER}/charities`;
const DELETE_DONOR_SERVICE_URL = `${HOST_URL_ADMIN_SERVER}/donor/delete`;
const DELETE_CHARITY_SERVICE_URL = `${HOST_URL_ADMIN_SERVER}/charity/delete`;
const ADD_DONOR_SERVICE_URL = `${HOST_URL_ADMIN_SERVER}/donor/create`;
const ADD_CHARITY_SERVICE_URL = `${HOST_URL_ADMIN_SERVER}/charity/create`;
const ADD_ADMIN_SERVICE_URL = `${HOST_URL_ADMIN_SERVER}/auth/register`;
const FILTER_DONOR_BY_COUNTRY = `${HOST_URL_ADMIN_SERVER}/donors/filter?country=`;
const FILTER_CHARITY_BY_COUNTRY = `${HOST_URL_ADMIN_SERVER}/charities/filter?country=`;
const FILTER_CHARITY_BY_TYPE = `${HOST_URL_ADMIN_SERVER}/charities/filter?type=`;
const ADMIN_LOGIN_URL = `${HOST_URL_ADMIN_SERVER}/auth/login`;
const ADMIN_LOGOUT_URL = `${HOST_URL_ADMIN_SERVER}/auth/logout`;
const GET_PROJECT_BY_CATEGORY = `${HOST_URL_ADMIN_SERVER}/statistics/projects/by-category`;
const GET_PROJECT_BY_COUNTRY = `${HOST_URL_ADMIN_SERVER}/statistics/projects/by-country`;
const GET_PROJECT_BY_MONTH = `${HOST_URL_ADMIN_SERVER}/statistics/projects/by-month`;
const GET_AMOUNT_BY_MONTH = `${HOST_URL_ADMIN_SERVER}/statistics/donations/by-month`;
const GET_AMOUNT_BY_DAY = `${HOST_URL_ADMIN_SERVER}/statistics/donations/by-day`;

export {
    GET_DONORS_SERVICE_URL,
    GET_CHARITIES_SERVICE_URL,
    DELETE_DONOR_SERVICE_URL,
    DELETE_CHARITY_SERVICE_URL,
    ADD_DONOR_SERVICE_URL,
    ADD_CHARITY_SERVICE_URL,FILTER_DONOR_BY_COUNTRY,
    FILTER_CHARITY_BY_COUNTRY,
    FILTER_CHARITY_BY_TYPE,
    ADMIN_LOGIN_URL,
    GET_AMOUNT_BY_MONTH,
    GET_PROJECT_BY_CATEGORY,
    GET_PROJECT_BY_COUNTRY,
    GET_AMOUNT_BY_DAY,
    GET_PROJECT_BY_MONTH,
    ADMIN_LOGOUT_URL,
    ADD_ADMIN_SERVICE_URL
}

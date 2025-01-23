
import axiosClient from "./axiosClient";

const BASE_URL = axiosClient.defaults.baseURL

export const API_ENDPOINTS = {
    superAdmin: {
        register: `${BASE_URL}/super-admin/register`,
        resetPassword: `${BASE_URL}/super-admin/reset-password`,
        requestNewCode: `${BASE_URL}/super-admin/new-verification-code`,
        verifyEmail: `${BASE_URL}/super-admin/verify-email`,
        login: `${BASE_URL}/super-admin/login`,
        forgotPassword: `${BASE_URL}/super-admin/forgot-password`,
    },
    admin: {
        login: `${BASE_URL}/admin/login`,
        update: `${BASE_URL}/admin/update`,
        create: `${BASE_URL}/admin/create`,
        get: `${BASE_URL}/admin`,
        delete: `${BASE_URL}/admin/delete`,
    },
    accountHolder: {
        login: `${BASE_URL}/account-holder/login`,
        update: `${BASE_URL}/account-holder/update`,
        create: `${BASE_URL}/account-holder/create`,
        get: `${BASE_URL}/account-holder/get`,
        getDetails:`${BASE_URL}/account-holder/details`,
        delete: `${BASE_URL}/account-holder/delete`,
    },
    bank: {
        create: `${BASE_URL}/bank/create`,
        bulkCreate: `${BASE_URL}/bank/bulk-create`,
        update: `${BASE_URL}/bank/update`,
        getAll: `${BASE_URL}/bank/`,
        delete: `${BASE_URL}/bank/delete`,
    },
    checkingAccount: {
        get: `${BASE_URL}/checking-account/get`,
        noTransaction: `${BASE_URL}/checking-account/no-transaction`,
        withTransaction: `${BASE_URL}/checking-account/with-transaction`,
        update: `${BASE_URL}/checking-account/update`,
        debit: `${BASE_URL}/checking-account/debit`,
    },
    termDepositAccount: {
        update: `${BASE_URL}/term-deposit-account/update`,
        get: `${BASE_URL}/term-deposit-account/get`,
    },
    secondParty: {
        create: `${BASE_URL}/second-party/create`,
        bulkCreate: `${BASE_URL}/second-party/bulk-create`,
        update: `${BASE_URL}/second-party/update`,
        getAll: `${BASE_URL}/second-party`,
        delete: `${BASE_URL}/second-party/delete`,
    },
    transaction: {
        update: `${BASE_URL}/transaction/update`,
        delete: `${BASE_URL}/transaction/delete`,
        get: `${BASE_URL}/transaction/get`
    },
};

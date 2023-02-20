import axios from "axios";
import qs from 'qs';
import { getSessionToken } from '@shopify/app-bridge-utils';
import createApp from '@shopify/app-bridge';

// const api = "https://dev.scriptengine.net/subscription/public/api";
const api = "http://development.subscription.com/api";

const instance = axios.create();
const urlParams = new URLSearchParams(window.location.search);
const host = urlParams.get('host');

if (host && window.self !== window.top) {
    const app = createApp({
        apiKey: '5a239888c8ec9280a7d8ec823cc2743f',
        host
    });
    instance.interceptors.request.use(function (config) {
        return getSessionToken(app).then((token) => {
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            } else {
                const params = Object.fromEntries(urlParams);
                config.headers["Authorization"] = JSON.stringify(params);
            }
            return config;
        });
    });
} else {
    instance.interceptors.request.use(function (config) {
        const params = Object.fromEntries(urlParams);
        config.headers["Authorization"] = JSON.stringify(params);
        return config;
    });
}

export class ApiService {
    async getData(url, header) {
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                ...header || {}
            }
        };
        let resData = '';
        let response = '';
        await instance.get(url, config).then((res) => {
            if (res.data.status === 200) {
                response = res.data;
            } else {
                response = res.data
            }
        }).catch((e) => {
            resData = e && e.response && e.response.data;
        })
        return resData || response
    }

    async postData(url, data, isFormData, header) {
        const newData = qs.stringify(data);
        const config = {
            headers: {
                'content-type': isFormData ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
                ...header || {}
            }
        }
        let resData = '';
        let response = '';
        await instance.post(url, isFormData ? data : newData, config).then((res) => {
            if (res.data.status === 200) {
                response = res.data;
            } else {
                response = res.data
            }
        }).catch((e) => {
            resData = e.response.data;
        })
        return resData || response
    }

    async putData(url, data, header) {
        const newData = qs.stringify(data);
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                ...header || {}
            }
        }
        let resData = '';
        let response = '';
        await instance.put(url, newData, config).then((res) => {
            if (res.data.status === 200) {
                response = res.data;
            } else {
                response = res.data
            }
        }).catch((e) => {
            resData = e.response.data;
        })
        return resData || response
    }

    async deleteData(url, header) {
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                ...header || {}
            }
        }
        let resData = '';
        let response = '';
        await instance.delete(url, config).then((res) => {
            if (res.data.status === 200) {
                response = res.data;
            } else {
                response = res.data
            }
        }).catch((e) => {
            resData = e.response.data;
        })
        return resData || response
    }

    async postDataAuth(url, data, header) {
        const newData = qs.stringify(data);
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                ...header || {}
            }
        }
        let resData = '';
        let response = '';
        await axios.post(url, newData, config).then((res) => {
            if (res.data.status === 200) {
                response = res.data;
            } else {
                response = res.data
            }
        }).catch((e) => {
            resData = e.response.data;
        })
        return resData || response
    }
    async postMethodInstall(url, data, headers, cancelToken) {
        const NewData = qs.stringify(data);
        const config = {
            headers: {
                ...(headers || {}),
                'content-type': 'application/x-www-form-urlencoded',
            },
        };
        if (cancelToken && cancelToken.token) {
            config.cancelToken = cancelToken.token;
        }
        let resData = '';
        const response = await axios.post(url, NewData, config).catch(thrown => {
            if (thrown.toString() === 'Cancel') {
                resData = 'cancel';
            } else {
                resData = { error: 'something went wrong' };;
            }
        });
        return resData || response.data;
    }

    async getDetails(payload) {
        return await this.postMethodInstall(`${api}/get-shop`, payload);
    }
    async getDashboard() {
        return await this.getData(`${api}/dashboard`);
    }
    async createSubscriptionPlan(payload) {
        return await this.postData(`${api}/selling-plans-create`, payload);
    }
    async getSellingPlanList(payload) {
        return await this.postData(`${api}/selling-plans-list`, payload);
    }
    async getSellingPlanDetails(id) {
        return await this.getData(`${api}/selling-plans-edit/${id}`);
    }
    async deleteSellingPlan(payload) {
        return await this.postData(`${api}/selling-plans-delete`, payload);
    }
    async updateSubscriptionPlan(payload) {
        return await this.postData(`${api}/selling-plans-update`, payload);
    }
    async getSubscriptionContractList(payload) {
        return await this.postData(`${api}/subscription-list`, payload);
    }
    async getSettings(payload) {
        return await this.postData(`${api}/get-settings`, payload);

    }
    async saveSettings(payload) {
        return await this.postData(`${api}/save-settings`, payload);

    }
}

export default ApiService

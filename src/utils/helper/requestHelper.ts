import axois, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import * as Cookies from 'js-cookie';
import { eventHelper } from './eventHelper';
import { auth } from '../Base/Auth';
import { helper } from '../Base/Helper';
import { Toast } from 'antd-mobile';


export interface IApiNotice {
    code: string;
    noticeMessage: string;
    message: string;
    warnMessage: string;
}

let host: string = typeof (apiServiceHost) !== 'undefined' ? apiServiceHost : 'localhost:3000';
export const requestHelper: AxiosInstance = axois.create({
    baseURL: host,
    headers: {
        'x-hys-session': auth.sessionId,
        'x-hys-platform': auth.platform,
        'x-lang': loginUser && loginUser.lang,
        'x-authenticity-token': Cookies.get('authenticityToken')
    }
});
requestHelper.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res.status === 401) {
            eventHelper.dispatch(eventHelper.event.AuthFail);
        }
        if (res.data.status !== 0) {
            let mobile = false
            if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                mobile = true;
            } else {
                mobile = false;
            }
            if (res.data.noticeMessage) {
                if (!mobile) {
                    helper.message.noticeMessage(res.data.noticeMessage);
                }else{
                    Toast.info(res.data.noticeMessage);
                }
            } else if (res.data.warnMessage) {
                if (!mobile) {
                    console.log('pc')
                    helper.message.warnMessage(res.data.warnMessage);
                }else{

                    console.log('mobile')
                    Toast.fail(res.data.warnMessage);
                }
            }
        }
        if (res.data.code === 400 || res.data.code === 404 || res.data.code === 401) {
            return Promise.reject(res.data);
        }
        return res;
    },
    (err: AxiosError) => {
        let showReport: boolean = true;
        let res = err.response;
        if (res === undefined) {
            return Promise.reject({});
        }
        if (res.status === 401) {
            showReport = false;
            eventHelper.dispatch(eventHelper.event.AuthFail);
        }
        let message = res.data;
        if (message && message.noticeMessage) {
            eventHelper.dispatch(eventHelper.event.WarnMessage, res.data.noticeMessage);
            showReport = false;
        } else if (message && message.warnMessage) {
            eventHelper.dispatch(eventHelper.event.WarnMessage, res.data.warnMessage);
            showReport = false;
        } else if (message && message.message) {
            showReport = false;
        }
        if (showReport === true) {
            // not report service error
            // sentry.reportServiceError(err);
        }
        return Promise.reject(res && res.data);
    }
);

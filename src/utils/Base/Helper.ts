import { auth } from './Auth';
import { Abilities } from 'booking/booking.interface';
import { Translation } from './Helpers/Translation';
import { Urls } from './Helpers/Urls';
import { Moment } from 'moment';
import { messageHelper } from '../../Helper/MessageHelper';
import { deviceHelper } from 'app/helper/device.helper';
import { Platform } from 'app/enum/platform';
import { IsTypes } from 'app/utils/is.type';
interface ITreeData {
    children?: Array<ITreeData>;
    key: string;
    id: string;
    value: string;[x: string]: any;

    label: string;
}
class Helper {
    urls = new Urls();
    message = messageHelper;
    getParameterByName(name: string, url?: string) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) {
            return undefined;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    setTreeKey<T extends Array<ITreeData>>(treeData: T, key: string = 'id', value: string = 'name') {
        treeData.map(data => {
            data.key = data[key];
            data.value = data[key];
            data.label = data[value];
            if (data.children) {
                data.children = this.setTreeKey(data.children);
            }
        });
        return treeData;
    }
    getPath(path?: string) {
        if (path === undefined) {
            return '';
        }
        if (path.indexOf('/web/') > -1) {
            return path;
        }
        return (path[0] === '/' ? (contextPath || '') + '/web' : this.contextPath + '/web/') + path;
    }
    private get contextPath() {
        if (typeof contextPath === 'undefined') {
            return '/';
        } else {
            return contextPath;
        }
    }
    getMobilePath(...paths: Array<string>) {
        let baseUrl = this.contextPath + '/m/react/';
        let url = '';
        url = paths.join('/');
        if (paths.length === 0) {
            return baseUrl;
        }
        return (url[0] === '/' ? baseUrl : baseUrl) + url;
    }
    url(...paths: Array<string>) {
        if (deviceHelper.isMobile) {
            return this.getMobilePath(...paths);
        } else if (deviceHelper.isDesktop) {
            return this.getPath(paths[0]);
        } else {
            return '';
        }
    }
    hasAbility(abiliy: Abilities | string, entry: { abilities?: Array<string> }) {
        if (entry && entry.abilities && entry.abilities.indexOf) {
            return entry.abilities.indexOf(abiliy) > -1;
        }
        return false;
    }

    setDocumentTitle(title: string, pageURL?: string) {
        document.title = title;
        /*
        var i = document.createElement('iframe');
        i.src = '//m.baidu.com/favicon.ico';
        i.style.display = 'none';
        i.onload = () => {
            setTimeout(
                () => {
                    if (i.remove) {
                        i.remove();
                    }
                },
                9
            );
        };
        document.body.appendChild(i);
        */
        pageURL = pageURL ? pageURL : window.location.pathname;
        if (typeof (_hmt) !== 'undefined') {
            _hmt.push(['_trackPageview', pageURL]);
        }
    }
    get isMobile() {
        return auth.platform === Platform.WXMP;
    }
    get isDesktop() {
        return auth.platform === Platform.WEBAPP;
    }
    sameDay(day1: Moment, day2: Moment | any) {
        if (day1 === undefined || day2 === undefined) {
            return false;
        }
        if (!day1.format || !day2.format) {
            return false;
        }
        return day1.format('YYYY-MM-DD') === day2.format('YYYY-MM-DD');
    }
    formHasError(fieldsError: any) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    getRange(num: number) {
        let result: any[] = [];
        for (let i = 0; i < num; i++) {
            result.push(i);
        }
        return result;
    }

    get isAdmin() {
        return loginUser.roles.indexOf('ADMIN') !== -1;
    }
}

export const helper = new Helper();

export { Urls, IsTypes, Translation };

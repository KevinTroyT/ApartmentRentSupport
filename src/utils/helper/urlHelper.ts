import createBrowserHistory from 'history/createBrowserHistory';

export class UrlHelper {
    history = createBrowserHistory();
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
    matchUrl(url: string) {
        return this.history.location.pathname + '/' + url;
    }

    navigationTo(...paths: string[]) {
        if (paths.length === 1) {
            this.history.push(this.history.location.pathname + '/' + paths);
        } else {
            this.history.push(this.history.location.pathname + '/' + paths.join('/'));
        }
    }
}

export const urlHelper = new UrlHelper();

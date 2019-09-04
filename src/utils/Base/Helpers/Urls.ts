export class Urls {
    static getParameterByName(name: string, url?: string) {
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
    static getPath(...paths: Array<string>) {
        let url = '';
        url = paths.join('/');
        if(paths.length === 0) {
            return contextPath +'/web/';
        }
        return (url[0] === '/' ? contextPath +'/web' : contextPath +'/web/') + url;
    }

    static getUpPath(path: string, num: number=1) {
        let paths = path.split('/');
        Array(num).fill(0).map(()=> {
            paths.pop();
        });
        return paths.join('/');
    }
}
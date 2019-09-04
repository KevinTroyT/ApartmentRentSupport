class Auth {
    frontConfig: any = frontConfig || {};
    sessionId: string = typeof (sessionId) !== 'undefined' ? sessionId : '';
    apiServiceHost: string =  typeof (apiServiceHost) !== 'undefined' ? apiServiceHost : 'https://hyshi.bayrand.com/api/v2.0';
    platform: string = typeof (platform) !== 'undefined' ? platform : 'UNDEFINE';
    lang: string;
    setPlatform(platform1: string) {
        this.platform = platform1;
    }
    setLang(lang: string) {
        this.lang = lang;
    }
}

export const auth = new Auth();

import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

export const appContainer = new Container({autoBindInjectable: true, defaultScope: 'Singleton'});
export const appInject = getDecorators(appContainer);
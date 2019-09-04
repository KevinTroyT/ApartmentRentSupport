import * as log from 'loglevel';

export class Logs {
    static methodRecord(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        var originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            log.debug('Log Method', target, propertyKey);
            return originalMethod.apply(this, args);
        };
        return descriptor;
    }
}
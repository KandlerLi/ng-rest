import { HttpHeaders } from '@angular/common/http';
export class UrlMap {
    constructor(
        public url: string,
        public options?: any,
        public localCall?: boolean
    ) {}
}

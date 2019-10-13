import { HttpHeaders } from '@angular/common/http';
export class UrlMap {
    constructor(
        public url: string,
        public headers: HttpHeaders,
        public localCall: boolean = false
    ) {}
}

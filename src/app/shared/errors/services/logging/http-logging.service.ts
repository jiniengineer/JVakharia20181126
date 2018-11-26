import { Observable, of } from 'rxjs';

export class FakeHttpErrorService {
    static post(error): Observable<any> {
        console.log('Error sent to the server: ', error);
        return of(error);
    }
}

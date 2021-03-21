/* the following piece of code is obtained directly online haha, but in the future
if you want to call a function from a class to another class, you can use this class.
You may refer the use cases in item-list.component.ts and app.component.ts
But... PLEASE DO NOT ABUSE THIS CLASS!!!! THANKS. */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ComponentBridgingService {

    private subjects: Subject<any>[] = [];

    publish(eventName: string) {
        // ensure a subject for the event name exists
        this.subjects[eventName] = this.subjects[eventName] || new Subject();

        // publish event
        this.subjects[eventName].next();
    }

    on(eventName: string): Observable<any> {
        // ensure a subject for the event name exists
        this.subjects[eventName] = this.subjects[eventName] || new Subject();

        // return observable
        return this.subjects[eventName].asObservable();
    }

}
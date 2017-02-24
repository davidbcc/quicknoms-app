import { Injectable, NgZone } from "@angular/core";
import { Recipe } from "./recipes";
import firebase = require("nativescript-plugin-firebase");
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';

@Injectable()
export class RecipesService {
    constructor(
    private ngZone: NgZone,
  ){}

recipes: BehaviorSubject<Array<Recipe>> = new BehaviorSubject([]);
private _allRecipes: Array<Recipe> = [];

getRecipes(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'Recipes';
      
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(snapshot.value);
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();              
  }

  getRecipe(id: string): Observable<any> {
    return new Observable((observer: any) => {
      observer.next(this._allRecipes.filter(s => s.id === id)[0]);
    }).share();
  }

  handleSnapshot(data: any) {
    //empty array, then refill and filter
    this._allRecipes = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
          this._allRecipes.push(result);
      }
      this.publishUpdates();
    }
    return this._allRecipes;
  }

  getMessage(): Observable<any>{
    return new Observable((observer:any) => {
      firebase.getRemoteConfig({
      developerMode: true, 
      cacheExpirationSeconds: 300,
      properties: [{
      key: "message",
      default: "Welcome to QuickNoms!"
    }]
  }).then(
        function (result) {
          console.log("Fetched at " + result.lastFetch + (result.throttled ? " (throttled)" : ""));
          for (let entry in result.properties) 
            { 
              observer.next(result.properties[entry]);
            }
        }
    );
  }).share();
}

  publishUpdates() { 
    this.recipes.next([...this._allRecipes]);
  }

}

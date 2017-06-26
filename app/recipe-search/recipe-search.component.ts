import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from "@angular/router";
import {Algolia} from "nativescript-algolia";
var client = new Algolia('WZGM0BRSDB', '8f69d6ada2d9c2040176b1941c675887');
var index = client.initIndex("recipes");

@Component({
    selector: "recipesearch",
    moduleId: module.id,
    templateUrl: "./recipe-search.component.html",
})
export class RecipeSearchComponent {

    recipes$: Observable<any>;
                
    
    constructor(private router: Router) {}

    public search(e: any) {
        if (e && e.object) {
            index.search(e.object.text, (results, errors) => {
                for (let id in results.hits) {
                    let result = (<any>Object).assign({Name: results.hits[id].Name, Image: results.hits[id].Image});
                        this.recipes$.subscribe(result);
                }
            })
            
            }
        }
}
 
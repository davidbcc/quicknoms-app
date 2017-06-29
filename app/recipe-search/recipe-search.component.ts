import { Component, OnInit, NgZone } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from "@angular/router";
import {Algolia} from "nativescript-algolia";
var client = new Algolia('WZGM0BRSDB', '8f69d6ada2d9c2040176b1941c675887');
var index = client.initIndex("recipes");
import { LoadingIndicator } from "nativescript-loading-indicator";

@Component({
    selector: "recipesearch",
    moduleId: module.id,
    templateUrl: "./recipe-search.component.html",
})
export class RecipeSearchComponent {

    recipes: Array<any> = [];
    
    constructor(private router: Router, private ngZone: NgZone) {}
    loader = new LoadingIndicator();


    search(e: any) {
        this.loader.show({ message: 'Finding recipes...' });
        //clear
        this.recipes = [];
        if (e && e.object) {
            index.search(e.object.text, (results, errors) => {
                for (let id in results.hits) {
                    let result = (<any>Object).assign({id: results.hits[id].objectID, Name: results.hits[id].Name, Image: results.hits[id].Image});
                        this.ngZone.run(() => {
                             this.recipes.push(result);
                        })                        
                      this.loader.hide();
                    }
                })
            
            
            }
            else {
                alert("Sorry, no recipes found!");
                this.loader.hide();
            }
            
    }
    
    goToRecipe(id: string){
        this.router.navigate(["/recipe", id]);
    }
}
 
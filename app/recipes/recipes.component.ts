import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { RecipesService } from "../services/recipes.service";
import { Router } from "@angular/router";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./recipes.component.html",
})
export class RecipesComponent implements OnInit {
  
  public recipes$: Observable<any>;
  public message$: Observable<any>;

    constructor(private recipeService: RecipesService,
                private router: Router) 
                { }

    ngOnInit(): void {
        this.recipes$ = <any>this.recipeService.getRecipes();
        this.message$ = <any>this.recipeService.getMessage();
    }

     goToRecipe(id: string){
        this.router.navigate(["/recipe", id]);
    }
}

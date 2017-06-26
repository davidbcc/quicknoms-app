import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { RecipesService } from "../services/recipes.service";

@Component({
    selector: "home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  
  public message$: Observable<any>;

    constructor(private recipeService: RecipesService,
                private router: Router) 
                { }

    ngOnInit(): void {
        this.message$ = <any>this.recipeService.getMessage();
    }

    goToCategory(category: string){
        this.router.navigate(["/recipes", category]);
    }

    goToSearch(){
        this.router.navigate(["/search"]);
    }
}

import { Component, ChangeDetectionStrategy, OnInit, NgZone} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Recipe } from "./recipes";
import { RecipesService } from "./recipes.service";
import { SegmentedBarItem } from "ui/segmented-bar";

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./recipe-detail.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    private sub: any;
    id: string;
    name: string;
    notes: string;
    image: string;
    method: string;
    tools: string;
    ingredients: string;
    recipeSteps: Array<any>;
    public procedure: string;

    constructor(
        private recipeService: RecipesService,
        private route: ActivatedRoute,
        private ngZone: NgZone
    ) {
        this.recipeSteps = [{title: 'Ingredients'}, { title: 'Tools' }, { title: 'Procedure' }];
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe((params: any) => {
            this.id = params['id'];
            this.recipeService.getRecipe(this.id).subscribe((recipe) => {
                this.ngZone.run(() => {
                for (let prop in recipe) {
                    //props
                    if (prop === "id") {
                        this.id = recipe[prop];
                    }
                    if (prop === "Name") {
                        this.name = recipe[prop];
                    }
                    if (prop === "Notes") {
                        this.notes = recipe[prop];
                    }
                    if (prop === "Image") {
                        this.image = recipe[prop];
                    }
                    if (prop === "Tools") {
                        this.tools = recipe[prop];
                    }
                    if (prop === "Method") {
                        this.method = recipe[prop];
                    }
                    if (prop === "Ingredients") {
                        this.ingredients = recipe[prop];
                    }                       
                 }
                this.procedure = this.ingredients;
                });
            });
        });  
    }

    changeTab(id: number){

         switch (id) {
            case 0:
                this.procedure = this.ingredients; 
                break;
            case 1:
                this.procedure = this.tools; 
                break;
            case 2:
                this.procedure = this.method; 
                break;            
         }

    }

}


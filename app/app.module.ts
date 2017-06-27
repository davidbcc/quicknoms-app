import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { RecipesService } from "./services/recipes.service";

import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { HomeComponent } from "./home/home.component";
import { RecipeSearchComponent } from "./recipe-search/recipe-search.component";

import {TNSFontIconModule, TNSFontIconService, TNSFontIconPipe, TNSFontIconPurePipe} from 'nativescript-ngx-fonticon';

import firebase = require("nativescript-plugin-firebase");
firebase.init({
  //persist: true
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
  (instance) => {
    console.log("firebase.init done");
  },
  (error) => {
    console.log("firebase.init error: " + error);
  }
);
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        TNSFontIconModule.forRoot({
            'fa': 'fonts/font-awesome.css'
        })
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        RecipesComponent,
        RecipeSearchComponent,
        RecipeDetailComponent
    ],
    providers: [
        RecipesService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }

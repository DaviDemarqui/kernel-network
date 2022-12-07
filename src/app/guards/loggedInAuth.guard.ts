import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SupabaseService } from "../supabase.service";

@Injectable()
export class LoggedInAuthGuard implements CanActivate {

    constructor(private authService: SupabaseService, private _router: Router) { }

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            this._router.navigate(['/home'])
            return false
        } else {
            return true
        }
    }
}
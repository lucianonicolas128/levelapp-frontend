import { Component, OnInit } from '@angular/core';
import { Preferences } from '../../models/preferences';
import { PreferencesService } from '../../services/preferences.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
  providers: [PreferencesService, UploadService]
})
export class PreferencesComponent implements OnInit {
  public preferences: Preferences;
  public id: string;
  public status: string;
  public save_preferences;
  public preferenceses: Preferences[];
  company;
  aux;

  constructor(
    private authService: AuthService,
    private _preferencesService: PreferencesService,
  ) { }

  ngOnInit(): void {
    this.company = this.authService.getUID();
    this.getPreferenceses();
  }

  getPreferences(id) {
    this._preferencesService.getPreferences(id).subscribe(
      response => { this.preferences = response.preferences; },
      error => { console.log(<any>error); }
    )
  }

  getPreferenceses() {
    this._preferencesService.getPreferenceses().subscribe(
      response => {
        if (response.preferences) {
          this.preferenceses = response.preferences;
          this.aux = this.preferenceses.filter(preference => preference.company === this.company);
          this.preferences = this.aux[0];
          if (this.preferences) {
            this.id = this.preferences._id;
          }

          // console.log(this.aux)
          // if (this.id) {
          //   this.getPreferences(this.id);
          // }

        }
      },
      error => { console.log(<any>error); }
    )
  }

}

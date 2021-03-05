import { Component, OnInit } from '@angular/core';
import { Preferences } from '../../../models/preferences';
import { PreferencesService } from '../../../services/preferences.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-preferences',
  // templateUrl: '../add-preferences/add-preferences.component.html',
  templateUrl: './edit-preferences.component.html',
  styleUrls: ['./edit-preferences.component.css'],
  providers: [PreferencesService, UploadService]
})
export class EditPreferencesComponent implements OnInit {
  form!: FormGroup;
  public preferences: Preferences;
  public preferenceses: Preferences[];
  public id: string;
  public status: string;
  public save_preferences;
  aux;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _preferencesService: PreferencesService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void { this.getPreferenceses(); }

  getPreferences(id) {
    this._preferencesService.getPreferences(id).subscribe(
      response => { this.preferences = response.preferences; },
      error => { console.log(<any>error); }
    )
  }

  getPreferenceses() {
    let company = this.authService.getUID();
    this._preferencesService.getPreferenceses().subscribe(
      response => {
        if (response.preferences) {
          this.preferenceses = response.preferences;
          this.aux = this.preferenceses.filter(preference => preference.company === company);
          this.preferences = this.aux[0];
          if(this.preferences){
            this.form.patchValue(this.preferences);
          }
        }
      },
      error => { console.log(<any>error); }
    )
  }

  onSubmit(form) {
    let company = this.authService.getUID();
    this.preferences = this.form.value;
    this.preferences.company = company;
    this._preferencesService.updatePreferences(this.preferences).subscribe(
      response => {
        if (response.preferences) { this.status = 'succes'; }
        else { this.status = 'failed'; }
      },
      error => { console.log(<any>error); }
    );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [''],
      nameCommerce: ['', Validators.required],
      descriptionCommerce: [''],
      phoneContact: [''],
      emailContact: [''],
      ubicationContact: [''],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      linkedin: [''],
    });
  }

}
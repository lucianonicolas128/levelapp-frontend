import { Component, OnInit } from '@angular/core';
import { Preferences } from '../../../models/preferences';
import { PreferencesService } from '../../../services/preferences.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-preferences',
  templateUrl: './add-preferences.component.html',
  styleUrls: ['./add-preferences.component.css'],
  providers: [PreferencesService, UploadService]
})
export class AddPreferencesComponent implements OnInit {
  form!: FormGroup;
  public preferences: Preferences;
  public url: string;
  public id: string;
  public status: string;
  public filesToUpload: Array<File>;
  public save_preferences;

  constructor(
    private formBuilder: FormBuilder,
    private _preferencesService: PreferencesService,
    private authService: AuthService,
  ) {
    this.preferences = new Preferences('', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    this.buildForm();
  }

  ngOnInit(): void { }

  onSubmit(form) {
    let company = this.authService.getUID();
    this.preferences = this.form.value;
    this.preferences.company = company;
    this._preferencesService.savePreferences(this.preferences).subscribe(
      response => {
        if (response.preferences) {
          this.save_preferences = response.preferences;
          this.status = 'succes';
        } else { this.status = 'failed'; }

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

import { Component, OnInit } from '@angular/core';
import { Preferences } from '../../models/preferences';
import { PreferencesService } from '../../services/preferences.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
  providers: [PreferencesService, UploadService]
})
export class PreferencesComponent implements OnInit {

  public preferences: Preferences;
  public url: string;
  public id: string;
  public status: string;
  public filesToUpload: Array<File>;
  public save_preferences;

  constructor(
    private _preferencesService: PreferencesService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
    ) { 
      this.url = Global.url;
    }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Preferences } from '../../../models/preferences';
import { PreferencesService } from '../../../services/preferences.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-edit-preferences',
  templateUrl: '../add-preferences/add-preferences.component.html',
  styleUrls: ['./edit-preferences.component.css'],
  providers: [PreferencesService, UploadService]
})
export class EditPreferencesComponent implements OnInit {

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
    this._route.params.subscribe( params => {
      let id = params.id;
      this.getPreferences(id);
    });
  }

  getPreferences(id){
    this._preferencesService.getPreferences(this.id).subscribe(
      response => {
        this.preferences = response.preferences;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(form){
    this._preferencesService.updatePreferences(this.preferences).subscribe(
      response => {
        if(response.preferences){

          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image-preferences-logo/"+response.preferences._id, [], this.filesToUpload, 'image')
            .then((result:any) => {
              this.status = 'succes';
              console.log(result);
              this.save_preferences = result.preferences;
            });
            this._uploadService.makeFileRequest(Global.url+"upload-image-preferences-banner/"+response.preferences._id, [], this.filesToUpload, 'image')
            .then((result:any) => {
              this.status = 'succes';
              console.log(result);
              this.save_preferences = result.preferences;
              
              this._router.navigate(['/admin']);
            });
          }else{
            this.save_preferences = response.preferences;
            this.status = 'succes';
            this._router.navigate(['/admin']);
          }
        }else{
          this.status = 'failed';
        }
      
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
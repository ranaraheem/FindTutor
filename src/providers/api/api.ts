import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {API_URL, ACCESS_TOKEN} from '../../constants'
import 'rxjs/add/operator/map';
import {Profile} from '../../models/Profile';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage} from '@ionic/storage';
import { File } from '@ionic-native/file';



@Injectable()
export class ApiProvider {
header:Headers = new Headers();

  constructor(private storage:Storage, public http: Http, private transfer: FileTransfer) {
    this.header.append("Authorization","Bearer "+ACCESS_TOKEN );

  }
  loginUser(user){
    return this.http.post(API_URL+"profile/login", user, {
      headers: this.header
    });
  }
  signUpUser(user){
    return this.http.post(API_URL+"profile", user, {
      headers: this.header
    });
  }
  verifyUser(id){
    return this.http.put(API_URL+"profile/verify/"+ id, {
      headers: this.header
    });
  }
  
  checkEmailAvailability(email){
    return this.http.post(API_URL+"profile/email", {'email':email},{
      headers: this.header
    });
  }
  updateUserBasicInfo(id, info){
    return this.http.put(API_URL+"profile/" + id, info,{
      headers: this.header
    });
  }
  uploadPic(path, id){
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
       fileKey: 'profilePic',
       headers: this.header,
       
    }
   		fileTransfer.upload(path, API_URL+'uploadPic/'+id, options)
        .then((data) => {
         }, (err) => {
          console.log('error: '+ err);
         })
  }
  location(lat, lon, id){
    return this.http.put(API_URL+"profile/location/" + id, {"lat": lat, "lon":lon},{
      headers: this.header
    });
  }

  educationlLevelAll(){
    return this.http.get(API_URL+'educationlevel', {headers:this.header});
  }
  education(info){
    return this.http.post(API_URL+'education', info, {headers:this.header});
  }

  courseAll(){
    return this.http.get(API_URL+'course', {headers:this.header});
  }
  createCourse(name){
    return this.http.post(API_URL+'course',{"name":name}, {headers:this.header});
  
  }
  createOfferedCourse(data){
    return this.http.post(API_URL+'courseOffered', data, {headers:this.header});
  }
  getAllofferedCourses(){
    return this.http.get(API_URL+'courseOffered', {headers:this.header});
  }
  getTutorCourses(){
    return this.http.get(API_URL+'tutorcourses', {headers:this.header});
  }
  getTutorCoursesById(id){
    return this.http.get(API_URL+'tutorcourses/'+id, {headers:this.header});
  }
  deleteTutorCourses(id){
    return this.http.delete(API_URL+'tutorcourses/'+id, {headers:this.header});
  }

  getUserbyId(id){
    return this.http.get(API_URL+'profile/'+id, {headers:this.header});

  }
}

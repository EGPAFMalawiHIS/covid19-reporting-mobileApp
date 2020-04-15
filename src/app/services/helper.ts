import { Injectable } from '@angular/core';
import { Platform} from '@ionic/angular';
//import { Config } from '../config';
import { ModalController,LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class HelperService {

	private vendor = new BehaviorSubject({});
  	public vendorData = this.vendor.asObservable();

  	private lastmessage = new BehaviorSubject([]);
  	public lastmessageData = this.lastmessage.asObservable();

	constructor() {

	}

	public  async loading(loadingCtrl,message)
	{

	    let loading = await loadingCtrl.create({
	        spinner: 'hide',
	        content: '<div class="custom-spinner-container"><div class="custom-spinner-box">'+message+'</div></div>'
	    });

	    return await loading;

	}
	public isEmptyObj(value){
  		return (value == null || value.length === 0);
	}

	public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
      return (group: FormGroup): {[key: string]: any} => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if (password.value !== confirmPassword.value) {
          return {
            mismatchedPasswords: true
          };
        }
      }
    }

    public changeVendor(vendor) {
    this.vendor.next(vendor);
  }

  public changeLastmessage(message) {
    this.lastmessage.next(message);
  }

    
   	public getParam(url) {
		var params = {};
		var parser = document.createElement('a');
		parser.href = url;
		var query = parser.search.substring(1);
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			params[pair[0]] = decodeURIComponent(pair[1]);
		}
		return params;
	}


	public baseUrl(data){
		if(data)
		{
	    	let ext = data.split('.');

	    	if(ext.length > 1 && ext[1] == 'svg')
	    	{
	      	return 'assets/img/avatar/';

	    	}
	    	else{
	      	return   'uploads/images/';
	    	}
	    }
	    else{
	    	return ''
	    }



}


public uniqueValues(data){
	var uniqueArray = Array.from(new Set(data));
	return uniqueArray;
}

}
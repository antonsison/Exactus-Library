import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


export class SearchForm {
    public form: FormGroup;

    constructor (data) {
      this.form = new FormBuilder().group({
          search_text : new FormControl(null, [Validators.required]),
      });
    }
  }
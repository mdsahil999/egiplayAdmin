import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() columns: any[] = [];
  @Output() saveEvent:EventEmitter<any> =new EventEmitter<any>();
  form!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    // const group: any = {};
    // this.columns.forEach(question => {
    //   group[question.name] = new FormControl(question.value || '', Validators.required);
    // });
    this.form = new FormGroup(
        this.columns.reduce((memo, fieldDesc) => {
          return {
            ...memo,
            [fieldDesc.name]: new FormControl('', Validators.required),
          };
        }, {})
      );
    console.log("this.form", this.form);
  }
  //get isValid() { return this.form.controls[this.columns.name].valid; }
  public profileSubmit(data: any): void{
    console.log("edit  form", data.value);
    // if(this.form.invalid)
    // return;
    this.saveEvent.emit(data.value);

  }

  public ngOnChanges(){
    this.form = new FormGroup(
      this.columns.reduce((memo, fieldDesc) => {
        return {
          ...memo,
          [fieldDesc.name]: new FormControl('', Validators.required),
        };
      }, {})
    );
  }

  public getTournamentsValueTest(value: any){
     return value.option;
  }

}

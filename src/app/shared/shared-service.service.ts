import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private selectedOptionSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  coloumnRows: string[] = [];
  fkSchemaTableId : string;
  selectedOption:string;
  constructor() { }
  setColoumnRows(columns: string[]) {
    this.coloumnRows = columns;
    console.log(this.coloumnRows)
  }

  getColoumnRows() {
    console.log(this.coloumnRows);
    return this.coloumnRows;
  }
  setData(data: any): void {
    this.dataSubject.next(data);
  }

  getData(): BehaviorSubject<any> {
    return this.dataSubject;
  }
  setColumnData(data:any) : void {
    this.dataSubject.next(data)
    console.log(data)

  }
  getColumnData() {
    return this.dataSubject;
  }


  setFkSchemaTableId(id:string){
this.fkSchemaTableId = id;
  }
  getFkSchemaTableId(){
return this.fkSchemaTableId;
  }

  setSelectedOption(option :string) :void {
    this.selectedOption = option;
  }

  getSelectedOption(){
    return this.selectedOption;
  }
  // setSelectedOption(option: string): void {
  //   this.selectedOptionSubject.next(option);
  // }
  // getSelectedOption(): string {
  //   return this.selectedOptionSubject.value;
  // }
}

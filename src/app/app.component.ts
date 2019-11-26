import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'swayaan';
  public gridOptions;
  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public rowData;
  private rowSelection;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {headerName: 'ID', field: 'id'},
      {headerName: 'Name', field: 'name', editable: true},
      {headerName: 'Year', field: 'year',  editable: true},
      {headerName: 'Color', field: 'color', editable: true},
      {headerName: 'Pantone Value', field: 'pantone_value',  editable: true}
    ],
    this.rowData = [],
    this.rowSelection = 'single'
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get('https://reqres.in/api/posts')
      .subscribe(r => {
        this.rowData = r["data"];
      });

    // this method is for get data and do get api call
  }

  onBtAdd(){
    this.http
      .post('https://reqres.in/api/posts', 
      {
        "name": "Uddeshya",
        "year": 2017,
        "color": "#67HG88",
        "pantone_value": "87-GHH"
      })
      .subscribe(r => {
        delete r["createdAt"];
        this.gridApi.updateRowData({ add: [r] });
      });

    // this method is for add row in the list and do post api call to insert data
  }

  onBtRemove(){
    var selectedRows = this.gridApi.getSelectedRows();
    this.gridApi.updateRowData({ remove: selectedRows });

    // this method is for remove row in the list to delete data.
    // And i tried for api call but the responce in postman 204 coming.

  }

  onCellValueChanged(params) {
    const colId = params.column.getId();
    const newValue = params.newValue;
    const index = params.rowIndex;

    this.http
      .put('https://reqres.in/api/posts/597', this.rowData[index])
      .subscribe(r => {
        delete r["updatedAt"];
        this.rowData[index][colId] = newValue;
      });

    // this method is for update row in the list and do put api call to update data.
    // You will able to update/edit on double click on row cell and press enter
  }

  // to do this all operation we using ag-grid to show list and do put, post, get operation
}

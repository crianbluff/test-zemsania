import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiCatalogService {

  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private http:HttpClient) { }

  getQuery(query?:string) {
    const url = `https://datos.gob.es/apidata/catalog/distribution${query}`;
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.get(url, {headers});
  }

  getCatalog(pageSize:any, pageIndex) {
    return this.getQuery(`?_pageSize=${pageSize}&_page=${pageIndex}`)
    .pipe( map( data => data['result'].items ));
  }

  getCatalogById(id) {
    return this.getQuery(`/dataset/${id}`)
    .pipe( map( data => data['result'].items ));
  }

  updateIssue(issue): void {
    this.dialogData = issue;
  }

  deleteIssue(title: string): void {
    // console.log(title);
  }
}
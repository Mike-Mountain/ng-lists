import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { ListStore, ListState } from './list.store';
import {Observable, tap} from "rxjs";
import {map} from "rxjs/operators";
import {List} from "./list.model";
import {createListsQueryString} from "../../utils";
import {StrapiResponse} from "../models/strapi-response.model";

@Injectable({ providedIn: 'root' })
export class ListService extends NgEntityService<ListState> {

  constructor(override store: ListStore) {
    super(store);
  }

  getListById(id: number): Observable<List> {
    const url = `${super.api}/${id}`;
    return super.getHttp().get<StrapiResponse<List>>(`${url}?populate${createListsQueryString()}`).pipe(
      map((response) => {
        return {
          ...response.data.attributes,
          id: response.data.id,
        }
      }),
      tap((list) => {
        this.store.upsert(list.id, list);
      })
    );
  }

  updateEntity(id: number, list: List) {
    let url = `${super.api}/${id}`;
    return super.getHttp().put<StrapiResponse<List>>(`${url}?populate${createListsQueryString()}`, {data: {id, attributes: list}}).pipe(
      tap(data => {
        console.log(data);
        this.store.replace(id, list)
      })
    )
  }

}

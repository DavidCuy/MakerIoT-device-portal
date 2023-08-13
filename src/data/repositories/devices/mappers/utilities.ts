import { HttpHeaders, HttpParams } from '@angular/common/http';

function get_column_filters_params (params: {
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships?: string[]
    }): HttpParams {
    let sendParams: HttpParams = new HttpParams({fromObject: {
        page: params.page ? params.page : 1,
        perPage: params.perPage ? params.perPage : 10
    }})
    for (let valuePair of params.filterByColum ? params.filterByColum : []) {
        sendParams = sendParams.append(valuePair.name, valuePair.value)
    }
    for (let valuePair of params.searchByColumn ? params.searchByColumn : []) {
        sendParams = sendParams.append(`search-${valuePair.name}`, valuePair.value)
    }
    for (let relation of params.relationships ? params.relationships : []){
        sendParams = sendParams.append('relationships', relation)
    }
    return sendParams;
}

function get_post_headers () : HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
}

export { get_column_filters_params, get_post_headers }
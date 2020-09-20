import { Observable } from 'rxjs'
import { AjaxResponse } from 'rxjs/ajax'
import { AjaxObservable } from 'rxjs/internal/observable/dom/AjaxObservable'
import { ACCESS_TOKEN, getCookies } from '../share/utils/cookie-util'

const timeout = 10000 // 10 seconds

const defaultHeaders = {
    Authorization: `Bearer ${getCookies(ACCESS_TOKEN)}`,
    'Content-Type': 'application/json'
}

/**
 * This function is used to get resources from API
 *
 * @param url
 */
export function get(url: string): Observable<AjaxResponse> {
    return AjaxObservable.create({ url, headers: defaultHeaders, timeout, method: 'GET' })
    // return ajax.get(url, defaultHeaders)
}

/**
 * This function is used to create resource
 *
 * @param url
 */
export function create(url: string, body: Record<string, unknown>): Observable<AjaxResponse> {
    return AjaxObservable.create({ url, headers: defaultHeaders, timeout, method: 'POST', body })
}

/**
 * This function is used to update resource
 *
 * @param url
 */
export function update(url: string, body: Record<string, unknown>): Observable<AjaxResponse> {
    return AjaxObservable.create({ url, headers: defaultHeaders, timeout, method: 'PATCH', body })
}

/**
 * This function is used to delete resource
 *
 * @param url
 */
export function remove(url: string): Observable<AjaxResponse> {
    return AjaxObservable.create({ url, headers: defaultHeaders, timeout, method: 'DELETE' })
}

import { Observable } from 'rxjs'
import { AjaxResponse } from 'rxjs/ajax'
import { LOGIN_URL } from '../share/common/api-constants'
import { UserLoginState } from '../share/interface/Login'
import { create } from './base.service'

export function postLogin(credentials: UserLoginState = {}): Observable<AjaxResponse> {
    return create(LOGIN_URL, credentials)
}

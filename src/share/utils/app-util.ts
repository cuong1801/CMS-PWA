import { History } from 'history'
import { DATE_FORMAT } from '../common/app-constants'
import { LoginResponse } from '../interface/Login'
import { Unknown } from '../interface/Unknown'
import { ACCESS_TOKEN, EXPIRES_IN, setCookies } from './cookie-util'
import { defaulValueFormat } from './date-util'
import { isStringEmpty } from './empty-util'

export function updateCookie(loginResponse: LoginResponse): void {
    const expiresIn = loginResponse.expiresIn ? parseInt(loginResponse.expiresIn) : undefined
    const options = {
        [EXPIRES_IN]: loginResponse.expiresIn,
        [ACCESS_TOKEN]: loginResponse.accessToken
    }
    setCookies(options, expiresIn)
}

export function checkIsMobile(): boolean {
    return window.innerWidth < 991
}

export function initialValuesFromQueryString(): Unknown {
    const initial = {}
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.forEach((value, key) => {
        if (key.toLowerCase().includes('date')) {
            initial[key] = defaulValueFormat(value, DATE_FORMAT)
        } else {
            initial[key] = precheckValue(value)
        }
    })
    return initial
}

export function buildQuerySearchFromObject(search: Unknown): string {
    const searchParams: URLSearchParams = new URLSearchParams('')
    Object.keys(search).map((key) => {
        if (search[key]) searchParams.set(key, search[key])
    })
    return searchParams.toString()
}

export function updateURLSearch(history: History<History.PoorMansUnknown>, path: string, queryParams: string): void {
    const search = isStringEmpty(queryParams)
        ? queryParams
        : `?${buildQuerySearch(history.location.search, queryParams)}`
    history.replace({ pathname: path, search: search })
}

function buildQuerySearch(currentQuery: string, newQuery: string): string {
    const currentQueryParams = {}
    const newQueryParams = {}
    new URLSearchParams(currentQuery).forEach((value, key) => {
        currentQueryParams[key] = value
    })
    new URLSearchParams(newQuery).forEach((value, key) => {
        newQueryParams[key] = value
    })

    return new URLSearchParams(Object.assign({}, currentQueryParams, newQueryParams)).toString()
}

const booleanValues = ['true', 'false', '1', '0']
function precheckValue(value: string): boolean | string {
    const decoded = decodeURIComponent(value)
    if (booleanValues.includes(decoded)) {
        return value === ('true' || '1')
    }
    return decoded
}

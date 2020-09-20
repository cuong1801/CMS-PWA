import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MenuPaths } from '../../../share/common/app-constants'
import { requestCancelableOnClick } from '../../../share/hooks/requestCancelable'
import { Company } from '../../../share/interface'
import { updateURLSearch } from '../../../share/utils/app-util'
import { mergeArray } from '../../../share/utils/array-util'
import Collapse from '../../../share/vendors/collapse'
import SForm, { SFormItem, SInputItem } from '../../../share/vendors/form'
import { Source, SSelect } from '../../../share/vendors/select'
import { doProductSearchAction } from '../../../store/actions/product.action'
import { AppState } from '../../../store/types'
import '../styles/index.scss'

type SearchItemProps = { doAction: (value: string, key: string) => void }
export default function SearchOption(): JSX.Element {
    const history = useHistory()
    const dispatch = useDispatch()
    const searchParams = new URLSearchParams(window.location.search)

    function requestHandler(value: string, key: string) {
        const clear = value === 'clear'
        if (value === '') {
            // searchParams.delete(key)
            history.location.search = window.location.search.replace(/price=.*&|price=.*/, 'a')
        }
        console.log('object :>> ', window.location.search.replace(key + '=' + searchParams.get(key), ''))
        const body = value === 'clear' ? { page: 1 } : { [key]: value }
        updateURLSearch(
            history,
            MenuPaths.product,
            clear ? '' : value === '' ? '' : `${key}=${encodeURIComponent(value)}`
        )
        requestCancelableOnClick({ body, dispatch, actionHandler: doProductSearchAction })
    }
    const onSearchProduct = useCallback((event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault()
    }, [])

    return (
        <div id='product-tab' className='row'>
            <Collapse id='search-text' title='Tìm kiếm' role='button'>
                <div className='search-text'>
                    <SForm className='search-body' onFinish={() => {}}>
                        <SFormItem name='name'>
                            <SInputItem
                                className='form-control search-product-name'
                                type='text'
                                placeholder='Tìm kiếm sản phẩm'
                            />
                        </SFormItem>
                        <PricingSearch doAction={requestHandler} />
                        <CompanySearch doAction={requestHandler} />
                        <div className='button-search'>
                            <button type='submit' onClick={onSearchProduct} className='btn search-submit'>
                                Tìm kiếm
                            </button>
                        </div>
                    </SForm>
                </div>
            </Collapse>
        </div>
    )
}

const CompanySearch = memo(
    ({ doAction }: SearchItemProps) => {
        const companies = useSelector<AppState, Company[] | undefined>((state) => state.products.companies)

        const onChangeHandler = (value: string) => {
            doAction(value, 'company')
        }

        const dataSource: Source[] = [{ name: 'Không chọn', id: '' }]
        if (companies) {
            mergeArray(
                dataSource,
                companies.map((item) => {
                    return { id: item.slug, name: item.name }
                })
            )
        }
        return (
            <SSelect
                dataSource={dataSource}
                className='search-company'
                placeholder='Chọn doanh nghiệp'
                onChange={onChangeHandler}
            />
        )
    },
    () => true
)

const pricingSearchSource: Source[] = [
    { name: 'Không chọn', id: '' },
    { name: 'Từ cao tới thấp', id: 'hight' },
    { name: 'Từ thấp tới cao', id: 'low' }
]
const PricingSearch = memo(
    ({ doAction }: SearchItemProps) => {
        const onChangeHandler = (value: string) => {
            doAction(value, 'price')
        }
        return (
            <SSelect
                dataSource={pricingSearchSource}
                className='sort-price'
                placeholder='Sắp xếp theo giá'
                onChange={onChangeHandler}
            />
        )
    },
    () => true
)

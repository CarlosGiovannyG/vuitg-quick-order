import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from 'react-apollo';
import UPDATE_CART from '../graphql/updateCart.graphql'
import GET_PRODUCT from '../graphql/getProductBySku.graphql'

const QuickOrder = () => {
  const [inputText, setInputText] = useState('')
  const [search, setSearch] = useState('')

  const [getProductData, { data: product }] = useLazyQuery(GET_PRODUCT)
  const [addToCart] = useMutation(UPDATE_CART)

  useEffect(() => {
    if (product) {

      let skuId = parseInt(inputText)
      addToCart({
        variables: {
          salesChannel: '1',
          items: [
            {
              id: skuId,
              quantity: 1,
              seller: '1'
            }
          ]
        }
      })
        .then(() => {
          window.location.href = '/checkout'
        })
    }
  }, [product, search])

  const handleChange = (event: any) => {
    setInputText(event.target.value)
    console.log("===>", inputText);

  }

  const searchProduct = (event: any) => {
    event.preventDefault()
    if (!inputText) {
      return
    } else {
      setSearch(inputText)
      addToCartProduct()
    }

  }

  const addToCartProduct = () => {
    getProductData({
      variables: {
        sku: inputText
      }
    })

  }

  return (
    <div>
      <h2>Compra rápida de VTEX IO</h2>
      <form onSubmit={searchProduct}>
        <div>
          <label htmlFor="sku">Ingrese el número de SKU</label>
        </div>
        <div>
          <input type="text" id='sku' onChange={handleChange} value={inputText} />
        </div>
        <div>
          <input type='submit' value={'Agrgar al Carrito'} />
        </div>
      </form>
    </div>
  )
}

export default QuickOrder

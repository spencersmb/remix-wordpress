export const CREATE_CART = `
  mutation createCart{
    cartCreate{
      cart{
        checkoutUrl
        id
      }
    }
  }
`
export const GET_CART = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId){
      checkoutUrl
      id
      estimatedCost{
        totalAmount{
          amount
        }
      }
      lines(first: 100){
        edges{
          node{
            quantity
            estimatedCost{
              subtotalAmount{
                amount
              }
              totalAmount{
                amount
              }
            }
            merchandise{
              ...on ProductVariant{
                id
                title
                product{
                  title
                }
                priceV2{
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`
export const ADD_ITEM_TO_CART = `
mutation AddToCart($cartId: ID!, $varientId: ID!){
  cartLinesAdd(cartId: $cartId, lines:[{quantity: 1, merchandiseId: $varientId}]){
    cart{
      lines(first: 100){
        edges{
          node{
            id
            quantity
            merchandise{
              ...on ProductVariant{
                product{
                  title
                }
              }
            }
          }
        }
      }
    }
  }
}
`
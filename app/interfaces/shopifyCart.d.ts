interface ICartLine {
  node: {
    id: string
    quantity: number
    merchandise: {
      product: {
        title: string
      }
    }
  }
}

interface ICartLines {
  edges: ICartLine[]
}

interface IShopifyCart {
  checkoutUrl: string
  lines: {
    edges: ICartLine[]
  }
  id: string
  isOpen: boolean
}

interface ICartQueryResponse {
  cartId: string
  checkoutUrl: string
}

interface IGetCartQueryResponse{
  cartId: string
  checkoutUrl: string
  estimatedCost:{
    totalAmount:{
      amount: string
    }
  }
  lines:{
    edges: ICartLine[]
  }
}

interface IAddCartItemResponse {
  cartLinesAdd: {
    cart: {
      lines: {
        edges: ICartLine[]
      }
    }
  }
}
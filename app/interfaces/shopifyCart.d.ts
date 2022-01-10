interface IShopifyCart {
  checkoutUrl: string
  lines: any[]
  id: string
  isOpen: boolean
}

interface ICartQueryResponse {
  cardId: string
  checkoutUrl: string
}

interface IGetCartQueryResponse{
  cardId: string
  checkoutUrl: string
  estimatedCost:{
    totalAmount:{
      amount: string
    }
  }
  lines:{
    edges: any[]
  }
}
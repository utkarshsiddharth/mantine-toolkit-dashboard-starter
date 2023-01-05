export const getTransactionHistory = `
query {
    Orders {
      docs {
        id
        user {
          firstName
        }
        paymentMode
        orderStatus
        orderAmount
        payment {
          orderCreationId
        }
      }
    }
  }
`

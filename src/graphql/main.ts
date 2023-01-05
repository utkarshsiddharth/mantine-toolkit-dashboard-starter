export const getTransactionHistory = `
query {
    Orders {
      docs {
        id
        user {
          firstName
        }
        orderStatus
        orderAmount
        payment {
          orderCreationId
        }
      }
    }
  }
`

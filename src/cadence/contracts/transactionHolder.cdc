/*

BettingPoolV1.cdc

Description:

The contract tracks user deposits. This deposits can then be used to purchase moments. Purchasing or transfering moments requires admin access.
The user can widthraw unused fund at any time without incurring in costs. Used funds are funds that were actually used to purchase NFTs.

If the purchase of a moment would set the contract's balance to a collateral rate less thant 100% - comission, it reverts.
The contract purchases NFTs by connecting to the TopShotMarketV3 contract.
These NFTs can be transferred to quiz winners (outside of the scope of this smart contract).

*/

import TopShot from 0x877931736ee77cff
import TopShotMarketV3 from 0x547f177b243b4d80
import FlowUtilityToken from 0x82ec283f88a62e65

access(all) contract BettingPool {

    // -----------------------------------------------------------------------
    // BettingPool deployment variables
    // -----------------------------------------------------------------------

    // The address to which commissions should be deposited
    pub fun commissionsAddress() : Address { return 0xfaf0cc52c6e3acaf }

    // The commission for used deposits
    pub fun commision() : UFix64 { return 5.0 }

    // -----------------------------------------------------------------------
    // BettingPool contract Events
    // -----------------------------------------------------------------------

    // Emitted when a NFT is purchased
    pub event momentPurchased(contractAddress: Address, momentID: UInt32)

    // Emitted when a new User is created
    pub event NewUser(userID: UInt64)

    // Emitted when a user deposits flow tokens
    pub event Deposit(userID: UInt64, amount: UFix64)

    // Emmitted when a user withdraws flow tokens
    pub event Withdrawal(userID: UInt64, amount: UFix64)

    // Emmited when the administrator withraws the accrued fees
    pub event AccruedFeesWithdrawn(amount: UFix64)

    // -----------------------------------------------------------------------
    // BettingPool contract-level fields.
    // These contain actual values that are stored in the smart contract.
    // -----------------------------------------------------------------------

    // Private vault with public deposit function
    access(self) var vault: @FlowUtilityToken.Vault

    access(self) var accruedFees: UFix64

    access(self) var adminCapability: Capability<&BettingPool.User>


    pub resource Administrator {
      // purchase
      // Allows the administrator to purchase moments with Flow tokens
      // The purchase is discounted from the user's owed amount

      // Parameters momentID: The ID of the moment that is being purchased
      pub fun purchaseMoment(momentID: UInt64, affectedUsers: @[User]): @TopShot.NFT {

          var i = 0
          while i < affectedUsers.length {
          let ref = &affectedUsers[i] as &BettingPool.User
          ref.updateOwedValue(adminCapability: BettingPool.adminCapability, newValue: ref.owedValue - (TopShotMarketV3.getPrice(momentID) / affectedUsers.length))
          }

         let moment = TopShotMarketV3.purchase(tokenID: momentID, buyTokens: BettingPool.vault)

          TopShot.MomentCollectionPublic.deposit(token: moment)
          return <- affectedUsers
      }
      
      // transfer
      //
      // Allows the administrator to transfer moments to other users
      pub fun transferMoment(momentID: UInt64, recipient: PublicAccount, ) {
        let moment =  TopShot.collection.withdraw(momentID)
        TopShot.MomentCollectionPublic.deposit(token: moment)
      }

      // withdraw
      //
      // Allows the administrator to withdraw the accrued fees
      pub fun withdrawAccruedFees(): @FlowUtilityToken.Vault {
          let vault <- BettingPool.vault.withdraw(amount: BettingPool.accruedFees)
          emit AccruedFeesWithdrawn(amount:  BettingPool.accruedFees)
          return <-vault
      }
    }

    // Users is a resource that holds all the individual users
    pub resource Users {
      pub var userMappings: @{UInt64: User}

      pub fun addUser(user: @User) {
        self.userMappings[user.uuid] <-! user
      }

      init() {
        self.userMappings <- {}
        }
      
      destroy() {
        destroy self.userMappings
        }
    }
    

    // User is a struct that holds the user deposits and know how much to return in the case of withdrawl
    // Funds are hold by this contract to ensure the liquidity needed to purchase moments at the best prices.
    // Once the funds are used to purchase a moment, this is reflected in the variable 'used'. Used funds have a set commission to ensure the profitability of the contract.
    pub resource User {
      pub var owedValue: UFix64

      access(all) fun updateOwedValue(adminCapability: Capability<&BettingPool.User>, newValue: UFix64) {
        pre {
        adminCapability.check(): "Not authorized to update value"
        }
        self.owedValue = newValue
      }

      init() {
        self.owedValue = 0.0
      }

      pub fun deposit(from: @FlowUtilityToken.Vault, amount:UFix64 ) {
        let from <- from as! @FlowUtilityToken.Vault
        BettingPool.vault.deposit(from: <-from)
        self.owedValue = self.owedValue + amount * 0.95

        emit Deposit(userID: self.uuid, amount: amount)
      }

      pub fun withdraw(amount: UFix64) {
        pre {
          self.owedValue <= amount: "Requested amount grater than owed!"
        }

        let vault <- BettingPool.vault.withdraw(amount: self.owedValue)
        emit Withdrawal(userID: self.uuid, amount: amount)
        return <-vault
      }  
  }

  pub fun createUser(): @User {
    var newUser <- create User()
    emit NewUser(userID: newUser.uuid)
    return <- newUser
  }

  init(adminCapability: Capability<&BettingPool.User>) {
        // Create a new pool Vault and save it in storage
        self.vault <- FlowUtilityToken.createEmptyVault() as! @FlowUtilityToken.Vault

        // Set accrued fees to zero
        self.accruedFees = 0.0

        self.adminCapability = adminCapability

        // Create a new Administrator resource
        let administrator <- create Administrator()
        self.account.save(<-administrator, to: /storage/administrator)
    }
}
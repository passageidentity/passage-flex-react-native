import PassageFlex

@objc(PassageFlexReactNative)
class PassageFlexReactNative: NSObject {
    
    private lazy var passageFlex: PassageFlex = {
        return PassageFlex(appId: appId)
    }()
    
    private var appId: String = ""
    
    @objc(initWithAppId:withResolver:withRejecter:)
    func initWithAppId(
        appId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) -> Void {
        self.appId = appId
        resolve(())
    }
    
    @objc(register:withResolver:withRejecter:)
    func register(
        transactionId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) -> Void {
        Task {
            do {
                if #available(iOS 16.0, *) {
                    let nonce = try await passageFlex.passkey.register(with: transactionId)
                    resolve(nonce)
                } else {
                    reject("PASSKEYS_NOT_SUPPORTED", "passkeys only supported on iOS 16 or newer", nil)
                }
            } catch {
                switch error {
                case PassagePasskeyAuthorizationError.userCanceled:
                    reject("USER_CANCELED", error.localizedDescription, error)
                default:
                    reject("PASSKEY_ERROR", error.localizedDescription, error)
                }
            }
        }
    }
    
    @objc(authenticate:withResolver:withRejecter:)
    func authenticate(
        transactionId: String?,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) -> Void {
        Task {
            do {
                if #available(iOS 16.0, *) {
                    let nonce = try await passageFlex.passkey.authenticate(with: transactionId)
                    resolve(nonce)
                } else {
                    reject("PASSKEYS_NOT_SUPPORTED", "passkeys only supported on iOS 16 or newer", nil)
                }
            } catch {
                switch error {
                case PassagePasskeyAuthorizationError.userCanceled:
                    reject("USER_CANCELED", error.localizedDescription, error)
                default:
                    reject("PASSKEY_ERROR", error.localizedDescription, error)
                }
            }
        }
    }
    
}

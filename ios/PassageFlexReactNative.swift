import PassageFlex

@objc(PassageFlexReactNative)
class PassageFlexReactNative: NSObject {
    
    @objc(register:withResolver:withRejecter:)
    func register(
        transactionId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) -> Void {
        Task {
            do {
                if #available(iOS 16.0, *) {
                    let nonce = try await PassageFlex.Passkey.register(with: transactionId)
                    resolve(nonce)
                } else {
                    // TODO: throw error
                }
            } catch {
                reject(error.localizedDescription, error.localizedDescription, error)
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
                    let nonce = try await PassageFlex.Passkey.authenticate(with: transactionId)
                    resolve(nonce)
                } else {
                    // TODO: throw error
                }
            } catch {
                reject(error.localizedDescription, error.localizedDescription, error)
            }
        }
    }
    
}

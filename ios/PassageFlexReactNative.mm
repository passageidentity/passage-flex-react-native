#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PassageFlexReactNative, NSObject)

RCT_EXTERN_METHOD(initWithAppId:(NSString *)appId
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject);

RCT_EXTERN_METHOD(register:(NSString *)transactionId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(authenticate:(nullable NSString *)transactionId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end

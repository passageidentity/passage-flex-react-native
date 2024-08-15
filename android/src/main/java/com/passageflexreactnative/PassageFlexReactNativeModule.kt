package com.passageflexreactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import id.passage.passageflex.PassageFlex
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class PassageFlexReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "PassageFlexReactNative"
  }

  @ReactMethod
  fun register(transactionId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        if (currentActivity == null) {
          // promise.reject(e)
          return@launch
        }
        val nonce = PassageFlex.Passkey.register(
          transactionId,
          currentActivity!!
          // Add authenticator attachment option?
        )
        promise.resolve(nonce)
      } catch (e: Exception) {
        promise.reject(e)
      }
    }
  }

  @ReactMethod
  fun authenticate(transactionId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        if (currentActivity == null) {
          // promise.reject(e)
          return@launch
        }
        val nonce = PassageFlex.Passkey.authenticate(
          transactionId,
          currentActivity!!
        )
        promise.resolve(nonce)
      } catch (e: Exception) {
        promise.reject(e)
      }
    }
  }

}

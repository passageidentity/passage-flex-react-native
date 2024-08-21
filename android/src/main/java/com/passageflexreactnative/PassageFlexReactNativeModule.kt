package com.passageflexreactnative

import android.app.Activity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import id.passage.passageflex.PassageFlex
import id.passage.passageflex.exceptions.AuthenticateCancellationException
import id.passage.passageflex.exceptions.RegisterCancellationException
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class PassageFlexReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private var appId: String = ""

  private val passageFlex: PassageFlex by lazy {
    PassageFlex(
      appId = appId,
      activity = currentActivity ?: Activity()
    )
  }

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun initWithAppId(appId: String, promise: Promise) {
    this.appId = appId
    promise.resolve(null)
  }

  companion object {
    const val NAME = "PassageFlexReactNative"
  }

  @ReactMethod
  fun register(transactionId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        if (currentActivity == null) {
          promise.reject("PASSKEY_ERROR", "App Activity not found", null)
          return@launch
        }
        val nonce = passageFlex.passkey.register(transactionId)
        promise.resolve(nonce)
      } catch (e: Exception) {
        var errorCode = "PASSKEY_ERROR"
        when (e) {
          is RegisterCancellationException -> {
            errorCode = "USER_CANCELED"
          }
        }
        promise.reject(errorCode, e.message, e)
      }
    }
  }

  @ReactMethod
  fun authenticate(transactionId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        if (currentActivity == null) {
          promise.reject("PASSKEY_ERROR", "App Activity not found", null)
          return@launch
        }
        val nonce = passageFlex.passkey.authenticate(transactionId)
        promise.resolve(nonce)
      } catch (e: Exception) {
        var errorCode = "PASSKEY_ERROR"
        when (e) {
          is AuthenticateCancellationException -> {
            errorCode = "USER_CANCELED"
          }
        }
        promise.reject(errorCode, e.message, e)
      }
    }
  }

}

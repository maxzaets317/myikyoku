package jp.co.medicalprinciple.myikyoku;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.rado.backgroundcolor.BackgroundColorPackage;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import jp.co.medicalprinciple.myikyoku.BuildConfig;
import com.oblador.vectoricons.VectorIconsPackage;

import io.repro.android.reactbridge.ReproReactBridgePackage;
import com.bebnev.RNUserAgentPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.repro.android.Repro;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BackgroundColorPackage(),
            new RNVersionNumberPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new ReproReactBridgePackage(),
            new RNUserAgentPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

	// Setup Repro
    Repro.setup(this, "ee9df5e5-4b21-4d5b-abb1-c20399bb41dd");
	Repro.enablePushNotification();

    // Setup other
    SoLoader.init(this, /* native exopackage */ false);
  }
}

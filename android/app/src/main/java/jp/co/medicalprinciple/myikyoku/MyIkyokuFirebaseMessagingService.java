package jp.co.medicalprinciple.myikyoku;

import android.content.Intent;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import io.repro.android.Repro;

public class MyIkyokuFirebaseMessagingService extends FirebaseMessagingService {

  public MyIkyokuFirebaseMessagingService() {
  }

  public void onMessageReceived(RemoteMessage remoteMessage) {
    super.onMessageReceived(remoteMessage);
  }

  @Override
  public void onNewToken(String token) {
    Repro.setPushRegistrationID(token);
  }
}

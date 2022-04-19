#include <BleKeyboard.h>

// shorter 15 character name seems to work better w. iPad
BleKeyboard bleKeyboard("ESP32-Keyboard2", "Me", 100);

#define BUTTON_PIN 2

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  Serial.begin(115200);
  Serial.println("Starting BLE work!");
  bleKeyboard.begin();
}

void loop() {
  static int debug = 0, counter = 0;
  char button = digitalRead(BUTTON_PIN) == LOW;

  if(button) counter++;
  
  if(bleKeyboard.isConnected() && !button && counter > 1) {
    Serial.println(counter);
   
    bleKeyboard.write(counter < 10 ? KEY_MEDIA_PLAY_PAUSE : KEY_MEDIA_PLAY_PAUSE);
    delay(100);
    bleKeyboard.releaseAll();

    counter = 0;
  }

  if(++debug % 20 == 0) Serial.println("sec");
  delay(50);
}

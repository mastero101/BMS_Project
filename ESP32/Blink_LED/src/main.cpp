#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

const int potPin = analogRead(4);
const int potPin2 = analogRead(2);
const int potPin3 = analogRead(15);

float voltage = 0;
float voltage2 = 0;
float voltage3 = 0;
int Percent = 0;
int Percent2 = 0;
int Percent3 = 0;
int Relay = 0;

// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "Mastero Wifi"
#define WIFI_PASSWORD "mastero101"

// Insert Firebase project API Key
#define API_KEY "AIzaSyB9DeucXIMQ9VaEHFBGFNLHnoLiuFO5SUM"

// Insert Authorized Email and Corresponding Password
#define USER_EMAIL "123456@gmail.com"
#define USER_PASSWORD "123456"

// Insert RTDB URLefine the RTDB URL
#define DATABASE_URL "https://bmsproject-bdfba-default-rtdb.firebaseio.com/"

// Define Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Variable to save USER UID
String uid;

// Database main path (to be updated in setup with the user UID)
String databasePath;
// Database child nodes
String voltPath = "/Voltage";
String voltPath2 = "/Voltage2";
String voltPath3 = "/Voltage3";
String percentPath = "/Percent";
String percentPath2 = "/Percent2";
String presPath = "/Relay";
String timePath = "/timestamp";

// Parent Node (to be updated in every loop)
String parentPath;

FirebaseJson json;

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

// Variable to save current epoch time
int timestamp;

// Timer variables (send new readings every three minutes)
unsigned long sendDataPrevMillis = 0;
unsigned long timerDelay = 300000;


// Initialize WiFi
void initWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
  Serial.println();
}

// Function that gets current epoch time
unsigned long getTime() {
  timeClient.update();
  unsigned long now = timeClient.getEpochTime();
  return now;
}

void setup() 
{
pinMode(potPin, INPUT_PULLUP);
pinMode(potPin2, INPUT_PULLUP);
pinMode(potPin3, INPUT_PULLUP);
Serial.begin(115200);
delay(10);

initWiFi();
timeClient.begin();

// Assign the api key (required)
  config.api_key = API_KEY;

  // Assign the user sign in credentials
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  // Assign the RTDB URL (required)
  config.database_url = DATABASE_URL;

  Firebase.reconnectWiFi(true);
  fbdo.setResponseSize(4096);

  // Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  // Assign the maximum retry of token generation
  config.max_token_generation_retry = 5;

  // Initialize the library with the Firebase authen and config
  Firebase.begin(&config, &auth);

  // Getting the user UID might take a few seconds
  Serial.println("Getting User UID");
  while ((auth.token.uid) == "") {
    Serial.print('.');
    delay(1000);
  }
  // Print user UID
  uid = auth.token.uid.c_str();
  Serial.print("User UID: ");
  Serial.println(uid);

  // Update database path
  databasePath = "/UsersData/" + uid + "/readings";
}

void handleRoot() {
  
}


void loop() {

  int nVoltageRaw = potPin;
  int nVoltageRaw2 = potPin2;
  int nVoltageRaw3 = potPin3;
  float fVoltage = (float)nVoltageRaw * 0.001985; //0.00486 Original
  float fVoltage2 = (float)nVoltageRaw2 * 0.003065; //0.00486 Original
  float fVoltage3 = (float)nVoltageRaw3 * 0.003025; //0.00486 Original

  float fVoltageMatrix[22][2] = {
    {4.15,  100},
    {4.12, 95},
    {4.10, 90},
    {4.05, 85},
    {4.00, 80},
    {3.95, 75},
    {3.90, 70},
    {3.85, 65},
    {3.80, 60},
    {3.75, 55},
    {3.70, 50},
    {3.65, 45},
    {3.60, 40},
    {3.55, 35},
    {3.50, 30},
    {3.45, 25},
    {3.40, 20},
    {3.30, 15},
    {3.20, 10},
    {3.10, 5},
    {3.0, 0},
    {0, 0}
  };

  int i, perc, perc2;

  perc = 100;

  for(i=3; i>=0; i--) {
    if(fVoltageMatrix[i][0] >= fVoltage) {
      perc = fVoltageMatrix[i + 1][1];
      break;
    }
  }

  perc2 = 100;

  for(i=3; i>=0; i--) {
    if(fVoltageMatrix[i][0] >= fVoltage2) {
      perc2 = fVoltageMatrix[i + 1][1];
      break;
    }
  }
 
    voltage = fVoltage;
    voltage2 = fVoltage2;
    voltage3 = fVoltage3;
    Percent = perc;
    Percent2 = perc2;
    //Relay = strLedPin;

        // Send new readings to database
  if (Firebase.ready() && (millis() - sendDataPrevMillis > timerDelay || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();

    //Get current timestamp
    timestamp = getTime();

    parentPath = databasePath + "/" ; //+ String(timestamp);

    json.set(voltPath.c_str(), String(voltage));
    json.set(voltPath2.c_str(), String(voltage2));
    json.set(voltPath3.c_str(), String(voltage3));
    json.set(percentPath.c_str(), String(Percent));
    json.set(percentPath2.c_str(), String(Percent2));
    json.set(timePath, String(timestamp));
    Serial.printf("Set json... %s\n", Firebase.RTDB.setJSON(&fbdo, parentPath.c_str(), &json) ? "ok" : fbdo.errorReason().c_str());

    Serial.print(voltage);
    Serial.println(" V");
    Serial.print(Percent);
    Serial.println(" %");
    Serial.print(voltage2);
    Serial.println(" V");
    Serial.print(Percent2);
    Serial.println(" %");
    Serial.print(voltage3);
    Serial.println(" V");
    Serial.print(Percent);
    Serial.println(" %");
    Serial.println(potPin);
    Serial.println(potPin2);
    Serial.println(potPin3);
  }
 }
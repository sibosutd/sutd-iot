
Android and Udoo Communication (Part 4)
========

> This documentation is for 50.001 IoT project. (Version: 1.0)

Table of Contents
-----------------

* [Introduction]()
* [Requirement]()
* [Steps]()
* [Reference]()

Introduction
-----------------

In this tutorial we’ll see how to implement an Android App and an Arduino sketch that exploit UDOO’s potentials thanks to the ADK (Accessory Development Kit). Take it as a learning excercise, because we’re just using the very basic Hello World you previously saw with Arduino. This time however, the LED will be turned on via an Android App.

The Accessory Development Kit provided by Google allows to building accessories for Android devices based on the Arduino framework so with UDOO we have the Android device and his Arduino accessory in the same board.

There’s an Arduino Due on UDOO so we can use the Google ADK 2012.

Requirement
-----------------

+ 1 UDOO board
+ MicroSD with Android preinstalled
+ 1 LED
+ An external PC with Android SDK and Arduino IDE installed

If you’ve met all the above requirements, let’s boot Android! 

Steps
-----------------

And let’s understand how the Sam3x Arduino controller is connected to IMX6, where Android runs. Using the ADK, the communication between i.MX6 processor running Android and SAM3x8E processors is not made through the shared serial port. It comes through the processors’ native USB OTG bus, instead. i.MX6’ s native USB OTG port can be switched between SAM3X8E microcontroller and external microUSB port CN3. The switching is managed by two i.Mx6 pins..

It is necessary to power OTG USB bus by plugging the jumper J2, which enables the voltage supply line of the bus.

At boot the connection is between the two processors, plugging an USB cable to CN3 connector will have no effect, since CN3 is disconnected.

Now go in the setting -> developer options and click on External OTG port enabled. Then we can plug the microUSB cable to che CN3 connector, a dialog pop-up will then appear and you have to allow the debug for your external computer. Check the box for always allow from this computer. 

Once you’ve prepared your development environment, let’s see how to build our Android APP.

For the Android app we use the USB Accessory mode that allows users to connect USB host hardware (the Arduino side of UDOO) specifically designed for Android-powered devices. The Accessory mode feature is supported by Android since the 3.1 version (API 12).

![accessory][accessory]

When the Android-powered device is in USB accessory mode, the connected USB hardware (an Android USB accessory in this case) acts as the host and powers the bus.

These are the needed components of the App:

#### AndroidManifest.xml

The following list describes what you need to add to your application’s manifest file before working with the USB accesory APIs

Include a <uses-feature> element that declares that your application uses the android.hardware.usb.accessory feature.

```xml
<uses-feature android:name="android.hardware.usb.accessory" />
```
Set the minimum SDK of the application at least to API Level 12. Since UDOO comes with the last Android image with the 4.3 version the targetSdkVersion is 18.
```xml
<uses-sdk android:minSdkVersion="15" android:targetSdkVersion="18" />
```
If you want your application to be notified of an attached USB accessory, specify an <intent-filter> and<meta-data> element pair for the android.hardware.usb.action.USB_ACCESSORY_ATTACHED intent in your main activity. The <meta-data> element points to an external XML resource file (res/xml/accessory_filter.xml) that declares identifying information about the accessory that you want to detect.

```xml
<activity
……

   <intent-filter>
      <action android:name="android.hardware.usb.action.USB_ACCESSORY_ATTACHED" />
   </intent-filter>

   <meta-data android:name="android.hardware.usb.action.USB_ACCESSORY_ATTACHED"
      android:resource="@xml/accessory_filter" />

</activity>
```

#### res/xml/accessory_filter.xml

In the XML resource file, declare <usb-accessory> elements for the accessories that you want to filter. Each<usb-accessory> can have the following attributes:

The same attributes have to declared in the Arduino sketch running on SAM3X

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
   <usb-accessory manufacturer="Aidilab" model="UDOO_ADK" version="1.0" />
</resources>
```

#### UDOOBlinkLEDActivity.java

In your Java code the package you need to import is `me.palazzetti.adktoolkit.AdkManager`. That contain the class to support the accessory mode.

import me.palazzetti.adktoolkit.AdkManager
You need to inizialize the AdkManager in the `onCreate()` method:

```java
private AdkManager mAdkManager;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    mAdkManager = new AdkManager((UsbManager) getSystemService(Context.USB_SERVICE));
}
```

To write and read messages to and from the Arduino accessory you can use the `writeSerial()` and `readSerial()` methods. You can write and read a single char or a String object. 

In this example we used only the `writeSerial()` method to write a single char in order to instruct the accessory to turns on (we send “1″) or turn off (we send “0″) the LED.

```java
if (buttonLED.isChecked()) {
    mAdkManager.writeSerial("1");
} else {
    mAdkManager.writeSerial("0");
}
```

You can check the full documentation of the ADK Toolkit for more information.

Now, we just set up, compile and Upload our Arduino Sketch.

#### UDOOArduinoADKDemo.ino

The accessory code must make a few calls to initialize USB connectivity, including setting the accessory identification strings:

```c
char descriptionName[] = "UDOOAndroidADKDemo";
char modelName[] = "UDOO_ADK";         // your Arduino Accessory name (Need to be the same defined in the Android App)
char manufacturerName[] = "Aidilab";   // manufacturer (Need to be the same defined in the Android App)

char versionNumber[] = "1.0";          // version (Need to be the same defined in the Android App)
char serialNumber[] = "1";
char url[] = "http://www.udoo.org";    // If there isn't any compatible app installed, Android suggest to visit this url

USBHost Usb;
ADK adk(&Usb, manufacturerName, modelName, descriptionName, versionNumber, url, serialNumber);
```

The identification strings must match the USB accessory filter settings specified in the connecting Android application,otherwise the application cannot connect with the accessory.

Once USB is enabled with code shown above, the accessory listens for connection requests. The ADK library handles listening and connection details, so the accessory calls USB.Task(); once during each loop execution.

The accessory must then check for a live USB connection to process commands and receive messages. :

```c
void loop()
{
    Usb.Task();

    if (adk.isReady()) {
       adk.read(&bytesRead, RCVSIZE, buf);// read data into buf array
       if (bytesRead > 0) {
          if (parseCommand(buf[0]) == 1) {
             // Received "1" - turn on LED
             digitalWrite(LED_PIN, HIGH);
          } else if (parseCommand(buf[0]) == 0) {
             // Received "0" - turn off LED
             digitalWrite(LED_PIN, LOW); 
          }
…
}

// the characters sent to Arduino are interpreted as ASCII, we decrease 48 to return to ASCII range.
uint8_t parseCommand(uint8_t received) {
  return received - 48;
}
``` 

Now, Arduino will listen as an USB accessory, and if it receives the byte 1, it will turn on the LED, otherwise it will turn it off. To check that’s working, all you have to do is connect the LED to the declared PIN, in this case 13.

Reference
-----------------

[Android And Arduino Simple Hello World Tutorial][ref0]

<!-- Links -->

[accessory]: pic/usb-host-accessory.png

[ref0]: http://www.udoo.org/docs/Android/Android_And_Arduino_Simple_Hello_World_Tutorial


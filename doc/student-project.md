
Instruction for IoT eHealth Showcase
========

> This documentation is for IoT eHealth showcase set-up. (Version: 1.0)

<!-- MarkdownTOC -->

- [Introduction](#introduction)
	- [System diagram](#system-diagram)
	- [Pre-requisite](#pre-requisite)
- [Program Arduino Uno](#program-arduino-uno)
- [Program Arduino Due](#program-arduino-due)
- [Upload Android Application](#upload-android-application)
- [Build HTTP Server](#build-http-server)
- [Reference](#reference)

<!-- /MarkdownTOC -->

Introduction
-----------------

### System diagram
![system-diagram][system]

### Pre-requisite

+ Download and install software from [here][software]
  + Install Serial Driver
  + Install Arduino IDE
    + Patch Arduino IDE with UDOO DUAL/QUAD patch
    + Copy eHealth and PinChangeInt Libraries to Arduino IDE folder `libraries`
  + Install Android Studio with SDK Android 4.3 (API 18)
+ Install Node.js with express, serialport

Program Arduino Uno
-----------------

> Note: make sure unplug any shield in Arduino board before uploading sketch and J18 jumper should be unplugged.

Connect Arduino Uno with PC via USB. Before uploading your sketch, you need to select the correct items from the **Tools > Board** and **Tools > Port** menus.

+ **Board**: Select the `Arduino Uno` to upload sketch to Arduino Uno
+ **Port**: On Windows, it's probably `COM1` or `COM2` (for a serial board) or `COM4`, `COM5`, `COM7`, or higher (for a USB board) - to find out, you look for USB serial device in the ports section of the Windows Device Manager.
+ **Sketch file**: Upload `sketch_ehealth_arduino.ino` file. Press the `upload` button in the toolbar. The Arduino IDE will display a message when the upload is complete, or show an error.

Program Arduino Due
-----------------

Connect `CN6` from Udoo board with PC. Before uploading your sketch, you need to select the correct items from the **Tools > Board** and **Tools > Port** menus.

+ **Board**: Select the `Arduino Due(Programming Port)` to upload sketch to Arduino Due
+ **Port**: Change to the correct port which should be different with Arduino Uno.
+ **Sketch file**: Upload `sketch_xbee_android_web.ino` file. Press the `upload` button in the toolbar. The Arduino IDE will display a message when the upload is complete, or show an error.

Upload Android Application
-----------------
> Note: Before uploading Android application, click on External OTG port enabled in Developer Options.

Connect `CN3` from Udoo board with PC. Import `UDOOTest` project to Android Studio. Compile and upload the application to Udoo board. After uploading, reset the board and a window will come out asking you whether to open the Android application after restarting.

Build HTTP Server
-----------------

Connect `CN6` from Udoo board with PC. Modify the variable `portName` inside `index.js` file if needed.

1. Open terminal
2. Change directory to `BASE_DIR/src/Web/SerialToBrowser/`
3. Simply enter `npm start`.

Reference
-----------------

+ [Tutorial 1: Udoo Introduction][tutorial_1]
+ [Tutorial 2: Sensor Platform][tutorial_2]
+ [Tutorial 3: XBee Communication][tutorial_3]
+ [Tutorial 4: Udoo and Android Communication][tutorial_4]

<!-- Links -->

[software]: ../doc/software.md
[system]: ../pic/system.png
[tutorial_1]: ../doc/tutorial-01-udoo.md
[tutorial_2]: ../doc/tutorial-02-sensor.md
[tutorial_3]: ../doc/tutorial-03-xbee.md
[tutorial_4]: ../doc/tutorial-04-android.md

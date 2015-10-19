
Arduino and Udoo controller (Part 1)
========

> This documentation is for 50.001 IoT project. (Version: 1.0)

Table of Contents
-----------------

<!-- MarkdownTOC -->

- [Arduino](#arduino)
    - [Introduction](#introduction)
    - [Arduino IDE](#arduino-ide)
        - [Installation](#installation)
        - [Writing Sketches](#writing-sketches)
        - [Programming Language](#programming-language)
        - [Uploading Sketch](#uploading-sketch)
        - [Serial Monitor](#serial-monitor)
- [Udoo](#udoo)
    - [Introduction](#introduction-1)
    - [Program UDOO Arduino Processor From External PC](#program-udoo-arduino-processor-from-external-pc)
        - [Requirements](#requirements)
        - [Arduino IDE Installation](#arduino-ide-installation)
- [Example](#example)
- [Reference](#reference)

<!-- /MarkdownTOC -->

Arduino
-----------------

### Introduction

Arduino is an open-source prototyping platform based on easy-to-use hardware and software. Arduino boards are able to read inputs - light on a sensor, a finger on a button, or a Twitter message - and turn it into an output - activating a motor, turning on an LED, publishing something online. You can tell your board what to do by sending a set of instructions to the microcontroller on the board. To do so you use the Arduino programming language (based on Wiring), and the Arduino Software (IDE), based on Processing.

### Arduino IDE

#### Installation

An Arduino IDE version 1.5 is required for your specific operating system. And other versions will not work, since UDOO needs Arduino 2 compabile programming software. (See [Program UDOO Arduino Processor From External PC](#program-udoo-arduino-processor-from-external-pc))

#### Writing Sketches

Programs written using Arduino IDE are called sketches. These sketches are written in the text editor and are saved with the file extension `.ino`. The console displays text output by the Arduino IDE, including complete error messages and other information. The bottom righthand corner of the window displays the configured board and serial port. The toolbar buttons allow you to verify and upload programs, create, open, and save sketches, and open the serial monitor.

#### Programming Language

Arduino programs use C-like language, and it can be divided in three main parts: structure, values (variables and constants), and functions.
You can find the language reference [here][lang_ref]

#### Uploading Sketch

Before uploading your sketch, you need to select the correct items from the **Tools > Board** and **Tools > Port** menus. The boards are described below. 

+ On Windows, it's probably `COM1` or `COM2` (for a serial board) or `COM4`, `COM5`, `COM7`, or higher (for a USB board) - to find out, you look for USB serial device in the ports section of the Windows Device Manager. 
+ On Mac OS, the serial port is probably something like `/dev/tty.usbmodem241` (for an Uno). 
+ On Linux, it should be `/dev/ttyACMx` , `/dev/ttyUSBx` or similar. 

Once you've selected the correct serial port and board, press the upload button in the toolbar or select the Upload item from the File menu. Current Arduino boards will reset automatically and begin the upload. The Arduino Software (IDE) will display a message when the upload is complete, or show an error.

#### Serial Monitor

Displays serial data being sent from the Arduino board (USB or serial board). To send data to the board, enter text and click on the `send` button or press enter. Choose the baud rate from the drop-down that matches the rate passed to `Serial.begin` in your sketch. Note that the Arduino board will reset (rerun your sketch execution to the beginning) when you connect with the serial monitor.

Udoo
-----------------

### Introduction

UDOO is a single board computer that can be used both with Android and Linux, paired with an Arduino-compatible processor. UDOO is an open hardware, low-cost platform equipped with an ARM i.MX6 Freescale processor, and an Arduino Due compatible section based on ATMEL SAM3X8E ARM processor, all this available on the same board!

![udoo][udoo]

### Program UDOO Arduino Processor From External PC

If you wish to program the Arduino-compatible side of UDOO from your PC, Mac or Linux computer, just follow these easy steps to get started. 

#### Requirements

+ A working SD Card should be present on UDOO
+ J18 jumper should be unplugged. This will allow the communication between your computer and the programming port of the SAM3X.
+ The Micro USB cable should be plugged in the SAM3X port, not the one you would normally use for serial USB connection.
+ If all the requirements above are met, you’re ready to start. What we will basically do is configure the standard Arduino IDE in order to make it communicate to the SAM3X of UDOO, which is the Arduino-compatible micro-controller.

     J18 Jumper      |    Micro USB cable
:-------------------:|:--------------------:
 ![udoo_01][udoo_01] | ![udoo_02][udoo_02]

#### Arduino IDE Installation

+ Download Arduino IDE of version 1.5 and the patch for your Operating system from [here][resources] (In `Driver & Tool` tab)
+ Download and install the serial driver from [here][usb_driver]
+ Extract the files in the archive and place them in the following paths, overwriting the previous existing files: 
    + In Windows 32 bit: `C:\Program Files\Arduino\hardware\tools`
    + In Win 64 bit: `C:\Program Files (x86)\Arduino\hardware\tools`
    + In Linux: `/hardware/tools/`
    + In Mac OS X: `/Contents/Resources/Java/hardware/tools/`
+ With this patch you are now able to upload your sketch selecting the Arduino Due(Programming Port) from: **Tools -> Board** and the right port from **Tools -> Port** in the Arduino IDE

Example
-----------------

Verify and upload this sketch to Sam3X as you did before and enjoy your blinking LED. 

```c
int led = 13;
void setup() {
    Serial.begin(9600);
    pinMode(led, OUTPUT);
}
void loop() {
    digitalWrite(led, HIGH);   
    delay(1000);    
    digitalWrite(led, LOW);  
    delay(1000);      
}
```


Reference
-----------------

[Program Arduino with UDOO’S IDE][ref0]

<!-- Links -->

[udoo]: ../pic/Box1_Tutorials_UdooSite.png
[udoo_01]: ../pic/boardJ18-03.png
[udoo_02]: ../pic/board_usb2-01.jpg
[resources]: http://www.udoo.org/other-resources/
[usb_driver]: http://www.silabs.com/products/mcu/pages/usbtouartbridgevcpdrivers.aspx
[ref0]: http://www.udoo.org/tutorial/getting-started-with-arduino-ide-on-udoo/
[lang_ref]: https://www.arduino.cc/en/Reference/HomePage


Arduino XBee Shield Tutorial (Part 3)
========

> This documentation is for 50.001 IoT project. (Version: 1.0)

Table of Contents
-----------------

* [Introduction]()
* [XBee Wireless Communication Setup]()
* [XBee Shields]()
* [Example]()
* [Reference]()

Introduction
-----------------

XBee wireless transceivers provide a quick, easy way to add wireless communication to any system. This tutorial will outline how to set up two XBee devices for communication with each other.

XBee is the brand name from Digi International for a family of form factor compatible radio modules. The first XBee radios were introduced under the MaxStream brand in 2005.

The XBee radios can all be used with the minimum number of connections – power (3.3 V), ground, data in and data out (UART), with other recommended lines being Reset and Sleep. Additionally, most XBee families have some other flow control, I/O, A/D and indicator lines built in. A version of the XBees called the programmable XBee has an additional onboard processor for user’s code. The programmable XBee and a new surface mount (SMT) version of the XBee radios were both introduced in 2010.

### Requirement
+ 1 Arduino Uno
+ 1 Udoo board
+ 2 XBee shields
+ 2 XBee modules
+ 1 PC for programming
+ 1 LED

XBee Wireless Communication Setup
-----------------

You should be able to get two Arduino boards with XBee shields talking to each other already with configuration by us. While, if you are still interested in configuring the XBee modules, can check out [this page][setup].


XBee Shields
-----------------
The Arduino XBee shield allows your Arduino board to communicate wirelessly using Zigbee. It was developed in collaboration with Arduino. This documentation describes the use of the shield with the XBee module.

          XBee Shield          |      XBee Shield Interface
:-----------------------------:|:-----------------------------------:
![xbee_shield][xbee_shield]    | ![xbee_shield_interface][xbee_shield_interface]

Example
-----------------

Upload the following two sketches to the Arduino and Udoo boards:

Coordinator:
```c
void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.print('H');
    delay(1000);
    Serial.print('L');
    delay(1000);
}
```

End device:
```c
char buffer;
int led = 13;

void setup(){
    Serial.begin(9600);
    pinMode(led, OUTPUT);
}

void loop(){
    while(Serial.available()) {
        buffer = Serial.read();
        if (buffer == 'H') {
            digitalWrite(led, HIGH);
        } else if (buffer == 'L') {
            digitalWrite(led, LOW);
        }
    }
}
```

When it's finished uploading, you can check that it's working with the Arduino serial monitor. You should see H's and L's arriving one a second. Turn off the serial monitor and unplug the board. After a few seconds, you should see the LED on the first board turn on and off, once a second. If so, congratulations, your Arduino boards are communicating wirelessly. 

Reference
-----------------

[XBee for Arduino and Raspberry Pi][ref0]

<!-- Links -->

[setup]: https://eewiki.net/display/Wireless/XBee+Wireless+Communication+Setup#XBeeWirelessCommunicationSetup-Step1:DownloadX-CTUSoftware
[xbee_shield]: pic/xbee_shield.jpg
[xbee_shield_interface]: pic/XBee_Shield_Interface.jpg
[ref0]: https://www.cooking-hacks.com/documentation/tutorials/xbee-arduino-raspberry-pi-tutorial


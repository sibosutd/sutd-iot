
Arduino IDE Installation
========

> This documentation is for 50.001 IoT project. (Version: 1.0)

Table of Contents
-----------------

<!-- MarkdownTOC -->

- [Serial Driver](#serial-driver)
    - [Introduction](#introduction)
    - [Download links](#download-links)
- [Arduino IDE Installation](#arduino-ide-installation)
    - [Introduction](#introduction-1)
    - [Download links](#download-links-1)
        - [Arduino IDE](#arduino-ide)
        - [UDOO DUAL/QUAD patch](#udoo-dualquad-patch)
    - [Patching Arduino IDE](#patching-arduino-ide)
- [Libraries](#libraries)
    - [Introduction](#introduction-2)
    - [Download links](#download-links-2)
- [Serial Tools (Optional)](#serial-tools-optional)
    - [Download links](#download-links-3)
- [Reference](#reference)

<!-- /MarkdownTOC -->

Serial Driver
-----------------

### Introduction

The driver for the cn6 MicroUSB port (serial port) that allows the correct communication between your external computer and UDOO.

### Download links

[Serial driver for Windows][driver-windows]

[Serial driver for Mac OS X][driver-mac]

[Serial driver for Linux][driver-linux]

Arduino IDE Installation
-----------------

### Introduction

Download the Arduino IDE version 1.5.4 BETA for your specific operating system from the [official website][arduino-website] or through the links below, then install it on your computer. Only version 1.5 or higher will work with the Arduino DUE embedded on UDOO DUAL/QUAD.

> Note: remember to unplug J18 jumper. This will allow the communication between your computer and the programming port of the SAM3X.

The easiest way to program the Arduino DUE embedded from an external computer is by patching the Arduino IDE. The Atmel Sam3X microcontroller needs to receive ERASE and RESET signals when programming it with a new sketch. On Arduino boards this operation is performed by the microcontroller ATmega16U2 while on UDOO DUAL/QUAD this component is not present. The patch resolves this issue. 

### Download links

#### Arduino IDE

[Arduino IDE for Windows][ide-windows]

[Arduino IDE for Mac OS X][ide-mac]

[Arduino IDE for Linux 64 bit][ide-linux]

#### UDOO DUAL/QUAD patch

[Arduino IDE patch for Windows][patch-windows]

[Arduino IDE patch for Mac OS X][patch-mac]

[Arduino IDE patch for Linux 64 bit][patch-linux]

### Patching Arduino IDE

+ Download the patch for the appropriate OS. 
+ Extract the files in the archive and place them in the following paths, overwriting the previous existing files: 
    + In Windows 32 bit: `C:\Program Files\Arduino\hardware\tools`
    + In Windows 64 bit: `C:\Program Files (x86)\Arduino\hardware\tools`
    + In Linux: `/hardware/tools/`
    + In Mac OS X: `/Contents/Resources/Java/hardware/tools/`
+ With this patch you are now able to upload your sketch selecting the Arduino Due(Programming Port) from: **Tools -> Board** and the right port from **Tools -> Port** in the Arduino IDE

> Note: Due to some reasons, there might be a problem with the latest Mac OS X. If the patch file doesn't work, then try to follow the steps in `Using Arduino IDE without UDOO patch` section through [this link][without-patch].

Libraries
-----------------

### Introduction

The eHealth sensor platform includes a high level library functions for a easy manage of the board. This zip includes all the files needed in two separated folders, **eHealth** and **PinChangeInt**. The **PinChangeInt** library is necessary only when you use the pulsioximeter sensor. Copy this folders in the arduino IDE folder **libraries**. Don't forget include these libraries in your codes.

### Download links

[eHealth library][library]

Serial Tools (Optional)
-----------------

### Download links

[Teraterm for Windows][teraterm]

[SerialTools for Mac OS X][serialtools]

[Minicom for Linux (HOWTO)][minicom]

Reference
-----------------

[Program Arduino with UDOO’S IDE][ref0]

<!-- Links -->

[driver-windows]: http://www.silabs.com/Support%20Documents/Software/CP210x_VCP_Windows.zip
[driver-mac]: http://www.silabs.com/Support%20Documents/Software/Mac_OSX_VCP_Driver.zip
[driver-linux]: http://www.silabs.com/Support%20Documents/Software/Linux_3.x.x_VCP_Driver_Source.zip

[arduino-website]: https://www.arduino.cc/en/Main/OldSoftwareReleases#previous

[ide-windows]: http://arduino.cc/download.php?f=/arduino-1.5.4-r2-windows.exe
[ide-mac]: http://arduino.cc/download.php?f=/arduino-1.5.4-macosx.zip
[ide-linux]: http://arduino.cc/download.php?f=/arduino-1.5.4-linux64.tgz

[patch-windows]: http://udoo.org/download/files/Bossac/bossac_windows.zip
[patch-mac]: http://udoo.org/download/files/Bossac/bossac_osx.zip
[patch-linux]: http://udoo.org/download/files/Bossac/bossac_linux64.tar.gz

[without-patch]: http://www.elinux.org/UDOO_programming_the_embedded_Arduino_microcontroller

[library]: https://www.cooking-hacks.com/media/cooking/images/documentation/e_health_v2/eHealth_arduino_v2.4.zip

[teraterm]: http://download.cnet.com/Tera-Term/3001-20432_4-75766675.html?hlndr=1
[serialtools]: https://itunes.apple.com/us/app/serialtools/id611021963?mt=12
[minicom]: http://www.cyberciti.biz/tips/connect-soekris-single-board-computer-using-minicom.html

[ref0]: http://www.udoo.org/tutorial/getting-started-with-arduino-ide-on-udoo/


Sensor Platform (Part 2)
========

> This documentation is for 50.001 IoT project. (Version: 1.0)

Table of Contents
-----------------

* [e-Health Sensor Shield]()
* [Pulse and Oxygen in Blood (SPO2)](#pulse-and-oxygen-in-blood-spo2)
    * [SPO2 sensor features](#spo2-sensor-features)
    * [Connecting the sensor]()
    * [Library functions]()
    * [Example]()
* [Patient Position Sensor (Accelerometer)]()
    * [Patient position and falls]()
    * [Connecting the sensor]()
    * [Library functions]()
    * [Example]()
* [Reference]()

e-Health Sensor Shield
-----------------

The e-Health Sensor Shield V2.0 allows Arduino and Raspberry Pi users to perform biometric and medical applications where body monitoring is needed by using 10 different sensors: pulse, oxygen in blood (SPO2), airflow (breathing), body temperature, electrocardiogram (ECG), glucometer, galvanic skin response (GSR - sweating), blood pressure (sphygmomanometer), patient position (accelerometer) and muscle/eletromyography sensor (EMG).

This information can be used to monitor in real time the state of a patient or to get sensitive data in order to be subsequently analysed for medical diagnosis. Biometric information gathered can be wirelessly sent using any of the 6 connectivity options available: Wi-Fi, 3G, GPRS, Bluetooth, 802.15.4 and ZigBee depending on the application.

If real time image diagnosis is needed a camera can be attached to the 3G module in order to send photos and videos of the patient to a medical diagnosis center.

Data can be sent to the Cloud in order to perform permanent storage or visualized in real time by sending the data directly to a laptop or Smartphone. iPhone and Android applications have been designed in order to easily see the patient's information.

Pulse and Oxygen in Blood (SPO2)
-----------------

### SPO2 sensor features

Pulse oximetry a noninvasive method of indicating the arterial oxygen saturation of functional hemoglobin.

Oxygen saturation is defined as the measurement of the amount of oxygen dissolved in blood, based on the detection of Hemoglobin and Deoxyhemoglobin. Two different light wavelengths are used to measure the actual difference in the absorption spectra of HbO2 and Hb. The bloodstream is affected by the concentration of HbO2 and Hb, and their absorption coefficients are measured using two wavelengths 660 nm (red light spectra) and 940 nm (infrared light spectra). Deoxygenated and oxygenated hemoglobin absorb different wavelengths.

Deoxygenated hemoglobin (Hb) has a higher absorption at 660 nm and oxygenated hemoglobin (HbO2) has a higher absorption at 940 nm . Then a photo-detector perceives the non-absorbed light from the LEDs to calculate the arterial oxygen saturation.

A pulse oximeter sensor is useful in any setting where a patient's oxygenation is unstable, including intensive care, operating, recovery, emergency and hospital ward settings, pilots in unpressurized aircraft, for assessment of any patient's oxygenation, and determining the effectiveness of or need for supplemental oxygen.

Acceptable normal ranges for patients are from 95 to 99 percent, those with a hypoxic drive problem would expect values to be between 88 to 94 percent, values of 100 percent can indicate carbon monoxide poisoning.

The sensor needs to be connected to the Arduino or Raspberry Pi, and don't use external/internal battery.

### Connecting the sensor

Connect the module in the e-Health sensor platform. The sensor have only one way of connection to prevent errors and make the connection easier.

![SPO2][ref1]

Insert your finger into the sensor and press `ON` button. After a few seconds you will get the values in the sensor screen.

### Library functions

Initializing

This sensor use interruptions and it is necessary to include a special library when you are going to use it.

```c
#include < PinChangeInt.h >
```

After this include, you should attach the interruptions in your code to get data from th sensor. The sensor will interrupt the process to refresh the data stored in private variables.

```c
PCintPort::attachInterrupt(6, readPulsioximeter, RISING);
```

The digital pin 6 of Arduino is the pin where sensor send the interruption and the function readpulsioximeter will be executed.

```c
void readPulsioximeter(){
	cont ++;
	if (cont == 50) { //Get only one 50 measures to reduce the latency
		eHealth.readPulsioximeter();
		cont = 0;
	}
}
```

Before start using the SP02 sensor, it must be initialized. Use the next function in setup to configure some basic parameters and to start the communication between the Arduino/RaspberryPi and sensor.

Reading the sensor

For reading the current value of the sensor, use the next function.

Example:
```c
eHealth.readPulsioximeter();
```

This function will store the values of the sensor in private variables.

Getting data

To view data we can get the values of the sensor stored in private variable by using the next functions.

Example:
```c
int SPO2 = eHealth.getOxygenSaturation()
int BPM = eHealth.getBPM()
```
### Example

Upload the next code for seeing data in the serial monitor:
```c
#include < PinChangeInt.h >
#include < eHealth.h >

int cont = 0;

void setup() {
    Serial.begin(115200);
    eHealth.initPulsioximeter();

    //Attach the inttruptions for using the pulsioximeter.
    PCintPort::attachInterrupt(6, readPulsioximeter, RISING);
}

void loop() {

    Serial.print("PRbpm : ");
    Serial.print(eHealth.getBPM());

    Serial.print("    %SPo2 : ");
    Serial.print(eHealth.getOxygenSaturation());

    Serial.print("\n");
    Serial.println("============= ================");
    delay(500);
}


//Include always this code when using the pulsioximeter sensor
//=========================================================================
void readPulsioximeter(){
    cont ++;
    if (cont == 50) { //Get only of one 50 measures to reduce the latency
    eHealth.readPulsioximeter();
    cont = 0;
    }
}
```

Upload the code to Arduino and watch the Serial monitor.Here is the USB output using the Arduino IDE serial port terminal:

Patient Position Sensor (Accelerometer)
-----------------

### Patient position and falls

The Patient Position Sensor (Accelerometer) monitors five different patient positions (standing/sitting, supine, prone, left and right.)

In many cases, it is necessary to monitor the body positions and movements made because of their relationships to particular diseases (i.e., sleep apnea and restless legs syndrome). Analyzing movements during sleep also helps in determining sleep quality and irregular sleeping patterns. The body position sensor could help also to detect fainting or falling of elderly people or persons with disabilities.

![position][ref2]

eHealth Body Position Sensor uses a triple axis accelerometer to obtain the patient's position.

Features:

1.95 V to 3.6 V supply voltage
1.6 V to 3.6 V interface voltage
±2g/±4g/±8g dynamically selectable full-scale
This accelerometer is packed with embedded functions with flexible user programmable options, configurable to two interrupt pins.The accelerometer has user selectable full scales of ±2g/±4g/±8g with high pass filtered data as well as non filtered data available real-time.

Body position


### Connecting the sensor

The body position sensor has only one and simple way of connection. Connect the ribbon cable with the body position sensor and the e-Health board as show in the image below.

 
Place the tape around the chest and the connector placed down

### Library functions

The e-Health library allows a simple programing way. With one simple function we can get the position of the patient and show it in the serial monitor of the Arduino/RasberryPi or in the GLCD.

Initializing the sensor

Before start using the sensor, we have to initialize some parameters. Use the next function to configure the sensor.

Example
```c
eHealth.initPositionSensor();
```
Getting data

The next functions return the a value that represent the body position stored in private variables of the e-Health class.

Example
```c
uint8_t position = eHealth.getBodyPosition();
```
The position of the pacient

1 == Supine position.
2 == Left lateral decubitus.
3 == Rigth lateral decubitus.
4 == Prone position.
5 == Stand or sit position.

Printing Data

For representing the data in a easy way in the Arduino/RasberryPi serial monitor, e-health library, includes a printing function.

Example:
```c
Serial.print("Current position : ");
uint8_t position = eHealth.getBodyPosition();
eHealth.printPosition(position);
```

### Example
Upload the next code for seeing data in the serial monitor:
```c
#include < eHealth.h >

void setup() {
    Serial.begin(115200);
    eHealth.initPositionSensor();
}

void loop() {
    Serial.print("Current position : ");
    uint8_t position = eHealth.getBodyPosition();
    eHealth.printPosition(position);
    Serial.print("\n");
    delay(1000); //	wait for a second.
}
```

Upload the code and watch the Serial monitor.Here is the USB output using the Arduino IDE serial port terminal:


Reference
-----------------

[e-health sensor shield][ref0]

<!-- Links -->

[ref0]: https://www.cooking-hacks.com/documentation/tutorials/ehealth-biometric-sensor-platform-arduino-raspberry-pi-medical
[ref1]: pic/pulse_and_oxygen_connected_e_health_big.png
[ref2]: pic/body_position_connected_e_health_small.png

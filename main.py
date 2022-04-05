def dht11():
    NPNBitKit.dht11_read(DigitalPin.P0)
    radio.send_string("!7:TEMP:" + str(NPNBitKit.dht11_temp()) + "#")
    basic.pause(100)
    radio.send_string("!7:HUMI:" + str(NPNBitKit.dht11_hum()) + "#")
    basic.pause(30000)
def gas():
    global gas_raw, gas_mV, gas_percent
    gas_raw = pins.analog_read_pin(AnalogPin.P1)
    gas_mV = Math.map(gas_raw, 0, 1023, 0, 3300)
    gas_percent = Math.map(gas_mV, 0, 3300, 0, 100)
    radio.send_string("!23:GAS:" + str(gas_percent) + "#")
    basic.pause(10000)
def IRsensor():
    if isIRsensor:
        radio.send_string("!16:INFRARED:" + str(pins.digital_read_pin(DigitalPin.P2)) + "#")
        basic.pause(1000)

def on_received_string(receivedString):
    global isIRsensor
    if receivedString == "IR:OFF":
        isIRsensor = False
    elif receivedString == "IR:ON":
        isIRsensor = True
radio.on_received_string(on_received_string)

gas_percent = 0
gas_mV = 0
gas_raw = 0
isIRsensor = False
radio.set_group(1)
led.enable(False)
isIRsensor = True

def on_forever():
    dht11()
    gas()
    IRsensor()
basic.forever(on_forever)

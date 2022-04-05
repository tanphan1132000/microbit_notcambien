function dht11 () {
    NPNBitKit.DHT11Read(DigitalPin.P0)
    serial.writeString("!7:TEMP:" + NPNBitKit.DHT11Temp() + "#")
    serial.writeString("!7:TEMP:" + NPNBitKit.DHT11Hum() + "#")
    basic.pause(30000)
}
function gas () {
    gas_raw = pins.analogReadPin(AnalogPin.P1)
    gas_mV = Math.map(gas_raw, 0, 1023, 0, 3300)
    gas_percent = Math.map(gas_mV, 0, 3300, 0, 100)
    radio.sendString("!23:GAS:" + gas_percent + "#")
    basic.pause(10000)
}
function IRsensor () {
    if (isIRsensor) {
        radio.sendString("!16:INFRARED:" + pins.digitalReadPin(DigitalPin.P2) + "#")
        basic.pause(1000)
    }
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "IR:OFF") {
        isIRsensor = false
    } else if (receivedString == "IR:ON") {
        isIRsensor = true
    }
})
let gas_percent = 0
let gas_mV = 0
let gas_raw = 0
let isIRsensor = false
radio.setGroup(1)
led.enable(false)
isIRsensor = true
basic.forever(function () {
    dht11()
    gas()
    IRsensor()
})

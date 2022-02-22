function dht11 () {
    NPNBitKit.DHT11Read(DigitalPin.P0)
    radio.sendString("!7:TEMP:" + NPNBitKit.DHT11Temp() + "#")
    basic.pause(100)
    radio.sendString("!7:HUMI:" + NPNBitKit.DHT11Hum() + "#")
    basic.pause(30000)
}
function gas () {
    gas_raw = pins.analogReadPin(AnalogPin.P1)
    gas_mV = Math.map(gas_raw, 0, 1023, 0, 3300)
    radio.sendString("!23:GAS:" + gas_mV + "#")
    basic.pause(10000)
}
function IRsensor () {
    radio.sendString("!16:INFRARED:" + pins.digitalReadPin(DigitalPin.P2) + "#")
    basic.pause(1000)
}
let gas_mV = 0
let gas_raw = 0
radio.setGroup(1)
led.enable(false)
basic.forever(function () {
    dht11()
    gas()
    IRsensor()
})

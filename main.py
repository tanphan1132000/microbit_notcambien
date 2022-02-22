radio.set_group(1)

def on_forever():
    NPNBitKit.dht11_read(DigitalPin.P0)
    radio.send_string("!7:TEMP:" + str(NPNBitKit.dht11_temp()) + "#")
    basic.pause(100)
    radio.send_string("!7:HUMI:" + str(NPNBitKit.dht11_hum()) + "#")
    basic.pause(30000)
basic.forever(on_forever)

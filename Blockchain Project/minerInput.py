import urllib.request
import time

#Change this address to your settings
device_links = ["http://192.168.0.18:8080"]
numDevices = 1

while True:
    for i in range(0,numDevices):
        f = urllib.request.urlopen(device_links[i])
        myfile = f.read()
        # date = myfile.split(" ")
        mystr = ""
        for line in myfile:
            mystr = mystr + chr(line)
    
        f = open("sensorRequests" + str(i) + ".txt","w+")
        f.write(mystr.strip())
        f.close()
        print(mystr)
        time.sleep(5)

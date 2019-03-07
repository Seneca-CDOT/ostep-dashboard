from datetime import datetime
from pytz import timezone
import time, sys

fmt = "%Y-%m-%d %H:%M:%S %Z%z"
#timezonelist = ['America/Toronto']

EDT = "America/Toronto"
while (True):
    EDT_time = datetime.now(timezone(EDT))
    #print EDT_time.strftime(fmt)
    print "24 Hour Clock (EDT):", EDT_time.hour, ":", EDT_time.minute, ":", EDT_time.second , "|", EDT_time.weekday()
    sys.stdout.write("\033[F")
    time.sleep(1)

#now = datetime.datetime.now()
    
     


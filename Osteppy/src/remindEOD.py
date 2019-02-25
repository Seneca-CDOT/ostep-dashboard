#!/usr/bin/env python2

from slacker import Slacker
from datetime import datetime
from pytz import timezone
import os, secret_token, time, sys
import subprocess

EDT = "America/Toronto"
dir_path = os.path.dirname(os.path.realpath(__file__))
slack_token = secret_token.EOD_REMINDER_BOT_TOKEN
sc = Slacker(slack_token)
cp_command = "cp " + dir_path + "/RAs.txt " + dir_path + "/sleepyRAs.txt"

def slack_reminder(recipient):
    # Sends the message to a user or channel
    sc.chat.post_message(recipient, "Hi! This is a reminder to submit your EOD today. :gnu:")

def test_message(recipient):
    # Sends a test message for debugging
    sc.chat.post_message(recipient, "Hi! This is test message. Please reply to Ian if you see it. :blue_steel:")

def send_EOD():
    # Sends a direct message to remind EOD
    with open('./src/sleepyRAs.txt') as f:
        names = f.readlines()
    names = [name.strip() for name in names] 
    for name in names:
        slack_reminder ("@" + name)

def reset_RA_list():
    # Overwrites sleepyRAs.txt with list of RAs
    subprocess.check_output(['bash','-c', cp_command])

def check():
    # Checks current time and prints clock to console
    #now = datetime.datetime.now()
    EDT_time = datetime.now(timezone(EDT))
    print "[EOD Reminder Bot Running] 24 Hour Clock:", EDT_time.hour, ":", EDT_time.minute, ":", EDT_time.second, "|", EDT_time.weekday()
    sys.stdout.write("\033[F")
    tick_tock(EDT_time)
    if (EDT_time.second == 0 and EDT_time.minute == 0 and EDT_time.weekday() <= 4):
        # Send a reminder at 9PM on weekdays
        if (EDT_time.hour == 21): #21
            send_EOD()
            #test()
        # Reset RA list
        elif (EDT_time.hour == 10): #10
            reset_RA_list()
        elif (EDT_time.hour == 0): #0
            midnight_debug()
    time.sleep(1)

def test():
    # Test function for sending slack messages to RAs in txt
    with open('./src/sleepyRAs.txt') as f:
        names = f.readlines()
    names = [name.strip() for name in names] 
    for name in names: 
        test_message ("@" + name)

def midnight_debug():
    sc.chat.post_message("@naiuhz", ":clock12: Oyasuminasai niichan")
    sc.chat.post_message("@yan", ":clock12: Oyasuminasai Yan-niichan")

def tick_tock(time_zone):
    f = open(dir_path + '/clock.txt', 'w')
    f.seek(0)
    f.truncate()
    time = '[EOD Reminder Bot Running] 24 Hour Clock: '
    if (time_zone.hour < 10):
        time += '0' + str(time_zone.hour)
    else:
        time += str(time_zone.hour)
    time += ':'
    if (time_zone.minute < 10):
        time += '0' + str(time_zone.minute)
    else:
        time += str(time_zone.minute)
    time += ':' 
    if (time_zone.second < 10):
        time += '0' + str(time_zone.second)
    else:
        time += str(time_zone.second)
    time += '|' + str(time_zone.weekday())
    f.write(str(time))
    #f.write('[EOD Reminder Bot Running] 24 Hour Clock: ' + str(time_zone.hour) + ':' + str(time_zone.minute) + ':' + str(time_zone.second) + '|' + str(time_zone.weekday()))
    f.close()

while (True):
    check()

#test()
#reset_RA_list()

#test_message("@naiuhz")
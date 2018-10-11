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
cpCommand = "cp " + dir_path + "/RAs.txt " + dir_path + "/sleepyRAs.txt"

def slack_message(recipient):
    # Sends the message to a user or channel
    sc.chat.post_message(recipient, "Hi! This is a reminder to submit your EOD today. :saitama:")

def test_message(recipient):
    # Sends a test message for debugging
    sc.chat.post_message(recipient, "Hi! This is test message. Please reply to Ian if you see it. :saitama:")

def send_EOD():
    # Sends a direct message to remind EOD
    with open('./src/sleepyRAs.txt') as f:
        names = f.readlines()
    names = [name.strip() for name in names] 
    for name in names:
        slack_message ("@" + name)

def reset_RA_list():
    # Overwrites sleepyRAs.txt with list of RAs
    subprocess.check_output(['bash','-c', cpCommand])

def check():
    # Checks current time and prints clock to console
    #now = datetime.datetime.now()
    EDT_time = datetime.now(timezone(EDT))
    print "[EOD Reminder Bot Running] 24 Hour Clock:", EDT_time.hour, ":", EDT_time.minute, ":", EDT_time.second, "|", EDT_time.weekday()
    sys.stdout.write("\033[F")
    if (EDT_time.second == 0 and EDT_time.minute == 0 and EDT_time.weekday() <= 4):
        # Send a reminder at 11PM on weekdays
        if (EDT_time.hour == 23): #23
            #send_EOD()
            test()
        # Reset RA list
        elif (EDT_time.hour == 10): #10
            reset_RA_list()
    time.sleep(1)

def test():
    # Test function for sending slack messages to RAs in txt
    with open('./src/sleepyRAs.txt') as f:
        names = f.readlines()
    names = [name.strip() for name in names] 
    for name in names: 
        test_message ("@" + name)

while (True):
    check()

#test()
#reset_RA_list()
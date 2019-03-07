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

def send_EODs():
    # Sends a direct message to remind EOD
    with open('./src/sleepyRAs.txt') as f:
        names = f.readlines()
    names = [name.strip() for name in names] 
    for name in names:
        slack_reminder ("@" + name)

def send_RA_EOD(RA, message):
    # Sends a direct message to remind EOD
    with open('./src/sleepyRAs.txt') as f:
        names = f.readlines()
    names = [name.strip() for name in names] 
    for name in names:
        if (RA in names):
            sc.chat.post_message("@" + name, message)

def reset_RA_list():
    # Overwrites sleepyRAs.txt with list of RAs
    subprocess.check_output(['bash','-c', cp_command])

def check():
    # Checks current time and prints clock to console
    #now = datetime.datetime.now()
    EDT_time = datetime.now(timezone(EDT))
    print ("[EOD Reminder Bot Running] 24 Hour Clock: " + str(EDT_time.hour) + ":" + str(EDT_time.minute) + ":" + str(EDT_time.second) + "|" + str(EDT_time.weekday()))
    sys.stdout.write("\033[F")
    tick_tock(EDT_time)
    if (EDT_time.second == 0):
        if (EDT_time.minute == 0):
            if (EDT_time.hour == 16 and EDT_time.weekday() <= 4):
                send_RA_EOD("josue.quilon-barrios", "It's 4PM Josue! Try to do your EOD before you leave today! :robot_face:")
            elif (EDT_time.hour == 21 and EDT_time.weekday() <= 4):
                send_RA_EOD("mroncancio19", "It's 9PM sleepy head! Please remember to do your EOD! :robot_face:")
                send_RA_EOD("josue.quilon-barrios", "It's 9PM sleepy head! Please remember to do your EOD! :robot_face:")
                send_RA_EOD("dray1", "It's 9PM sleepy head! Please remember to do your EOD! :robot_face:")
                send_RA_EOD("naiuhz", "It's 9PM sleepy head! Please remember to do your EOD! :ayaya:")
            elif (EDT_time.hour == 22 and (EDT_time.weekday() == 1 or EDT_time.weekday() == 2 or EDT_time.weekday() == 4)):
                send_RA_EOD("poftadeh2", "It's 10PM sleepy head! Please remember to do your EOD! :pouya:")
            # Reset RA list
            elif (EDT_time.hour == 10 and EDT_time.weekday() <= 4):
                reset_RA_list()
            elif (EDT_time.hour == 0):
                midnight_debug()
        elif (EDT_time.minute == 30):
            if (EDT_time.hour == 9 and EDT_time.weekday() <= 4):
                send_RA_EOD("mroncancio19", "It's 9:30AM Miguel! You forgot to submit yesterday's EOD! Let's submit one right now! :robot_face:")
            elif (EDT_time.hour == 16 and EDT_time.weekday() <= 4):
                send_RA_EOD("mroncancio19", "It's 4:30PM Miguel! Try to do your EOD before you leave today! :robot_face:")
                send_RA_EOD("naiuhz", "It's 4:30PM Ian! Try to do your EOD before you leave today! :ayaya:")
            elif (EDT_time.hour == 21 and EDT_time.weekday() <= 4):
                send_RA_EOD("ylei11", "It's 9:30PM Yan-nii! Please remember to do your EOD! :ayaya:")
            elif (EDT_time.hour == 20 and EDT_time.weekday() <= 4):
                send_RA_EOD("obelavina", "It's 8:30PM comrade! Please remember to do your EOD! :olga:")
        elif(EDT_time.minute == 55):
            if (EDT_time.hour == 16 and EDT_time.weekday() <= 4):
                send_RA_EOD("ylei11", "It's 4:55PM Yan-nii! Try to do your EOD before you leave today! :ayaya:")
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
    sc.chat.post_message("@ylei11", ":clock12: Oyasuminasai Yan-niichan")

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

#test_message("@dray1")
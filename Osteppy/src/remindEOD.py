from slacker import Slacker
import os, secret_token, time, datetime, sys

slack_token = secret_token.EOD_REMINDER_BOT_TOKEN
sc = Slacker(slack_token)

def slack_message(recipient):
    # Sends the message to a user or channel
    sc.chat.post_message(recipient, "Hi! This is a reminder to submit your EOD today if you haven't already submitted it. :simple_smile:")

def test_message(recipient):
    sc.chat.post_message(recipient, "Hi! This is test message. :saitama: Please reply to Ian if you see it.")


def remind():
    now = datetime.datetime.now()
    with open('./src/sleepyRAs.txt') as f:
        names = f.readlines()
    names = [name.strip() for name in names] 
    print "[EOD Reminder Bot Running] 24 Hour Clock:", now.hour, ":", now.minute, ":", now.second #, "|", now.weekday()
    sys.stdout.write("\033[F")
    if (now.hour == 23 and now.minute == 0 and now.second == 0 and now.weekday() >= 0 and now.weekday() <= 4):
    # if (True):
        #print ("DING It is now 11 o'clock!")
        for name in names:
            slack_message ("@" + name)
            #print("@" + name)
    time.sleep(1)

def test():
    with open('./src/sleepyRAs.txt') as f:
        names = f.readlines()
    names = [name.strip() for name in names] 
    for name in names: 
        test_message ("@" + name)

while (True):
    remind()

#test()

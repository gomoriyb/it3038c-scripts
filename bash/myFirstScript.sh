#!/bin/bash

#This script outputs the IP address and Hostname of a machine
greeting="This is a script. Hello!"
echo $greeting, thanks for joining us!
echo '$greeting, thanks for joining us! You owe me $20'
echo "$greeting, thanks for joining us!"
echo "$greeting, you owe me \$20"
echo Machine Type: $MACHTYPE
echo Working Dir: $PWD
echo Hostname: $HOSTNAME
echo Session length: $SECONDS
echo Home Dir: $HOME
a=$(ip a | grep 'noprefixroute ens192' | awk '{print $2}')
echo My IP is $a

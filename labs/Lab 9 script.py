import json
import requests

r = requests.get('http://localhost:3000')
data=r.json()

#Looping through the returned list/array of widgets and printing their name and color
for widget in data:
    print (widget['name'] + ' is ' + widget['color'] + '.')
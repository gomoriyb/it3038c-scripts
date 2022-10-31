import requests,re
from bs4 import BeautifulSoup

name = input('Please enter your name: ')
print()

url = 'http://localhost/project2/index.php?name=' + name
data = requests.get(url).json()
soup = BeautifulSoup(data['content'],'html.parser')

h1 = soup.find("h1")
p = soup.find("p")

message = h1.text
about = p.text

print(message)
print("==============================================")
print(about)
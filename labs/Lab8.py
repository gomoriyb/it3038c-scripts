import requests,re
from bs4 import BeautifulSoup

data = requests.get("https://www.merrell.com/US/en/moab-3-smooth-mid-gore-tex-x-huckberry/52472M.html?dwvar_52472M_color=J500305").content
soup = BeautifulSoup(data,'html.parser')
h1 = soup.find("h1", {"class":"product-name-v2 bfx-product-name"})
product_name = h1.text
span = soup.find("span",{"class":"price-sales bfx-sale-price"})
price = span.text
print("Merrell")
print("===========")
print("Product Name: %s "%(product_name))
print("Price: %s"%(price))
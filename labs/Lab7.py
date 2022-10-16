# We will be be using the requests module
# We will use it to demonstrate three capabilities of communicating with rest APIs
# 1: GET - get data from an api (https://gorest.co.in/public/v2/users)
# 2: POST - send data to the api 
# 3: DELETE - delete data from the api
# Note: Since we are using free public api which requests not to upload tokens to public website
# I am removing it from the code (since my GitHub is public) and will provide it in the comments
# Thus the code will not add and delete before inserting the token

# Resources: 
# The API sources were found in this website: https://gorest.co.in/
# https://realpython.com/api-integration-in-python/
# https://stackoverflow.com/questions/59033111/grab-a-specific-field-from-a-json-response-in-python
# https://stackoverflow.com/questions/29931671/making-an-api-call-in-python-with-an-api-that-requires-a-bearer-token


# To install the requests plugin/module use the command:  
# python -m pip install requests

import requests

# 1 - GET users data, and print the first user returned data
url = "https://gorest.co.in/public/v2/users/"
response1 = requests.get(url)
print()
print('GET')
print('First user (from returned users): ' + str(response1.json()[0]))
print()

# 2 - POST send new user data
new_user = {"name": "Ben G", "email": "bengg@gmail.com", "gender":"male", "status":"active"}
headers =  {"Content-Type":"application/json", "Authorization": "Bearer <token goes here>"}
response2 = requests.post(url, json=new_user, headers=headers)
print('POST')
print('new user: ' + str(response2.json()))
print('status code: ' + str(response2.status_code))
print()

# 3 - DELETE the new user
added_user_id = str(response2.json()['id'])
delete_url = url + added_user_id
response3 = requests.delete(delete_url, headers=headers)
print('DELETE')
print('id: ' + added_user_id)
print('status code: ' + str(response3.status_code))
print()

# Lab 7 - Plugin/Package  (Python) - requests

## Intro
I chose to use the requests package.<br/>
The package can be used to easily manage rest API calls and responses.<br/>
I will use the package to GET, POST, DELETE from a free public API, https://gorest.co.in/, which has mock data.<br/>

## How To
### Install Package
```python -m pip install requests```

### Create Access Token
Go to https://gorest.co.in/consumer/login and generate a token.<br/>
In line 32 of the code change the template text (the section '<....>') to the token. <br/>
![image](https://user-images.githubusercontent.com/112343827/196057853-9c0c6abd-86b9-4186-bdbf-27ff32a2c0c9.png)

(This is due to the fact that the API creator requests that people do not share the access token on public websites.<br/> 
I removed the token from the code and therefore the POST and DELETE will not work until you create your own token as mentioned.)

### Run Program
Navigate in your command line/terminal to the labs' folder and then enter the command:<br/>
```python Lab7.py```


## Screenshot
![image](https://user-images.githubusercontent.com/112343827/196057285-636e1590-e62b-405c-8418-e8f0b27c8d7e.png)


## Resources: 
- https://gorest.co.in/
- https://realpython.com/api-integration-in-python/
- https://stackoverflow.com/questions/59033111/grab-a-specific-field-from-a-json-response-in-python
- https://stackoverflow.com/questions/29931671/making-an-api-call-in-python-with-an-api-that-requires-a-bearer-token




import time

# Since I forgot some of pythons syntax such as to use 'or' instead of || , I used this example to costrnact my if statement in the function
# https://www.codegrepper.com/code-examples/python/check+if+character+is+vowel+python
def isVowel(l):
    if(l=='A' or l=='a' or l=='E' or l=='e' or l=='i' or l=='i' 
    or l=='O' or l=='o' or  l=='U' or l=='u'):
        return True
    return False

print('Enter any word?')
word = input()

letterCount = len(word)
vowelCount = 0
constantCount = 0

for l in word:
    if (isVowel(l)):
        vowelCount+=1

constantCount = letterCount - vowelCount
print("The word %s, has %s letters, %s vowels, and %s constants" % (word, letterCount, vowelCount, constantCount))

time.sleep(3)
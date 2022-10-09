# Project 1 - Calculator (Python)

## Intro

It is a console-based calculator that is written in python..
- The calculator accepts integers or decimal numbers.
- It provides the result as a decimal rounded to the 2nd decimal.
- The calculator enables the user to do one operation at a time
- The calculator allows the user to continue to operate on the previous result.


## Available Operators
- \+ to add
- \- to subtract
- \* to multiply
- / to divide
- ^ to power

## How To
### Start
The program will ask you to enter an operator.
The program will ask you to enter the first number.
The program will ask you to enter the second number.
The program will return the result.

### Available Options
After outputting the result, it will provide the user with 3 options:
- Start a new calculation.
- Exit the program
- Do another operation on the current total

Until the user chooses to exit the program, the program will always provide these 3 options after returning a result.

## Examples:
### Add 
- User input:
  - Operator: \+
  - First Number: ```1```
  - second Number:  ```4.233```
  - Calculation: ```1.0 + 4.233 = 5.233``` rounded to decimal places is ```5.23```
  - Output: ```5.23```

### Subtract
- User input:
  - Operator: \-
  - First Number: ```1```
  - second Number:  ```4.233```
  - Calculation: ```1.0 - 4.233 = -3.233``` rounded to decimal places is ```-3.23```
  - Output: ```-3.23```

### Multiply
- User input:
  - Operator: \*
  - First Number: ```0.36```
  - second Number:  ```2 ```
  - Calculation: ```0.36 * 2.0 = 0.72```
  - Output: ```0.72```

### Divide
- User input:
  - Operator: \
  - First Number: ```10```
  - second Number:  ```2.5```
  - Calculation: ```10.0 / 2.5 = 4.0```
  - Output: ```4.0```

### Power
- User input:
  - Operator: ^
  - First Number: ```2```
  - second Number:  ```2.5```
  - Calculation: ```pow(2,2.5) / 2.5 = 5.65685``` rounded to decimal places is ```5.66```
  - Output: ```5.66 ```

## Resources: 
- The project idea and the solution are based (with many differences) on ideas from: https://www.digitalocean.com/community/tutorials/how-to-make-a-calculator-program-in-python-3
- To manage when user input is supposed to be a number and something else is provided: https://pynative.com/python-check-user-input-is-number-or-string/
- To go over python's data structures and its dictionary I used: https://www.w3schools.com/python/, and https://www.w3schools.com/python/python_dictionaries.asp
- For the markup, I used the example provided in the class and https://github.com/tchapi/markdown-cheatsheet/blob/master/README.md

### Differences between the resources and my solution:
Although I based my solution and the idea of the app on other resources, my solution is very different.
Just to mention a few: 
- My solution allows the user to continue additional operations on the results he/she receives from the calculations. I make use of a dictionary to enable that.
- My code and the calculations in the app make use of decimal numbers not integers
- I make use of recursion.
- It provides the power operator (does not provide the modular operator)

In general, I mostly looked at other resources as inspiration.

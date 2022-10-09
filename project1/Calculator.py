# The solution is based on ideas from: https://www.digitalocean.com/community/tutorials/how-to-make-a-calculator-program-in-python-3
# To manage user input which is not a number I used ideas from here: https://pynative.com/python-check-user-input-is-number-or-string/

from struct import calcsize


calculator = {
    'current_total': 0.0,
    'first_number': 0.0,
    'second_number': 0.0,
    'operation': ' '
}

def add():
    calculator['current_total'] = calculator['first_number']+calculator['second_number']

def subtract():
    calculator['current_total'] = calculator['first_number']-calculator['second_number']

def mulitply():
    calculator['current_total'] = calculator['first_number']*calculator['second_number']

def divide():
    calculator['current_total'] = calculator['first_number']/calculator['second_number']

def power_by():
    calculator['current_total'] = pow(calculator['first_number'],calculator['second_number'])

def intro():
    print('\nWelcome to project 1 - Python based calculator:')
    print('-------------------------------------------------')
    print('To operate this calculator you will need to provide an operation and two numbers.')
    print('Each number you provide can be either an integer or a decimal number.\n')
    print('Available Operations:')
    print('=====================:')
    print(' + to add')
    print(' - to substract')
    print(' * to multiply')
    print(' / to divide')
    print(' ^ to power')
    print('')
    print('Lets start!\n')
    print('click any key to continue\n')
    input()

def get_user_operation():
    val = calculator['operation'] = input('\nPlease enter your operation\n')
    
    if(val != '+' and val!='-' and val!='*' and val!='/' and val!='^'):
        print('\nInvalid operation, please try again:\n')
        get_user_operation()

def get_user_first_number():
    # to manage user input which is not a number I used ideas from here: https://pynative.com/python-check-user-input-is-number-or-string/
    try:
        calculator['first_number'] = float(input('Please enter the first number\n'))
    except ValueError:
        print('Input was not a valid number')
        get_user_first_number()

def get_user_second_number():
    # to manage user input which is not a number I used ideas from here: https://pynative.com/python-check-user-input-is-number-or-string/
    try:
        calculator['second_number'] = float(input('Please enter the second number\n'))
    except ValueError:
        print('Input was not a valid number')
        get_user_second_number()

def determine_operation_function_and_call_it():
    if(calculator['operation'] == '+'):
        add()
    elif(calculator['operation'] == '-'):
        subtract()
    elif(calculator['operation'] == '*'):
        mulitply()
    elif(calculator['operation'] == '/'):
        divide()
    else:
        power_by()

def new_calculation():
    get_user_operation()
    get_user_first_number()
    get_user_second_number()
    determine_operation_function_and_call_it()


new_calculation()

print('current total: '  + str(round(calculator['current_total'],2)))

while(True):
    print('To start new calculation enter N')
    print('To exit enter E')
    print('\nTo operate on current total, enter operation:\n')
    option_chosen = input()
    if(option_chosen.upper == 'N'):
        exit()
    elif(option_chosen.upper == 'E'):
        exit()
    else:
        exit()
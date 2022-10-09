# The project idea and the solution are based (with many differences) on ideas from: https://www.digitalocean.com/community/tutorials/how-to-make-a-calculator-program-in-python-3
# To manage user input which is not a number I used ideas from here: https://pynative.com/python-check-user-input-is-number-or-string/
# To go over python's data structors and its dictionary I used: https://www.w3schools.com/python/, and https://www.w3schools.com/python/python_dictionaries.asp

calculator = {
    'current_total': 0.0,
    'first_number': 0.0,
    'second_number': 0.0,
    'operator': ' '
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
    print('\nWelcome to project 1 - Calculator (in Python):')
    print('------------------------------------------------')
    print('To operate this calculator you will need to provide an operator and two numbers.')
    print('Each number you provide can be either an integer or a decimal number.\n')
    print('After providing the operator or any number press enter to continue.\n')
    print('Available Operators:')
    print('=====================:')
    print(' + to add')
    print(' - to subtract')
    print(' * to multiply')
    print(' / to divide')
    print(' ^ to power')
    print('')
    print("Let's start!\n")
    input('Press enter to continue')

def get_user_operator():
    val = calculator['operator'] = input('\nPlease enter your operator: \t')
    if(val != '+' and val!='-' and val!='*' and val!='/' and val!='^'):
        print('Warning: Invalid operator, please try again.')
        get_user_operator()

def get_user_first_number():
    # to manage user input which is not a number I used ideas from here: https://pynative.com/python-check-user-input-is-number-or-string/
    try:
        calculator['first_number'] = float(input('Please enter the first number: \t'))
    except ValueError:
        print('Warning: Input was not a valid number.\n')
        get_user_first_number()

def get_user_second_number():
    # to manage user input which is not a number I used ideas from here: https://pynative.com/python-check-user-input-is-number-or-string/
    try:
        calculator['second_number'] = float(input('Please enter the second number: '))
    except ValueError:
        print('Warning: Input was not a valid number.\n')
        get_user_second_number()

def determine_operator_function_and_call_it():
    if(calculator['operator'] == '+'):
        add()
    elif(calculator['operator'] == '-'):
        subtract()
    elif(calculator['operator'] == '*'):
        mulitply()
    elif(calculator['operator'] == '/'):
        divide()
    else:
        power_by()

def new_calculation():
    get_user_operator()
    get_user_first_number()
    get_user_second_number()
    determine_operator_function_and_call_it()

def calculation_based_on_prev_result():
    get_user_operator()
    calculator['first_number'] = calculator['current_total']
    get_user_second_number()
    determine_operator_function_and_call_it()

def reset_values():
    calculator['current_total'] = 0.0
    calculator['first_number'] = 0.0
    calculator['second_number'] = 0.0
    calculator['operator'] = ' '

def print_current_total():
    print('\ncurrent total: '  + str(round(calculator['current_total'],2)))

def flow_manager():
    intro()
    new_calculation()

    while(True):
        print_current_total()
        print('')
        print('To start new calculation enter N')
        print('To exit enter E')
        print('To do more operations on the current total, enter anything else, or just press enter: ')
        option_chosen = input()
        if(option_chosen.upper() == 'N'):
            reset_values()
            new_calculation()
        elif(option_chosen.upper() == 'E'):
            exit()
        else:
            calculation_based_on_prev_result()

flow_manager()
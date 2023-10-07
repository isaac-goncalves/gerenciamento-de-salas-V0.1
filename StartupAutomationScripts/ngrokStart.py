import subprocess
import time
import webbrowser
import os
import sys


# Change to color yellow
os.system('color 0e')

# Change directory and start your software
software_dir = r'../'
subprocess.Popen(f'start cmd /k "cd /d {software_dir} && npm start"', shell=True)
# minimize window
subprocess.Popen('powershell -command "(new-object -com shell.application).minimizeall()"', shell=True)
# Start ngrok in a new window
ngrok_dir = r'.\ngrok-executable'

# if os.path.exists('ngrok_log.txt'):
#     # Use a função os.remove() para excluir o arquivo
#     os.remove('ngrok_log.txt')
#     print(f"O arquivo ngrok_log.txt foi excluído com sucesso.")
# else:
#     print(f"O arquivo ngrok_log.txt não existe.")

ngrok_process = subprocess.Popen(f'start cmd /wait /c "{ngrok_dir}\\ngrok start --all --log=stdout > ngrok_log.txt"', shell=True)

# Wait for a moment to
# 
#  allow ngrok to initialize (adjust the timeout as needed)
print('Waiting for ngrok to initialize...')

# Print progres bar 
toolbar_width = 60

# setup toolbar

sys.stdout.write("[%s]" % (" " * toolbar_width))

sys.stdout.flush()

sys.stdout.write("\b" * (toolbar_width+1)) # return to start of line, after '['

for i in range(toolbar_width):

    time.sleep(0.02) # do real work here

    # update the bar

    sys.stdout.write("-")

    sys.stdout.flush()

sys.stdout.write("\n")


# Read the output file and print the URL on the screen
with open('ngrok_log.txt', 'r') as ngrok_log:
    for line in ngrok_log:
        if 'started tunnel' and 'addr=http://localhost:8080'  in line and 'url=' in line:
            parts = line.split(' ')
            for part in parts:
                if part.startswith('url='):
                    extracted_url = part[4:]
                    print(f'Extracted URL: {extracted_url}')
                    break

# Display a message
print('BOTH ngrok and your software are running, Captain ISAAC!')

# Save the URL to the .env.development file
if extracted_url:
    with open(r'C:\Users\Isaac\Documents\GitHub\gerenciamento-de-salas-V0.1\client\.env.development', 'a') as env_file:
        #clear the file
        env_file.seek(0)
        env_file.truncate()
        #write the url
        env_file.write(f'VITE_REACT_LOCAL_APP_API_BASE_URL= "{extracted_url}"\n')
        print(f'URL saved to .env.development: {extracted_url}')
else:
    print('URL not found in the log file.')

# Wait for user to press Enter before exiting

url_to_open = "http://gerenciamentodesalas.cloud"

# Wait for a moment to allow ngrok to initialize (adjust the timeout as needed)
print('Waiting to open SGSA on the Browser...')

# setup toolbar

sys.stdout.write("[%s]" % (" " * toolbar_width))

sys.stdout.flush()

sys.stdout.write("\b" * (toolbar_width+1)) # return to start of line, after '['

for i in range(toolbar_width):

    time.sleep(0.1) # do real work here

    # update the bar

    sys.stdout.write("-")

    sys.stdout.flush()

sys.stdout.write("\n")

# Open the web browser at the specified URL

webbrowser.open(url_to_open)

os.system('color 0a')

print('Server is Running. Captain ISAAC!')

#enter STOP and enter to stop the script execution 
#change to color yellow 

print('Enter STOP to stop the script and all CMD processes.')

while True:

    if input() == 'STOP':
        #Change to color red 
        os.system('color 0c')
        print('Stopping ngrok and exiting...')
        ngrok_process.terminate()
        #stop npm start process
        subprocess.Popen('taskkill /F /IM node.exe', shell=True)
        #stop cmd process
        subprocess.Popen('taskkill /F /IM cmd.exe', shell=True)
        #Close all other CMD 
        print('Enter RESTART to START script and all CMD processes.')
        #close CMD window
        time.sleep(1)
        #clear the console
        os.system('cls')
        print('All CMD processes closed with success Captain ISAAC!')
        input('Press Enter to exit...')
        os.system('exit')
        exit()
    else:
        print('Incorrect Input. Enter STOP to stop the script and all CMD processes.')



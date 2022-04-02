import sys, json
from lxml import html
import os
from bs4 import BeautifulSoup
import requests
import pandas as pd

data = json.loads(sys.argv[1])

# url = data['tabUrl']
# selectors = data['selectors']
# labels = data['labels']
# html_text = requests.get(url).text
# soup = BeautifulSoup(html_text, 'html.parser')
# newdata = {}

# for i in range(len(selectors)):
#     newdata[labels[i]] = [item.text for item in soup.select(selectors[i])]
# # Print the data in stringified
# print('From Python')
# if newdata:
#     df = pd.DataFrame(newdata)
#     df.to_csv('Scraped_data.csv', index=False)

choice = data['choice']
url = data['tabUrl']
labels = data['labels']
selectors = data['selectors']
# selectors = ['._4rR01T', '._3LWZlK']

newdata = {}

if choice == '1':
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'html.parser')
    for i in range(len(selectors)):
        newdata[labels[i]] = [item.text for item in soup.select(selectors[i])]
    # Print the data in stringified
    print('From Python')

elif choice == '2':
    tree = html.fromstring(requests.get(url).content)
    for i in range(len(selectors)):
        newdata[labels[i]] = tree.xpath(selectors[i])
    print('From Python')

lengths = min([len(newdata[l]) for l in newdata])
# print(lengths)

for i in newdata:
    newdata[i] = newdata[i][0:lengths]

# with open('Scraped_data.txt', 'w') as f:
#     f.write(json.stringify(newdata))

# print(newdata)
# print(len(newdata))
# for i in newdata:
#     print(len(newdata[i]))

if newdata:
    try:
        os.remove('Scraped_data.csv')
        print('File Deleted')
    except OSError:
        print('File Does Not Exist')

    try:
        df = pd.DataFrame(newdata)
        df.to_csv('Scraped_data.csv', index=False)
    except ValueError:
        print('DataFrame Error: ', ValueError)
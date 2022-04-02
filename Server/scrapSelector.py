import sys, json
from lxml import html
import os
from bs4 import BeautifulSoup
import requests
import pandas as pd

data = json.loads(sys.argv[1])

url = data['tabUrl']
labels = data['labels']
selectors = data['selectors']

newdata = {}

html_text = requests.get(url).text
soup = BeautifulSoup(html_text, 'html.parser')
for i in range(len(selectors)):
    newdata[labels[i]] = [item.text for item in soup.select(selectors[i])]
# Print the data in stringified
print('From Python')

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
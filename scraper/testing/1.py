import sys, json
from bs4 import BeautifulSoup
import requests

# Function to calculate the sum of array
def arraysum(arr):
	return sum(arr)

# Get the command line arguments
# and parse it to json
data = json.loads(sys.argv[1])

# Get the required field from
# the data
array = data['array']

# Calculate the result
result = arraysum(array)
# ------------------------------------------------------------------

url = data['url']
selectors = data['selectors']
labels = data['labels']
html_text = requests.get(url).text
soup = BeautifulSoup(html_text, 'lxml')
newdata = {}
newdata = {'sum':[result, result]}
# newdata[labels[0]] = [item.text for item in soup.select(selectors[0])]
# newdata[labels[1]] = [item.text for item in soup.select(selectors[1])]

for i in range(len(selectors)):
    newdata[labels[i]] = [item.text for item in soup.select(selectors[i])]
# Print the data in stringified
# json format so that we can
# easily parse it in Node.js
print(json.dumps(newdata))

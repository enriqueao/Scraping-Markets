#!/usr/bin/python

import json
import requests
import pprint
import MySQLdb
import time
import random
from bs4 import BeautifulSoup


def LoadUserAgents(uafile):
    uas = []
    with open(uafile, 'rb') as uaf:
        for ua in uaf.readlines():
            if ua:
                uas.append(ua.strip())
    random.shuffle(uas)
    return uas


# load the user agents, in random order
uas = LoadUserAgents("user-agents.txt")
ua = random.choice(uas)  # select a random user agent
headers = {
    "Connection": "close",  # another way to cover tracks
    "User-Agent": ua}
url = 'https://www.lacomer.com.mx/lacomer/goBusqueda.action?succId=376&ver=mislistas&succFmt=100&criterio=7501001604325#/7501001604325'
proxy = {
	"http": "http://username:p3ssw0rd@10.10.1.10:3128",
}

data = requests.get(url, proxies=proxy, headers=headers)
# print(data.text)
soup = BeautifulSoup(data.text)   
mydivs = soup.findAll("div", {"class": "li_producto"})
# binary = data.content
print(mydivs)

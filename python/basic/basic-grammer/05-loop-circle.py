# coding=utf-8

i = 2
while (i < 100):
    j = 2
    while (j <= (i / j)):
        if not (i % j):
            break
        j = j + 1
    if (j > i / j):
        print(str(i) + ' is a prime number')
    i = i + 1

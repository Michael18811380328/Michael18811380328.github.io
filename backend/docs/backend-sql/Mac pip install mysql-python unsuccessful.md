# Mac pip install mysql-python

Mac pip install mysql-python unsuccessfulI nstalled MySQL and Workbench from website. I have a django project whose requirements.txt:

```
Django==1.11.12
djangorestframework==3.8.2
django-cors-headers==2.2.0
drfdocs==0.0.11
mysql-python==1.2.5
django-rest-auth==0.9.3
django-allauth==0.35.0
nltk==3.2.5
django-extensions==2.0.7
pyparsing==2.2.0
pydot==1.2.4
```

When I run

```
pip install -r requirements.txt
```

I got an error `mysql_config not found`. To solve this I ran

```
PATH=$PATH:/usr/local/mysql/bin
```

It now throws

```
    _mysql.c:44:10: fatal error: 'my_config.h' file not found
    #include "my_config.h"
             ^~~~~~~~~~~~~
    1 error generated.
    error: command 'cc' failed with exit status 1

    ----------------------------------------
Command ""/Users/nitish/gitProjects/Vision Backlog/vb_env/bin/python" -u -c "import setuptools, tokenize;__file__='/private/var/folders/ql/_w2_rlvs2351pdcnzhn04sf40000gn/T/pip-install-M4ue9E/mysql-python/setup.py';f=getattr(tokenize, 'open', open)(__file__);code=f.read().replace('\r\n', '\n');f.close();exec(compile(code, __file__, 'exec'))" install --record /private/var/folders/ql/_w2_rlvs2351pdcnzhn04sf40000gn/T/pip-record-7OCzf1/install-record.txt --single-version-externally-managed --compile --install-headers "/Users/nitish/gitProjects/Vision Backlog/vb_env/include/site/python2.7/mysql-python"" failed with error code 1 in /private/var/folders/ql/_w2_rlvs2351pdcnzhn04sf40000gn/T/pip-install-M4ue9E/mysql-python/
```

Why is this happening?

UPDATE: following bellow solution threw:

```
Collecting MySQL-python
  Using cached https://files.pythonhosted.org/packages/a5/e9/51b544da85a36a68debe7a7091f068d802fc515a3a202652828c73453cad/MySQL-python-1.2.5.zip
    Complete output from command python setup.py egg_info:
    Traceback (most recent call last):
      File "<string>", line 1, in <module>
      File "/private/var/folders/ql/_w2_rlvs2351pdcnzhn04sf40000gn/T/pip-install-X6b4rU/MySQL-python/setup.py", line 17, in <module>
        metadata, options = get_config()
      File "setup_posix.py", line 53, in get_config
        libraries = [ dequote(i[2:]) for i in libs if i.startswith(compiler_flag("l")) ]
      File "setup_posix.py", line 8, in dequote
        if s[0] in "\"'" and s[0] == s[-1]:
    IndexError: string index out of range
```

第一种

Please, try:

```
CFLAGS=-Qunused-arguments CPPFLAGS=-Qunused-arguments pip install -r requirements.txt
```

If it does not work: First install **mysql-connector-c**

```
brew install mysql-connector-c 
pip install MySQL-python
```

If you are using Windows:

https://dev.mysql.com/downloads/connector/c/

You can also check what happend when you try install it with `pip3.`

*UPDATE:* If you have Linux: Please open the `/usr/local/bin/mysql_config`.

And then:

```
#Create options
Libs = "-L $ pkglibdir "
Libs = " $ libs   -l"
```

replace with:

```
#Create options
Libs = "- L $ pkglibdir"
Libs = "$ libs -lmysqlclient -lssl -lcrypto"
```

Save it and reinstall `mysql-python`.

```
pip uninstall mysql-python
pip install mysql-python
```

For Mac:

```
LDFLAGS=-L/usr/local/opt/openssl/lib pip install mysql-python
```

should be helpful.



第二种

26

Installing of an older version of the MySQL worked for me:

```
brew remove mysql
brew install mysql@5.7
brew link --force mysql@5.7
pip install mysql-python
```

See:

- [issue on the MySQLdb1 Github](https://github.com/farcepest/MySQLdb1/issues/119)
- and [this sof answer](https://stackoverflow.com/questions/51343325/command-cc-failed-with-exit-status-1-on-osx-high-sierra/51351548#51351548)
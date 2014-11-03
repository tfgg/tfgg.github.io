---
permalink: magres-python/install/
layout: page_magres
title:  "Installing MagresPython"
date:   2014-10-03
category: magres-python
categoryname: "MagresPython"
navorder: 2
---

Installing 
==========

The following commands should be entered at the command line, usually with a program called something like `Terminal`. Incidentally, if you are using OS X, I recommend [iTerm2](http://iterm2.com/) as a good terminal to work with.

Summary
-------

Install Python and necessary packages using [Anaconda](https://store.continuum.io/cshop/anaconda/).

```bash
cd ~
git clone https://github.com/tfgg/magres-format.git
cd magres-format
python setup.py install --user
```

If you have trouble with this, there are more detailed instructions below.

Prerequisites
-------------

MagresPython has been tested with Python versions 2.6 and 2.7 and will likely not work with other versions. You should have one of these available on your system; you can test this by running the `python` command from the command line. For example,

    $ python
    Python 2.7.4 (default, Sep 26 2013, 03:20:26) 
    [GCC 4.7.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> 

which gives a Python version of 2.7.4, which is fine.

An easy way to get Python and all of the necessary packages installed is [the Anaconda distribution](https://store.continuum.io/cshop/anaconda/).

If not, you should find out how to get it, preferably by your operating system's package manager, such as `apt` on the Debian and Ubuntu flavours of Linux. If you are using a high-performance computing (HPC) facility, such as [ARCHER](https://www.archer.ac.uk), it may be available as a module that you can load.

MagresPython uses the `numpy` Python module for some linear algebra computations. You may also find the `matplotlib` and `scipy` modules helpful for following the tutorials and doing your own processing.

You can test if you have these modules by opening a `python` shell and executing the `import` commands, giving output similar to the following if successful.

    $ python
    Python 2.7.4 (default, Sep 26 2013, 03:20:26) 
    [GCC 4.7.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import numpy
    >>> import matplotlib
    >>> import scipy

Only numpy is essential. If you are missing any modules, you can download these using the `pip` Python package manager, your operating system package manager, or by loading modules on your HPC.

### Downloading using git

You can get the latest version of the library using the `git` tool. This may not be installed by default on your system. In some appropriate directory run the following commands

```bash
git clone https://github.com/tfgg/magres-format.git
cd magres-format
```

and then follow the rest of the installation process.

### Downloading the zip

If the `git` tool isn't available, you can download using a command such as curl, which should be available on most systems. In some appropriate directory run the following commands

```bash
curl -L "https://github.com/tfgg/magres-format/archive/master.zip" -o "master.zip"
```

and then extract the zip file using the unzip command and cd into the extracted directory

```bash
unzip master.zip
cd magres-format-master
```

Installing
----------

Installing the library will give you access to the code and scripts from anywhere on your system. You will be able to import the `magres` module into your Python code and run scripts such as `extract-ms.py`.

You can now install the library either system wide, which may need superuser privileges, or locally in your user directory, which may require modifying your `PATH` environment variable.

To install system wide, in the directory that you downloaded and extracted the library to, run the following command

```bash
sudo python setup.py install
```

you may need to enter a password. If this fails, you may not have superuser privileges, in which case you will have to install locally.

To install locally in your user directory, run the following command

```bash
python setup.py install --user
```

You may be prompted to add your user `bin` directory to your `PATH` environment variable, or you may find that scripts aren't executing properly. How you fix this depends on what shell you are using. To find out what shell you are using, run the following command

```bash
echo $SHELL
```

If the output is something like `/bin/bash`, then you are running the `bash` shell. If it is something like `/bin/tcsh` then you are running the `tcsh` shell. There are a number of other shells which I won't cover here.

If you are using `bash`, add the following line to your `~/.bashrc`.

```bash
export PATH=$HOME/.local/bin:$PATH
```

If you are using `tcsh`, add the following line to your `~/.tcshrc`.

```tcsh
setenv PATH $HOME/.local/bin:$PATH
```

Once you have done this you should restart your terminal session.

Checking the installation
-------------------------

To check that the library is correctly installed you can try importing the `magres` module and running a script. To check that the module is correctly imported, open a Python shell and execute `import magres`

    $ python
    Python 2.7.4 (default, Sep 26 2013, 03:20:26) 
    [GCC 4.7.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import magres

which should run without error.

To check a script, navigate to a directory, preferably with a calculation in it, and run the following comand in the terminal

```bash
extract-ms.py --help
```

which should output the help information for the `extract-ms.py` script.



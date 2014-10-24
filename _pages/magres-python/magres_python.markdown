---
permalink: magres-python/
layout: page_magres
title:  "The MagresPython library"
date:   2014-10-03
category: magres-python
categoryname: "MagresPython"
navorder: 1
---

The MagresPython library
========================

MagresPython is a [Python](http://www.python.org/) library for parsing the [CCP-NC ab-initio magnetic resonance file format](http://www.ccpnc.ac.uk/pmwiki.php/CCPNC/Fileformat). This is used in the latest version of the [CASTEP](http://www.castep.org/) code, and is coming soon to other codes such as [Quantum ESPRESSO](http://www.quantum-espresso.org/).

The library is designed to be a very expressive way to write code for processing the output of magnetic resonance calculations, interacting well with standard Python conventions, designed from the ground-up to be Pythonic. You can write code like

```python
atoms = MagresAtoms.load_magres('ethanol.magres')
print atoms.species('H').ms.iso
```

to print the isotropic magnetic shieldings of the hydrogen atoms in an ethanol calculation. It also comes with a number of command line helper scripts for use in the course of research.

It is open source and [available on the Github website](https://github.com/tfgg/magres-format).

It has been tested mostly on Linux (the Ubuntu distribution) and OS X.

Documentation
-------------

1. [Installing the library](/magres-python/install/)
2. [Using the scripts](/magres-python/scripts/)


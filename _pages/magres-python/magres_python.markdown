---
permalink: magres-python/
layout: page_magres
title:  "The MagresPython library"
date:   2014-10-03
category: magres-python
categoryname: "MagresPython"
navorder: 1
---

**MagresPython** is a [Python](http://www.python.org/) library for parsing the [CCP-NC ab-initio magnetic resonance file format](http://www.ccpnc.ac.uk/pmwiki.php/CCPNC/Fileformat). This is used in the latest version of the [CASTEP](http://www.castep.org/) code, and is coming soon to other codes such as [Quantum ESPRESSO](http://www.quantum-espresso.org/).

The library is designed to allow you to write expressive code for processing the output of magnetic resonance calculations. It is designed from the ground-up to be 'Pythonic', that is, it is idiomatic Python and interacts well with standard conventions.

Loading the output of a calculation on an ethanol molecule and printing all the isotropic magnetic shieldings of the hydrogen atoms is as easy as

```python
atoms = MagresAtoms.load_magres('ethanol.magres')
print atoms.species('H').ms.iso
```

The library also comes with [a number of command line helper scripts](/magres-python/scripts) for use in the course of research, such as `extract-ms.py`.

It has been tested mostly on Linux (the Ubuntu distribution) and OS X.

If you have any questions about how you can use this library in your research, please contact me using the information in the footer.

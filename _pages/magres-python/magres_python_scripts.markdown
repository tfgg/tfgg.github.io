---
permalink: magres-python/scripts/
layout: page_magres
title:  "Scripts in MagresPython"
date:   2014-10-03
category: magres-python
categoryname: "MagresPython"
---

Available scripts
=================

Some command-line scripts for extracting values from a large number of calculation output files are provided. Look at their help information for detailed instructions. If the script commands don't run correctly, [check the installation guide](/magres-python/install/), especially the section on setting environment variables.

Magnetic shieldings
-------------------

The `extract-ms.py` command-line script extracts magnetic shieldings from a single or a collection of `.magres` files. The input options are

```bash
extract-ms.py [-h] [-N] source [atoms]
```

The `source` is the directory location to look for `.magres` files in, or a specific `.magres` file. If you want to search in the current directly use `.`. Examples:

```bash
extract-ms.py .
extract-ms.py calcs
extract-ms.py ethanol.magres
```

The `atoms` is an optional argument to specify a subset of atoms to print the shieldings of. You can combine several ways to specify this atoms list.

You can select an entire species

    H
    
will select all hydrogen atoms.

You can select a single atom

    H2
    
will select the second hydrogen atom.

You can select ranges of atoms

    H2-5
    
will select the second to fifth hydrogen atoms.

You can also chain these together with commas

    H1-5,O
    
will select the first five hydrogen atoms and all oxygen atoms.

Finally, the optional `-h` flag will print the help information,

```bash
extract-ms.py --help
```

and the optional `-N` flag is a tool for convergence calculations. If your calculations have a structure such as

```bash
calcs/cut_off_energy=20/ethanol.magres
calcs/cut_off_energy=30/ethanol.magres
calcs/cut_off_energy=40/ethanol.magres
calcs/cut_off_energy=50/ethanol.magres
calcs/cut_off_energy=60/ethanol.magres
```

or

```bash
calcs/ethanol-20.magres
calcs/ethanol-30.magres
calcs/ethanol-40.magres
calcs/ethanol-50.magres
calcs/ethanol-60.magres
```

then the `-N` flag will attempt to parse out any numbers in the path and add them as columns to the beginning of the script output. This makes it easy to pipe the output to a data file and plot it using a tool such as `gnuplot`.

Electric field gradients
------------------------
    
For electric field gradients (quadrupolar couplings)
    
    extract-efg.py --help

J-couplings
-----------

For J-couplings (indirect spin-spin coupling)

    extract-jc.py --help

For example,

    extract-ms.py . Zn

Conversion script usage
-----------------------

The `magres-convert.py` script converts an old-style `Castep` magres file to the new-style CCP-NC format for use with the new tools. You use it from the command line like:

    magres-convert.py sample.magres > sample.new.magres

and optionally with the associated job's .castep file, to capture the lattice information,

    magres_convert.py sample.magres sample.castep > sample.new.magres

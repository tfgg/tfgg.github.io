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

### Atom list specifiers

All the scripts take an optional argument that specifies a subset of atoms to print the calculated properties (e.g. magnetic shielding) of. You can combine several ways to specify this atoms list.

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

each of which will print something like the following

```
# Number  Atom  Iso Aniso Asym  Path
1H1 29.469  8.817 0.137 ./ethanol.magres
1H2 30.110  8.068 0.211 ./ethanol.magres
1H3 29.956  7.158 0.061 ./ethanol.magres
1H4 26.840  8.025 0.952 ./ethanol.magres
1H5 27.254  -7.043  0.899 ./ethanol.magres
1H6 31.838  14.111  0.454 ./ethanol.magres
13C1  157.312 33.765  0.699 ./ethanol.magres
13C2  110.691 70.018  0.416 ./ethanol.magres
17O1  267.788 -51.384 0.973 ./ethanol.magres
```

The optional `-h` flag will print the help information,

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

For example, the following will extract the magnetic shieldings for the C1 carbon atom in ethanol from a sequence of cut-off energy convergence calculations

```
20ry/ethanol.magres
30ry/ethanol.magres
40ry/ethanol.magres
50ry/ethanol.magres
60ry/ethanol.magres
```

and write them to a file called `out.dat`

```bash
  extract-ms.py -N . C1 > out.dat
```

and the contents of `out.dat` is now

```
# Number  Atom  Iso Aniso Asym  Path
20.0  13C1  176.526 32.537  0.676 ./20ry/ethanol.magres
30.0  13C1  161.170 33.686  0.707 ./30ry/ethanol.magres
40.0  13C1  157.699 33.744  0.700 ./40ry/ethanol.magres
50.0  13C1  157.312 33.765  0.699 ./50ry/ethanol.magres
60.0  13C1  157.351 33.769  0.699 ./60ry/ethanol.magres
```

which can be plotted as a graph using the `gnuplot` command

```gnuplot
plot 'out.dat' u 1:3 w lp
```

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

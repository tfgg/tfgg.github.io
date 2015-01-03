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

### <a id="atom_lists"></a>Atom list specifiers

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

<table class="table table-striped">
<thead>
<tr><th>Field</th> <th>Usage</th></tr>
</thead>
<tbody>
<tr><td>-h</td> <td>Show help <small>(option)</small></td></tr>
<tr><td>-N</td> <td>Parse numbers from path <small>(option)</small></td></tr>
<tr><td>source</td> <td>Directory of .magres files, or single file</td></tr>
<tr><td>atoms</td> <td><a href="#atom_lists">Atom list</a> string specifying subset to print <small>(option)</small></td></tr>
</tbody>
</table>

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
    
Similar to `extract-ms.py`, `extract-efg.py` is for extracting electric field gradients (quadrupolar couplings) from a collection of `.magres` files. The input options are

```bash
extract-efg.py [-h] [-N] source [atoms]
```

<table class="table table-striped">
<thead>
<tr><th>Field</th> <th>Usage</th></tr>
</thead>
<tbody>
<tr><td>-h</td> <td>Show help <small>(option)</small></td></tr>
<tr><td>-N</td> <td>Parse numbers from path <small>(option)</small></td></tr>
<tr><td>source</td> <td>Directory of .magres files, or single file</td></tr>
<tr><td>atoms</td> <td><a href="#atom_lists">Atom list</a> string specifying subset to print <small>(option)</small></td></tr>
</tbody>
</table>

As with `extract-ms.py`, the `source` is the directory containing the `.magres` files, or a specific `.magres file`, the `-h` option will display the help information and `-N` will try to extract and output numerical parameters from the calculation paths.

An example output for the fluorine EFGs on the first eight fluorine atoms in a given calculation

```bash
extract-efg.py Pb2ZnF6-MD-1000 F1-8
```

```
# Atom  Cq  Eta Path
19F1  -16.25  -0.39 Pb2ZnF6-MD-1000/Pb2ZnF6-MD-1000.magres
19F2  -17.88  -0.29 Pb2ZnF6-MD-1000/Pb2ZnF6-MD-1000.magres
19F3  -14.61  -0.55 Pb2ZnF6-MD-1000/Pb2ZnF6-MD-1000.magres
19F4  -13.47  -0.45 Pb2ZnF6-MD-1000/Pb2ZnF6-MD-1000.magres
19F5  -18.19  -0.41 Pb2ZnF6-MD-1000/Pb2ZnF6-MD-1000.magres
19F6  -16.98  -0.51 Pb2ZnF6-MD-1000/Pb2ZnF6-MD-1000.magres
19F7  -16.23  -0.13 Pb2ZnF6-MD-1000/Pb2ZnF6-MD-1000.magres
19F8  -8.50 -0.88 Pb2ZnF6-MD-1000/Pb2ZnF6-MD-1000.magres
```

or the (snipped) output of the EFG on the first fluorine atom over an entire MD run, using the `-N` option to provide a time counter in the first set of columns, amongst other junk.

```
# Number  Atom  Cq  Eta Path
2.0 6.0 1000.0 2.0 6.0 1000.0 19F1  -16.25  -0.39 ./Pb2ZnF6-MD-1000/Pb2ZnF6-MD-1000.magres
2.0 6.0 1200.0 2.0 6.0 1200.0 19F1  -14.04  -0.47 ./Pb2ZnF6-MD-1200/Pb2ZnF6-MD-1200.magres
2.0 6.0 1400.0 2.0 6.0 1400.0 19F1  -15.55  -0.45 ./Pb2ZnF6-MD-1400/Pb2ZnF6-MD-1400.magres
2.0 6.0 1600.0 2.0 6.0 1600.0 19F1  -21.41  -0.35 ./Pb2ZnF6-MD-1600/Pb2ZnF6-MD-1600.magres
2.0 6.0 1800.0 2.0 6.0 1800.0 19F1  -17.68  -0.39 ./Pb2ZnF6-MD-1800/Pb2ZnF6-MD-1800.magres
2.0 6.0 2000.0 2.0 6.0 2000.0 19F1  -14.93  -0.82 ./Pb2ZnF6-MD-2000/Pb2ZnF6-MD-2000.magres
2.0 6.0 2200.0 2.0 6.0 2200.0 19F1  -14.72  -0.51 ./Pb2ZnF6-MD-2200/Pb2ZnF6-MD-2200.magres
2.0 6.0 2400.0 2.0 6.0 2400.0 19F1  -14.46  -0.52 ./Pb2ZnF6-MD-2400/Pb2ZnF6-MD-2400.magres
2.0 6.0 2600.0 2.0 6.0 2600.0 19F1  -18.44  -0.61 ./Pb2ZnF6-MD-2600/Pb2ZnF6-MD-2600.magres
2.0 6.0 2800.0 2.0 6.0 2800.0 19F1  -18.37  -0.29 ./Pb2ZnF6-MD-2800/Pb2ZnF6-MD-2800.magres
2.0 6.0 3000.0 2.0 6.0 3000.0 19F1  -13.85  -0.62 ./Pb2ZnF6-MD-3000/Pb2ZnF6-MD-3000.magres
```

J-couplings
-----------

The `extract-jc.py` script, similarly to the other extract scripts, extracts J-couplings (indirect spin-spin coupling) from `.magres` output files of caclulations, either a set of them in a directory or a single one. The input options are

```bash
    extract-jc.py [-h] [-J] [-S] [-N] source [atoms1] [atoms2]
```
    
<table class="table table-striped">
<thead>
<tr><th>Field</th> <th>Usage</th></tr>
</thead>
<tbody>
<tr><td>-h</td> <td>Show help <small>(option)</small></td></tr>
<tr><td>-J</td> <td>Show couplings in Hz, default is the reduced coupling <small>(option)</small></td></tr>
<tr><td>-S</td> <td>Sort couplings by strength, default is atom order <small>(option)</small></td></tr>
<tr><td>-N</td> <td>Parse numbers from path <small>(option)</small></td></tr>
<tr><td>source</td> <td>Directory of .magres files, or single file</td></tr>
<tr><td>atoms1</td> <td><a href="#atom_lists">Atom list</a> string specifying subset of atoms to print couplings <em>from</em> <small>(option)</small></td></tr>
<tr><td>atoms2</td> <td><a href="#atom_lists">Atom list</a> string specifying subset of atoms to print couplings <em>to</em> <small>(option)</small></td></tr>
</tbody>
</table>

As with `extract-ms.py` and `extract-efg.py`, the `source` is the directory containing the `.magres` files, or a specific `.magres file`, the `-h` option will display the help information and `-N` will try to extract and output numerical parameters from the calculation paths.

The `-S` option will sort the couplings by strength, which is useful for spotting the largest couplings in a complex crystal! The `-J` option will print the couplings in hertz (Hz), rather than reduced units (10<sup>19</sup>T<sup>2</sup>J<sup>-1</sup>), which is usually observed experimentally, but depends on the exact isotope used.

The `atoms1` and `atoms2` options allow you to provide <a href="#atom_lists">atom lists</a> specifying the starting and ending atoms in the coupling.

For example, the following prints the couplings in hertz between the second selenium atom and all phosphorus atoms in the `.magres` files in the current directory

```bash
extract-jc.py -J . Se2 P
```

giving output like

```
# Showing in Hz (J)
# Number  Atom1 Atom2 isc isc_fc  isc_spin  isc_orbital_p isc_orbital_d Dist  Path
77Se2 31P2 -0.064 -0.136  0.015 0.083 -0.027 6.838 ./Se2/21_211.magres
77Se2 31P3 -0.307 -0.517  0.118 0.119 -0.028 6.547 ./Se2/21_211.magres
77Se2 31P1 -324.039 -324.372  37.267  -37.047 0.113 2.254 ./Se2/21_211.magres
77Se2 31P4 348.006  347.126 -0.102  0.941 0.041 3.467 ./Se2/21_211.magres

```

Conversion script usage
-----------------------

The `magres-convert.py` script converts an old-style `Castep` magres file to the new-style CCP-NC format for use with the new tools. You use it from the command line like:

    magres-convert.py sample.magres > sample.new.magres

and optionally with the associated job's .castep file, to capture the lattice information,

    magres_convert.py sample.magres sample.castep > sample.new.magres

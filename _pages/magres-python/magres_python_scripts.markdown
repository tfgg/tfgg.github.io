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

Some utility scripts for extracting values from a large number of calculation output files are provided. Look at their help information for detailed instructions. If the script commands don't run correctly, [check the installation guide](/magres-python/install/), especially the section on setting environment variables.

Magnetic shieldings
-------------------

The `extract-ms.py` script extracts magnetic shieldings from a single or a collection of `.magres` files.

For magnetic shieldings (chemical shifts)

    extract-ms.py --help
    
For electric field gradients (quadrupolar couplings)
    
    extract-efg.py --help

For J-couplings (indirect spin-spin coupling)

    extract-jc.py --help

These scripts can be called with an atom list to restrict which atoms or couplings are shown. These can select an entire species

    H
    
will select all hydrogen atoms. They can select a single atom

    H2
    
will select the second hydrogen atom. They select ranges of atoms

    H2-5
    
will select the second to fifth hydrogen atoms. These can also be chained together with commas

    H1-5,O
    
will select the first five hydrogen atoms and all oxygen atoms.

For example,

    extract-ms.py . Zn

will print only the magnetic shieldings of zinc atoms in all the `.magres` files found in the current directory.

The `-N` flag optionally outputs in the first columns of the output an attempt at parsing out numbers in a path. This is useful for convergence tests. E.g. the path `grid_scale=2/energy_cut_off=80/ethanol.magres` will output the numbers 2.0 and 80.0 in the first two output columns.

Conversion script usage
-----------------------

The `magres-convert.py` script converts an old-style `Castep` magres file to the new-style CCP-NC format for use with the new tools. You use it from the command line like:

    magres-convert.py sample.magres > sample.new.magres

and optionally with the associated job's .castep file, to capture the lattice information,

    magres_convert.py sample.magres sample.castep > sample.new.magres

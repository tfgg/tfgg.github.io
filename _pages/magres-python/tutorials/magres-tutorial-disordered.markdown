---
permalink: magres-python/tutorials/disordered/
layout: page_magres
title:  "MagresPython: Disordered materials"
date:   2014-10-03
category: magres-python
categoryname: "MagresPython"
navorder: 1
---

Processing disordered EFGs in Gehlenite
=======================================

Crystallographic techniques such as X-ray diffraction (XRD) often only provide
us with an average topology of a material. However, materials can be disordered,
with spatial deviations from the average structure such as disordered chemical
occupancy of sites, disorded atomic positions and temporal deviations in the
form of dynamics. Solid-state NMR can be an effective local probe of this
disorder, revealing more local chemical environments than are present in the
average topology \[[Florian 2013](http://dx.doi.org/10.1039/C3CE40982A)\]. These
observed local chemical environments correspond to the range of local electronic
environments within the full disordered structural model.

By using ab-initio predictions of the NMR properties of possible local
environments, we can piece together the NMR spectrum of a disordered material
and quantify the structural model in terms of deviations from average topology.
This could be, for example, in terms of probabilities of site occupancies,
probabilities of correlated bonding of particular sites or correlations of NMR
properties with continuously disordered structural parameters, such as bond
angles and strain parameters.

Gehlenite is a disordered aluminosilicate consisting of two types of aluminium
site and one type of silicon site. We want to look at aluminium EFGs to quantify
the amount of disorder in the material, in particular the degree of violation of
the "Loewenstein" rule (avoidance of Al-O-Al linkages) and its structural
effects. This is based on analysis performed in [Florian
2012](http://pubs.acs.org/doi/abs/10.1021/cm3016935).

This tutorial [is available as an IPython
notebook](http://nbviewer.ipython.org/github/tfgg/magres-
format/blob/master/notebooks/Processing%20disordered%20EFGs.ipynb), which you
can download, modify and run locally.

Load the bits from the `magres` and other modules that we need:


```python
from matplotlib.pyplot import *
from numpy import *
from magres.utils import load_all_magres
from magres.atoms import MagresAtoms
```

Randomly occupied structures
----------------------------

First, let's load all the structures with random T2 occupation into
`orig_structures`.

You can download a `.zip` file with all the structures in [from
here](http://tfgg.me/files/tutorials/gehlenite_efgs.zip), extract this somewhere
and modify the `PATH` variable to point to the folder where you extracted it.


```python
PATH = "/home/tim/Downloads/magres-doc/workshop/tutorial_disordered" # modify this

orig_structures = load_all_magres(PATH + '/files/orig')
print "We have {} structures".format(len(orig_structures))
```

<div class='stream'>
<pre>We have 24 structures
</pre>
</div>

Let's have a look at the data. The following code will plot a histogram of the
aluminium $C_Q$s in all the structures.


```python
all_Cqs = []
for atoms in orig_structures:
    all_Cqs += atoms.species('Al').efg.Cq
hist(all_Cqs, bins=20)
show()
```


![png](/images/tutorials/magres-tutorial-disordered_9_0.png)


Let's bin our $C_Q$s by what type of aluminium site they're sitting on. Below is
an image of a layer of the gehlenite structure.

<img src="/images/tutorials/magres-tutorial-disordered_11_0.png" width="100%"/>

We have (b) T1 and (c) T2 aluminium sites. T1 sites have four Al/Si neighbours
and T2 sites have three Al/Si neighbours. The number of silicon neighbours
varies. T1 sites have between 0 and 4 silicon neighbours and T2 sites have 0 or
1 silicon neighbours, as one of those neighbours must be a T1 aluminium site.
With this in mind, we'll make the following dictionary structure to hold all our
$C_Q$s:


```python
Al_Cqs1 = {'T1': {0: [], 1: [], 2: [], 3: [], 4: []},
          'T2': {0: [], 1: []},}
```

Next, we'll loop over all the structures and aluminium atoms within them. We'll
then count the number of Al/Si neighbours and number of Si neighbours they each
have, classifying their site in the process. We'll then put the aluminium atom's
$C_Q$ into the correct bin.


```python
def bin_sites(structures, bins):
    # Loop over all calculations
    for i, atoms in enumerate(structures):
      print i,
    
      for Al_atom in atoms.species('Al'):
        # Find all Al and Si neighbours within 3.5 angstroms of this atom
        neighbours = atoms.species(['Al', 'Si']).within(Al_atom, 3.5)
    
        # Classify the site
        if len(neighbours) == 5:
          site = 'T1'
        else:
          site = 'T2'
    
        # Count the number of Si neighbours
        num_Si = len(neighbours.species('Si'))
        
        bins[site][num_Si].append(abs(Al_atom.efg.Cq))

Al_Cqs1 = {'T1': {0: [], 1: [], 2: [], 3: [], 4: []},
          'T2': {0: [], 1: []},}
        
bin_sites(orig_structures, Al_Cqs1)
```

<div class='stream'>
<pre>0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
</pre>
</div>

Let's calculate the means and standard deviations for each site bin.


```python
def calc_stats(bins):
    stats = {'T1': {},
             'T2': {},}
    
    for site in bins:
      for num_si in bins[site]:
        print "Al%s, n_si=%d, Cq=%.2f +- %.2f" % (site, num_si, mean(bins[site][num_si]), std(bins[site][num_si]))
        
        stats[site][num_si] = {'mean': mean(bins[site][num_si]), 'stdev': std(bins[site][num_si])}

        
    return stats

orig_stats = calc_stats(Al_Cqs1)
```

<div class='stream'>
<pre>AlT2, n_si=0, Cq=8.06 +- 1.55
AlT2, n_si=1, Cq=10.70 +- 1.33
AlT1, n_si=0, Cq=2.43 +- 0.84
AlT1, n_si=1, Cq=7.40 +- 1.31
AlT1, n_si=2, Cq=8.73 +- 1.20
AlT1, n_si=3, Cq=8.03 +- 0.96
AlT1, n_si=4, Cq=7.58 +- 0.79
</pre>
</div>

Loewenstein-rule obeying structures
-----------------------------------

We can run the above analysis again against the Loewenstein-rule obeying
structures, in which each T2 pair must be an aluminium and a silicon.


```python
low_structures = load_all_magres(PATH + '/files/low')
print "We have {} structures".format(len(low_structures))
```

<div class='stream'>
<pre>We have 25 structures
</pre>
</div>


```python
Al_Cqs2 = {'T1': {0: [], 1: [], 2: [], 3: [], 4: []},
           'T2': {1: []},}
```


```python
bin_sites(low_structures, Al_Cqs2)
```

<div class='stream'>
<pre>0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
</pre>
</div>


```python
low_stats = calc_stats(Al_Cqs2)
```

<div class='stream'>
<pre>AlT2, n_si=1, Cq=10.63 +- 0.53
AlT1, n_si=0, Cq=1.01 +- 0.23
AlT1, n_si=1, Cq=5.62 +- 0.35
AlT1, n_si=2, Cq=7.26 +- 0.69
AlT1, n_si=3, Cq=7.05 +- 0.34
AlT1, n_si=4, Cq=7.93 +- 0.47
</pre>
</div>

Showing a shift in almost all the $C_Q$s, indicating the effect that T2
Loewenstein-rule violations have on T1 site EFGs.

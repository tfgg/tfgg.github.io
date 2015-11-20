---
permalink: magres-python/tutorials/atoms/
layout: page_magres
title:  "MagresPython: Selecting atoms"
date:   2015-11-20
category: magres-python
categoryname: "MagresPython"
navorder: 1
---

Selecting atoms
===============

The most basic operations in the MagresPython library are to select groups of
atoms in a molecule or crystal. This tutorial will go through a few common
operations.

First, we import the `MagresAtoms` class from the library. This is a container
for a bunch of atoms.


```python
from magres.atoms import MagresAtoms
```

Then, using the `MagresAtoms` class, we load and parse an output file.


```python
atoms = MagresAtoms.load_magres('../samples/ethanol-all.magres')
```

`atoms` is now a collection containing all the atoms in the system


```python
atoms
```

<div class='stream'>
<pre>&lt;magres.atom.MagresAtoms - 9 atoms&gt;</pre>
</div>

MagresPython has been designed to be _pythonic_, meaning that it behaves as
similarly to native Python as possible. `MagresAtoms` behaves like a `list`, you
can use standard builtin functions like `len` on it, which returns the number of
atoms


```python
len(atoms)
```

<div class='stream'>
<pre>9</pre>
</div>

And, like a `list`, you can iterate over all the atoms


```python
for atom in atoms:
    print atom
```

<div class='stream'>
<pre>1H1
1H2
1H3
1H4
1H5
1H6
13C1
13C2
17O1
</pre>
</div>

There are shortcuts for selecting a particular atom of a particular species. The
following code picks out the first carbon atom


```python
atoms.C1
```

<div class='stream'>
<pre>&lt;magres.atom.MagresAtom - 13C1&gt;</pre>
</div>

Atoms are objects and have properties, such as `position`, which is returned as
a numpy array


```python
print atoms.C1.position
```

<div class='stream'>
<pre>[-0.004 -0.004 -0.004]
</pre>
</div>

You can select subsets of atoms, which also behave like lists. For example, to
select all hydrogen atoms in the system


```python
atoms.species("H")
```

<div class='stream'>
<pre>&lt;magres.atom.MagresAtomsView - 6 atoms&gt;</pre>
</div>

You can select all atoms within a certain distance of each other. The following
code selects all atoms within 2 Angstrom of the H1 atom.


```python
atoms.within(atoms.H1, 2.0)
```

<div class='stream'>
<pre>&lt;magres.atom.MagresAtomsView - 4 atoms&gt;</pre>
</div>

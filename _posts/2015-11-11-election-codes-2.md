---
layout: post
title: Follow up to standard codes for UK elections
---

This is a semi-unpublished draft that I'll update as feedback/thoughts come from the [previous post](/2015/11/10/election-codes.html).

## More motivation

Basically, I want a function that will take an election object and map it onto a unique code (or slug, or id)

~~~python
code = f(election)
~~~

From here, there are two options

- everyone to be able to have the same function `f(election)` and, given reasonable knowledge about the election, construct the same code as everyone else
- `f(election)` is determined by a central authority who everyone has to copy

Ideally, I want option one. It's more elegant and avoids the need for a promptly maintained central source. Even if a good central authority exists, such identifiers could simply degenerate into being good election slugs in URLs. I also like the idea that you can work out the identifier for a hypothetical future election. It also seems silly that we can't agree that the name of the 2015 General Election is `ge2015` (or similar).

In favour of giving up and going with option two, arguably it's not possible or sensible to have a shared function `f(election)`. Good reasons are, e.g. if we were to include constituency names, there could be disagreements over their spelling (is it East Oxford or Oxford East?), there's potential for mistakes or change and uncertainty &mdash; we know there's a hypothetical EU referendum in 2016&ndash;17, but we don't know exacty _when_. Given this, the only option is for a central authority to set identifiers for the elections, this might be a random integer, or a URI with GUID, such as

`http://www.bbc.co.uk/things/1e03d3fc-d4f4-4135-974a-5524cfd220bf`

In engineering terms, such proposals are isomorphic to "pick a large, random, natural number and make sure everyone else knows it".


## Concepts

Many people opined that it should be international. I shyed away from discussing this in my original post, on the grounds that it introduced significantly more potential for strange edge cases and complexity in what I want to be a simple, crisp, proposal. I think that this is adequately solved by sticking the 'GB' country-level ISO code on the front, encompassing England, Wales, Scotland and Northern Ireland, to qualify an identifier as being UK-related.

In feedback, Matthew Somerville drove a deeper wedge between the concept of an 'event' and an 'election', which is useful to talk about. Basically, are we looking at events, in which there might be multiple elections in a day, or single elections? Conceptually I had separated different types of election event, e.g. police and local, but lumped together similar elections as a single event, e.g. all local elections happening on the same day.

I think, to be clearer, what we really want is elections. We can start with a concept of a candidacy in the 2015 general election to be the following tuple 

<table class="wide">
<tr>
    <th>Date</th><th>Country</th><th>Assembly</th><th>Constituency</th><th>Party</th><th>Name</th>
</tr>
<tr>
    <td>2015-05-07</td><td>GB</td><td>UK Parliament</td><td>Oxford East</td><td>Labour</td><td>Andrew Smith</td>
</tr>
</table>

If the final three fields are [what YourNextMP crowd sourced](https://yournextmp.com/person/2208/andrew-smith), the first three fields are what we need to uniquely map into an election code. Similarly, a local election candidacy might be

<table class="wide">
<tr>
    <th>Date</th><th>Country</th><th>Assembly</th><th>Ward</th><th>Party</th><th>Name</th>
</tr>
<tr>
    <td>2014-05-22</td><td>GB</td><td>Oxford City Council</td><td>Jericho and Osney</td><td>Labour</td><td>Susanna Pressel</td>
</tr>
</table>

of which, again, the first three fields tell us the election, and final three tell us the rest of the candidacy. 


## The proposal

Internally, [YourNextMP](https://www.yournextmp.com/) used year strings, '2010' and '2015' to distinguish the data fields about each election, but this isn't particularly helpful if there are many different types of election in a year!

When I import candidate data into [Election Mentions](https://www.electionmentions.com/), which is designed to incorporate candidates from multiple elections, I convert '2010' and '2015' to 'ge2010' and 'ge2015', and then use 'eu2014' and 'pcc2012' to refer to the 2014 European Parliament election and 2012 Police and Crime Commissioner election. So far, the codes used are

| Election | Code |
|----------|------|
| General Election 2010 | ge2010  |
| General Election 2015 | ge2015  |
| Police and Crime Commissioner 2012 | pcc2012  |
| European Parliament 2014 | eu2014 |

All of these are nice, short codes, usually corresponding to the Twitter hashtag that was being used for that election &mdash; perhaps indicating that they're maximally understandable for their length. Short codes are appealing aesthetically and work nicely in URIs, e.g.

`http://www.yourcandidates.com/ge2015/oxford-east/`,

for a hypothetical generalized election website.

### The requirements

I think that good election codes

- are short and hashtag-esque
- have a meaning guessable at a glance
- work in URIs, i.e. they should only consist of [unreserved characters](http://www.ietf.org/rfc/rfc3986.txt): uppercase and lowercase letters, decimal digits, hyphen, period, underscore, and tilde
- can be worked out independently, so no central authority, just a standard
- can be worked out with minimal knowledge of previous elections 
- can be worked out with no knowledge of other election types
- are static and don't depend on future elections

This is why, sensible as the idea is, I don't think we should use the Wikipedia page corresponding to the election as its code. I also don't think we should use random integer codes for elections: they're not understandable at a glance, unlike a hashtag, require a central authority to set, and can't be sensibly ordered without full knowledge of every UK election that has ever happened.

### The pattern

There's a really brain dead-simple pattern emerging here: `[election type] + [year number]`.

Another option would be `[election type] + [full date]`, such as `ge2015-05-07`.

However, there are a few wrinkles that these scheme needs to handle: by-elections, and multiple elections of the same type happening in a year.

### By-elections

By-elections happen pretty regularly; there were five parliamentary by-elections in 2014. Some go past without anyone noticing, some are a major event. Either way, we need some way of assigning them a code.

You could model by-elections as general elections except over a subset of seats, but it'd be unpleasant to have the code of a general election depend on how many by-elections had happened so far in a year.

I think it's reasonable to know how many by-elections have happened since the last general election, so I propose that by-elections are coded as `[general election code] + -by + [by-election count]`, the hyphen to prevent clash with the multiple election notation explained below. So, for example, the first by-election after the 2010 general election, which happened on the 13<sup>th</sup> of January 2011 in Oldham East and Saddleworth, would be `ge2010-by1`. If multiple by-elections to the same assembly happen on the same day, they're coded as part of the same election.

Another possibility is to code it as the year the by-election happened, so that first by-election of the 2010&ndash;2015 parliament would be `ge2011-by1`. I think this is a bit confusing, since there's no corresponding `ge2011`. 

Another option would be to code by-elections by their location, 

### Multiple elections in a year

An election of a particular type can happen multiple times in a year. It doesn't happen often, but in 1974 there were two general elections, one on the 28<sup>th</sup> of February, resulting in a hung parliament, and one on the 10<sup>th</sup> of October, giving an overall majority to the Wilson government.

Since we want election codes to be stable going forward, I propose that the first of those two elections would be `ge1974` and the second `ge1974b`, i.e. we add an incrementing letter for every additional election, starting from 'b'. Requiring the first election to be `ge1974a` would either require prescience or all general elections to be suffixed 'a', which is just plain ugly for such a rare case. The first by-election of the 1974-1979 parliament would be `ge1974b-by1`.

We could go back to the previous suggestion that all elections be notated with the full date, e.g. `ge1974-02-28` and `ge1974-10-10`.

### Mayoral elections

Mayoral elections (London, Bristol, Liverpool and Salford in 2016, [17 in total](https://en.wikipedia.org/wiki/Directly_elected_mayors_in_England_and_Wales#List_of_directly_elected_mayors)) are a potentially interesting case. They're not really an assembly, they're just a series of independent posts. In a way, their election is more like a by-election than a general election. The elections will happen on the same day in the year, so they could just all be grouped together into something like `mayor2016`. Alternatively they could be separated by post, such as `mayor-london2016` and `mayor-bristol2016`, so they don't influence each other.

## Draft election types

Below is a draft table of proposed election type prefixes.

| Election type | Proposal | Position title | Domain |
|---------------|--------|----|---|
| United Kingdom Parliament | ge | mp | parliament.uk |
| Scottish Parliament | sp | msp | scottish.parliament.uk |
| National Assembly for Wales | wa | am/wam | assembly.wales |
| Northern Ireland Assembly | ni | mla | niassembly.gov.uk |
| European Parliament (UK) | eu | mep | europarl.europa.eu |
| Local elections | local | cllr | ? |
| Referendum | ref | ? | ? |
| London Assembly | lon | am/lam | london.gov.uk |
| Mayoral Election | mayor | mayor | ? |
| Police and Crime Commissioner | pcc | pcc | police.uk? |

These are all up for argument. I haven't chosen a solid principle, more aesthetics. Some reflect the name of the assembly, some reflect the geographic region covered. For mayoral elections, `mayor` is long, but seems better than `ma` or `may` in scannability.

I've also put in two extra column with an alternate ideas. The first uses the title of the elected member for that assembly, with the slight problem that London and Welsh Assembly members are both called 'AM's. A search for [#mp2015](https://twitter.com/search?q=%23mp2015) also reveals limited relevant use compared to [#ge2015](https://twitter.com/search?q=%23ge2015). The second uses the domains for the different assemblies, though not all election types really have them.

### Local elections?

Should local elections be included in one code, `loc`, or split up over all the [different types of local government](https://www.gov.uk/understand-how-your-council-works/types-of-council)

- county council above district, borough or city council
- unitary authorities in shire areas, London boroughs, or metropolitan boroughs

with optional parish, community and town councils below those. The elections usually all happen on the same day. Keeping track of local by-elections is a bit more exciting, [this page](http://www.englishelections.org.uk/england/lby/) lists 33 local by-election dates having happened so far in England in 2015, 50 in 2014.

## Wrapping up

So, that's the proposal. How stupid is it? Am I trying to conserve characters too hard? Is there a much better way to handle by-elections, or multiple elections in a year? Should we just centrally assign random integers? Comment below or <a href="https://twitter.com/tfgg2">tweet at me</a>.

Do you want to be involved in this sort of thing? Check out <a href="https://democracyclub.org.uk/">Democracy Club</a> and drop us an email to join Slack.


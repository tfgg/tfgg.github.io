---
layout: post
title: Standard codes for UK elections
---

This is something that's been bumping around my head for a bit, and has come up quite a bit in chats around [Democracy Club](https://www.democracyclub.org.uk/) and civic technology generally. It's a very simple but, I'd say, necessary bit of infrastructure for UK elections online: <em>standardised codes for elections</em>.

## Why?

It's hard building websites like [YourNextMP](https://www.yournextmp.com) (crowdsourcing candidate info), or [MP CV](http://cv.democracyclub.org.uk/) (gathering CVs of candidates) to last for multiple elections. If you only target general elections in the UK you'll be waiting for five years to test your improvements! However, recently there's been more momentum to do so, as we've realised the benefits of being able to iterate over many elections, year-on-year. In 2016, [Democracy Club is planning on covering elections](https://democracyclub.org.uk/blog/2015/10/19/plans-for-2016/) of

- the Northern Irish Assembly
- the Welsh Assembly
- the Scottish Parliament
- Police and Crime Commissioners
- City Mayors

If our tools and sites are handling all these different elections, we need a unified way to refer to these different elections over all the different datasets and sites that are produced during an election.

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

There's a really brain dead-simple pattern emerging here: `[election type] + [year number]`. However, there are a few wrinkles that these scheme needs to handle: by-elections, and multiple elections of the same type happening in a year.

### By-elections

By-elections happen pretty regularly; there were five parliamentary by-elections in 2014. Some go past without anyone noticing, some are a major event. Either way, we need some way of assigning them a code.

You could model by-elections as general elections except over a subset of seats, but it'd be unpleasant to have the code of a general election depend on how many by-elections had happened so far in a year.

I think it's reasonable to know how many by-elections have happened since the last general election, so I propose that by-elections are coded as `[general election code] + by + [by-election count]`. So, for example, the first by-election after the 2010 general election, which happened on the 13<sup>th</sup> of January 2011 in Oldham East and Saddleworth, would be `ge2010by1`. If multiple by-elections to the same assembly happen on the same day, they're coded as part of the same election.

Another possibility is to code it as the year the by-election happened, so that first by-election of the 2010&ndash;2015 parliament would be `ge2011by1`. I think this is a bit confusing, since there's no corresponding `ge2011`. 

### Multiple elections in a year

An election of a particular type can happen multiple times in a year. It doesn't happen often, but in 1974 there were two general elections, one on the 28<sup>th</sup> of February, resulting in a hung parliament, and one on the 10<sup>th</sup> of October, giving an overall majority to the Wilson government.

Since we want election codes to be stable going forward, I propose that the first of those two elections would be `ge1974` and the second `ge1974b`, i.e. we add an incrementing letter for every additional election, starting from 'b'. Requiring the first election to be `ge1974a` would either require prescience or all general elections to be suffixed 'a', which is just plain ugly for such a rare case.

The first by-election of the 1974-1979 parliament would be `ge1974b-by1`.
The first by-election of the 1974-1979 parliament would be `ge1974b-1`.
The first by-election of the 1974-1979 parliament would be `ge1974b_1`.
The first by-election of the 1974-1979 parliament would be `ge1974b.1`.
The first by-election of the 1974-1979 parliament would be `ge1974b~1`.

## Proposed election types

Below is the table of proposed election type prefixes.

| Election type | Prefix |
|---------------|--------|
| United Kingdom Parliament | ge |
| Scottish Parliament | sp |
| National Assembly for Wales | wa |
| Northern Ireland Assembly | ni |
| European Parliament (UK) | eu |
| Local elections | loc |
| Referendum | ref |
| London Assembly | lon |
| Mayoral Election | ma |

These are all up for argument. I haven't chosen a solid principle, more aesthetics. Some reflect the name of the assembly, some reflect the geographic region covered. For mayoral elections, `may` seems better than `ma`, but e.g. `may2020` might make people think of the general election in May 2020.

### Local elections?

Should local elections be included in one code, `loc`, or split up over all the [different types of local government](https://www.gov.uk/understand-how-your-council-works/types-of-council)

- county council above district, borough or city council
- unitary authorities in shire areas, London boroughs, or metropolitan boroughs

with optional parish, community and town councils below those. The elections usually all happen on the same day. Keeping track of local by-elections is a bit more exciting, [this page](http://www.englishelections.org.uk/england/lby/) lists 33 local by-election dates having happened so far in England in 2015, 50 in 2014.

## Wrapping up

So, that's the proposal. How stupid is it? Is there a much better way to handle by-elections, or multiple elections in a year? Should we just centrally assign random integers? Comment below or <a href="https://twitter.com/tfgg2">tweet at me</a>.

Do you want to be involved in this sort of thing? Check out <a href="https://democracyclub.org.uk/">Democracy Club</a> and drop us an email to join Slack.


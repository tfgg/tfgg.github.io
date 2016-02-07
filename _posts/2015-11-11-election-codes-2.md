---
layout: post
title: Follow up to standard codes for UK elections
---

This is a follow-on from my [previous post](/2015/11/10/election-codes.html). I was originally going to publish my full proposal in the first post, but decided to hold off in order to get feedback. I think this was a good idea, as the proposal has changed quite a bit in response to [feedback to that post](https://democracyclub.org.uk/blog/2015/11/12/help-us-make-id-election-uk/) and my [talk at Citizen Beta](/files/citizenbeta_december_2015.pdf)!

## Motivation

To go back over the original post, we want unique identifiers for UK elections. Once we have identifiers, we can hang lots of useful information off them:

- Polling station locations
- Candidate lists
- Financial reports
- Election notices

This is all with the ultimate, citizen-centered goal, of reducing the cognitive load (or 'head space' as [Temi Ogunye's report put it]()) of taking part in UK democracy. In essence, current democracy is designed for the 'perfect' citizen who has the time and inclination to navigate the frustrating world of election data in order to become sufficiently informed.

Modern democracy should use technology to remove these barriers. We think it's as simple a vision as, for example, Google Now being able to pop up a card that tells you there's an election next week, who the candidates are, and where your polling station is.

## Original proposal

My original proposal was going to be something like

| Election | Code |
|----------|------|
| General Election 2010 | ge2010  |
| General Election 2015 | ge2015  |
| Police and Crime Commissioner 2012 | pcc2012  |
| European Parliament 2014 | eu2014 |

So, cute short codes that work well as hashtags. But this rapidly runs into issues when you step away from general elections

- Internationalization
- How are by-elections handled?
- How are multiple elections in one year handled? (e.g. there were two general elections in 1974)
- What is an election? Is each PCC a separate election? Mayors? Local councils?
- How are constituencies/areas identified by name (if necessary)

There's also the strong argument that these sorts of identifiers-with-meaning are a bad idea, and we should just assign random numbers, perhaps qualified in a URL. I'm going to discuss each of these below.

## Internationalization

Several people opined that the identifiers should be internationalizable, so that similar codes could be developed in other countries. This seems best achieved by sticking the country code on the front of the identifier. The strange thing here is that the ISO 3166 code for the UK is `gb` rather than the expected `uk`. The `gb` code still includes Northern Ireland within it. Another principle would be to use the ccTLD, allowing us to use `uk`. However, sticking with ISO 3166 seems sensible.

## By-elections and multiple elections in a year

At first, I was going to suggest numbering by-elections sequentially, e.g. `ge2015-by1` would be the Oldham West and Royton by-election, the first of the new parliament. Based on feedback, many people suggested simply having the ISO 8601 date of the start of polling as part of the identifier. This works nicely, as it also deals with the issue of multiple elections in a year, such as the two general elections in 1974. This works so long as we never have two general elections on the same day.

## What is an election?

This is a surprisingly tricky difficult question to answer usefully. My original proposal seemed to reflect 'events' more than 'elections', lumping together all the local elections into one identifier. There's a range of possibly contradictory views

- Is ever election notice a different election? If so, each parliamentary constituency is a separate election
- Are elections to posts within the same assembly part of the same election? If so, all the parliamentary constituencies are in the same election
- Are elections for solo posts, such as a city mayor or police and crime commisioner, separate elections?
- Is each by-election a separate election? If so, by-elections happening on the same day are different.
- Do different voting methods mean different elections? If so, Scottish Parliament constituency MSP elections are separate from regional MSPs, though they are elected to the same assembly

Selfishly, I want identifiers which are maximally useful for the YourNextRepresentative (the generalized version of YourNextMP), and it's a bonus if they're picked up elsewhere. Approaching the problem this way will guarantee that it's useful for at least one project!

The model I've come up with for an election, though this could still fail for certain edge cases, is by looking through the lens of a candidacy. I've laid out the different components of a candidacy below, and labelled groups of them by what I think defines certain concepts

<style>
div.post table.spans td {
    border: 0;
}

div.post table.spans td.hack {
    width: 0;
}

div.post table.spans td.span {
}
</style>
<table class="wide spans">
<tr>
    <th>Date</th><th>Country</th><th>Election type</th><th>Election subtype</th><th>Area</th><th>Party</th><th>Name</th>
</tr>
<tr>
    <td colspan="7" style="background:#fcc" class="span">Candidacy</td>
</tr>
<tr>
    <td>&nbsp;</td><td colspan="3" style="background:#ffc;" class="span">Assembly</td><td colspan="3">&nbsp;</td>
</tr>
<tr>
    <td>&nbsp;</td><td colspan="4" style="background:#cfc;" class="span">Post</td><td colspan="2">&nbsp;</td>
</tr>
<tr>
    <td colspan="5" style="background:#ccf;" class="span">By-election</td><td colspan="2">&nbsp;</td>
</tr>
<tr>
    <td colspan="4" style="background:#fcf;" class="span">Election</td><td colspan="3">&nbsp;</td>
</tr>
</table>

The election type would be national-level assembles, or groups of elections, e.g.:  UK Parliament, Scottish Parliament, National Assembly of Wales, Northern Irish Assembly, Police and Crime Commissioner, City Mayor, London Assembly, or local authority.

Election sub-types would depend on the election type. For example, for a local authority election, it would specify the council involved. For PCC or mayor, it would indicate the police area or city. For the Scottish Parliament, GLA or Welsh Assembly it would specify the type of post, e.g. region or constituency.

So, [Andrew Smith's]() candidacy in the 2015 general election could be represented as

<table class="wide">
<tr>
    <th>Date</th><th>Country</th><th>Election type</th><th>Area (constituency)</th><th>Party</th><th>Name</th>
</tr>
<tr>
    <td style="background:#fcf;">2015-05-07</td><td style="background:#fcf;">GB</td><td style="background:#fcf;">UK Parliament</td><td>Oxford East</td><td>Labour</td><td>Andrew Smith</td>
</tr>
</table>

and a candidate in the local election

<table class="wide">
<tr>
    <th>Date</th><th>Country</th><th>Election type</th><th>Election sub-type</th><th>Area (ward)</th><th>Party</th><th>Name</th>
</tr>
<tr>
    <td style="background:#fcf;">2014-05-22</td><td style="background:#fcf;">GB</td><td style="background:#fcf;">Local</td><td style="background:#fcf;">Oxford City Council</td><td>Jericho and Osney</td><td>Labour</td><td>Susanna Pressel</td>
</tr>
</table>

and by-elections, the only case where the area is included,

<table class="wide">
<tr>
    <th>Date</th><th>Country</th><th>Election type</th><th>Area (consituency)</th><th>Party</th><th>Name</th>
</tr>
<tr>
    <td style="background:#ccf;">2015-12-03</td><td style="background:#ccf;">GB</td><td style="background:#ccf;">UK Parliament</td><td style="background:#ccf;">Oldham West and Royton</td><td>Labour</td><td>Michael Meacher</td>
</tr>
</table>

For something like the London Mayoral election, or PCC election, it seems best to effectively consider each a single-post assembly.

<table class="wide">
<tr>
    <th>Date</th><th>Country</th><th>Election type</th><th>Election subtype</th><th>Party</th><th>Name</th>
</tr>
<tr>
    <td style="background:#fcf;">2015-12-03</td><td style="background:#fcf;">GB</td><td style="background:#fcf;">Mayoral</td><td style="background:#fcf;">London</td><td>Conservatives</td><td>Zac Goldsmith</td>
</tr>
</table>

for the issue of different voting methods, this occurs in the Scottish Parliament (constituency and region), the National Assembly for Wales (constituency and region), and the London Assembly (constituency and additional).

<table class="wide">
<tr>
    <th>Date</th><th>Country</th><th>Election type</th><th>Election subtype</th><th>Area (region)</th><th>Party</th><th>Name</th>
</tr>
<tr>
    <td style="background:#fcf;">2015-05-05</td><td style="background:#fcf;">GB</td><td style="background:#fcf;">Scottish Parliament</td><td style="background:#fcf;">Constituency</td><td>Central Scotland</td><td>SNP</td><td>Alex Neil</td>
</tr>
</table>

## Random identifiers or something else?

Why not just use a random unique identifier? This was suggsted by a few people. This would involve a central authority issuing identifiers, e.g. [Wikidata](https://www.wikidata.org/wiki/Wikidata:Main_Page) or the [Electoral Commission](), which everyone would refer to. The random identifier could even be part of a URI if you're into linked data.

This means you don't have to suffer differences in opinion over how to spell constituencies, how to code specific elections, and you can even handle elections which haven't had their date set yet (e.g. the UK's EU referendum).

Existing central authorities include

- Wikipedia pages on elections / Wikidata
- The Electoral Commission's financial database has identifiers for different elections
- data.parliament.uk has [objects for parliamentary elections](http://lda.data.parliament.uk/elections.html)
- The BBC has some election objects: http://www.bbc.co.uk/things/1e03d3fc-d4f4-4135-974a-5524cfd220bf

If there's an authority that's willing to take responsibility for assigning IDs, that'd be great. I have a few reservations

- An authority might not issue identifiers in a timely fashion. Ideally, we (Democracy Club) want identifiers for all 2016 elections, like, now
- Each possible authority has a mandate for a different section of elections. Even the Electoral Commission doesn't appear to have much involvement in Parish Council elections. This makes it difficult for them to take responsibility for a central register of elections.
- No-one else has handled our use case yet, so apparently no-one else has our needs. Hence, the way someone else handes identifiers might, for some reason, conflict with our needs. 
- It's not necessary if we can define a good standard for generating identifiers, freeing everyone from having to coordinate

If those don't convince you, which I can understand, you can probably stop reading here and just say that we should build a list of elections on, like, Wikidata. I imagine we'll publish our own dataset there, with any identifiers we come up with, and it might turn out people just want to use the Wikidata identifiers.

Someone at Citizen Beta suggested taking [a hash](https://en.wikipedia.org/wiki/Hash_function) of the election notice published on the council website. This is crazy and I like it, but it means that election identifiers can't be generated until the election notices come out.

## How are areas identified by name

The above model of a by-election includes the post area. If we want to include this in the identifier, how do we do so? Natural language names often have the problem of different spellings, or layouts. For example, some people might write 'City of Durham', 'Durham City', or even 'Durham, City of'. A couple of people suggested using Office of National Statistics GSS codes, e.g. E14000641 for City of Durham constituency.

## The proposal

### The requirements

I think that good election identifiers

- have a meaning guessable at a glance
- work in URIs, i.e. they should only consist of [unreserved characters](http://www.ietf.org/rfc/rfc3986.txt): uppercase and lowercase letters, decimal digits, hyphen, period, underscore, and tilde
- can be worked out independently, so no central authority, just a standard
- can be worked out with minimal knowledge of previous elections 
- can be worked out with no knowledge of other election types
- can be partially parsed for routing information (but not necessarily invertible as a serialization of a data structure), e.g. knowing what country the election is in, so the correct repository can be checked
- are static and don't depend on future elections

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


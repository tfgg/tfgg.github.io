---
layout: post
title: Accuracy of crowdsourcing in the UK election
---

For the 7<sup>th</sup> of May 2015 UK General Election I worked with [Democracy Club](https://democracyclub.org.uk/) on [YourNextMP](https://www.yournextmp.com/), which developed what we think was the most accurate and comprehensive database of the candidates for the UK Parliament (to be MPs). This was all with the extra bonus of being [CC-BY-SA](https://creativecommons.org/licenses/by-sa/4.0/), meaning it could be browsed for free by over one million users and re-used, for example, by Google’s election widget to expose it to millions more.

<img alt="Google's election widget" src="/images/ynmp_accuracy/ynmp_google1.png"/>
<div class='caption'>
    Google's election widget, powered by YourNextMP data
</div>

YourNextMP was crowdsourced Wikipedia-style. Over 2,600 users signed up to edit candidates on YourNextMP, contributing around 25,000 edits. The moderation team (myself and others!) tried to check these edits for accuracy against any sources, and responded to reports of bad data as fast as possible.

We want to [do the same again](https://democracyclub.org.uk/blog/2015/10/19/plans-for-2016/) in 2016 for the Scottish Parliament, Welsh Assembly, Northern Irish Assembly, Police and Crime Commissioners and Mayoral elections. In addition, [the codebase](https://github.com/mysociety/yournextrepresentative), which Democracy Club collaborated with [mySociety](https://www.mysociety.org/) to develop, has also been generalised as [YourNextRepresentative and deployed internationally](https://www.mysociety.org/2015/08/17/yournextrepresentative-helping-inform-the-argentine-electorate/).

An interesting question, and an important one for future elections, is

<p class="quote">
    "At any given time how accurate were we, and why?"
</p>

Being able to answer that question helps us estimate how reliable the data might be for different purposes at a particular time before an election. We might also find warning signs of bad data and new strategies for moderation.

## The data and errors

Each candidate had a bunch of properties, such as what constituency they were standing in, what party they were running for, what their email address is, their social media accounts, et cetra. We kicked off the database in late 2014 with all the candidates from 2010. Each was marked indicating that we didn’t know if they were standing again. Over time new candidates were added or 2010 candidates were marked as known to be standing or not

<img alt"An example YourNextMP profile" src="/images/ynmp_accuracy/ynmp_profile.png"/>
<div class='caption'>
    An example YourNextMP profile
</div>

There are two basic types of error that we can talk about. One is whether the information corresponded to what actually happened on the 7<sup>th</sup> of May, the other is whether YourNextMP was an accurate representation of what was possible to know at the time.

Errors in some properties, for example what constituency they were standing in, or indeed if they existed at all, could be due to the information simply not existing. Some candidates didn’t announce themselves and weren’t possible to know about until nominations were released! In addition, some candidates [stood down](http://www.theguardian.com/uk-news/2015/feb/25/labour-candidate-chosen-to-face-galloway-resigns-after-three-days) [for](http://www.theguardian.com/politics/2015/mar/23/afzal-amin-quits-conservative-candidate-edl-plot-allegations) [various](http://www.mirror.co.uk/news/uk-news/liberal-democrat-candidate-stands-down-5406616) [reasons](http://www.independent.co.uk/news/uk/politics/generalelection/ukip-mep-diane-james-shocks-party-by-standing-down-as-a-candidate-at-general-election-10077705.html).

<img alt"A statement of persons nominated in all its PDF glory" src="/images/ynmp_accuracy/sopn.png"/>
<div class='caption'>
   A statement of persons nominated, published about a month before the election, and sometimes the first time we'd heard of a candidate! 
</div>

Errors could also be due to dodgy information added by volunteers or mistakes such as duplicating candidates. We _hope_ this is the less likely problem, but it's also the problem we can do more about!

Different tasks are tolerant of different types of error. For example, a tool to email all your candidates would be tolerant of a candidate not having a photo or the wrong Twitter account. On the other hand, missing candidates would be really bad for a tool that wants to tell you exactly what your ballot paper will look like.

<p style="background:#eee;padding:1rem;">
<i class="fa fa-code"></i>
The code I used to do the following analysis is <a href="">available as an IPython notebook</a>.
</p>

## Editing behaviour

As YourNextMP keeps the version history of each candidate, we can reconstruct each edit and how it changed their constituency.

### Rate of edits

First and simplest is just how many edits were being made per day.

<img alt"Edit rate" src="/images/ynmp_accuracy/edit_rate.png"/>
<div class='caption'>
   The number of edits per date 
</div>

Some of the most furious days were probably bots, but very keen volunteers are a possibility!

### First and last edits

We can look at when a candidate was added, and how many candidate profiles we had in a final state, i.e. when the first and last edits were, given that they actually ran in the end. This looks at all edits except for the election results being added.

<img alt"A statement of persons nominated in all its PDF glory" src="/images/ynmp_accuracy/first_last_edit.png"/>
<div class='caption'>
    Time of first and last edits to candidates
</div>

For first edits, all remaining candidates were added within a day or two of nominations coming out (some councils were difficult to track down!), with the little bump at the end being the approximately 250 we hadn’t known about.

For the last edits, as you can see, it was a pretty intense slog towards the end, getting steeper as the last edits clicked into place.

## Candidate standing accuracy

### What edits did
 
Now we've looked at the basic outline of how edits happened, here I'm going more in depth to look at what constituency a candidate was supposedly standing in at any one time.
 
The vast majority of records, 6,753 out of 7,088, only changed constituency once or twice, i.e. they were added and left alone, or were added &mdash; including imports from 2010, which were marked with unknown state for 2015 &mdash; and then changed once, often to mark them as definitely not standing.

We can think about how an edit transitions a candidate's constituency from one state to the next. The different states identified are

| State | Meaning |
|-------|---------|
| Undiscovered | We don't currently know this person exists |
| Not known | We don't know if this person is standing in 2015 |
| Not standing | We don't think this person is standing in 2015 |
| Standing | We think we know what constituency this person is standing in |

For example, the transition 'Undiscovered → Standing' is probably good, as if it's accurate it improves the the dataset, while the transition 'Not standing → Standing' is bad, as it indicates we were previously wrong about our assertion that the candidate wasn't standing

The following table shows the number of each type of edit transition on the constituency field. I've coloured it by whether an edit <span style='background:#ffc;'>is neutral</span>, <span style='background:#fcc'>appears to be removing bad information</span>, <span style='background:#cfc'>is new information</span> or <span style='background:#ccf;'>is a duplicate being discovered</span>.

<style>
table#table_transitions td:nth-child(2), table#table_transitions th:nth-child(2) {
    text-align: right;
}

table#table_transitions tr:nth-child(odd) td {
}

</style>
<table class='wide' id='table_transitions'><thead>
<tr>
<th>Transition (current edit → next edit)</th>
<th># Count</th>
<th>Main interpretation</th>
</tr>
</thead><tbody>
<tr style='background:#ffc;'>
<td>Undiscovered → Not known</td>
<td>4,130</td>
<td>Import all 2010 candidates</td>
</tr>
<tr style='background:#cfc;'>
<td>Undiscovered → Standing</td>
<td>3,100</td>
<td>Add a new candidate</td>
</tr>
<tr style='background:#cfc;'>
<td>Not known → Not standing</td>
<td>1,960</td>
<td>Mark a 2010 candidate as not standing</td>
</tr>
<tr style='background:#cfc;'>
<td>Not known → Standing</td>
<td>1,154</td>
<td>Give a 2010 candidate their 2015 constituency</td>
</tr>
<tr style='background:#fcc;'>
<td>Standing → Not standing</td>
<td>351</td>
<td>Isn't actually standing</td>
</tr>
<tr style='background:#fcc;'>
<td>Not standing → Standing</td>
<td>147</td>
<td>Is actually standing</td>
</tr>
<tr style='background:#ccf;'>
<td>Not standing → Merged</td>
<td>91</td>
<td>Duplicate candidate</td>
</tr>
<tr style='background:#ccf;'>
<td>Standing → Merged</td>
<td>55</td>
<td>Duplicate candidate</td>
</tr>
<tr style='background:#fcc;'>
<td>Standing → Standing elsewhere</td>
<td>44</td>
<td>Wrong constituency</td>
</tr>
<tr style='background:#fcc;'>
<td>Standing → Not known</td>
<td>24</td>
<td>We don't actually know</td>
</tr>
<tr style='background:#fcc;'>
<td>Not standing → Not known</td>
<td>8</td>
<td>We don't actually know</td>
</tr>
<tr style='background:#ffc;'>
<td>Undiscovered → Not standing</td>
<td>5</td>
<td></td>
</tr>
<tr style='background:#ccf;'>
<td>Not known → Merged</td>
<td>1</td>
<td>Duplicate candidate</td>
</tr>
</tbody></table>
<div class='caption'>
    Counts of every transition in the constituency field
</div>

I've [made a separate page](/ynmp/transitions/) with all the edit messages for <span style='background:#fcc;'>the negative cases</span>. They make for some illuminating reading as to the sorts of error being corrected!

### Accuracy over time

We've looked at what the effect of each edit was, and we can now look at any point in time and see how correct YourNextMP was relative to the final database &mdash; if we thought a candidate was known to be standing, did they actually end up standing, and vice versa, on the 7<sup>th</sup> of May?

We can also see how many we just didn’t know about, either that they were standing again, or that they existed at all &mdash; "unknown". This might be considered a softer error than claiming that someone isn’t standing at all. These three possibilities give the matrix below, which I’ve put in example values for from the 1<sup>st</sup> of March.

<table><thead>
<tr>
<th></th>
<th>Did stand</th>
<th>Didn’t stand</th>
</tr>
</thead><tbody>
<tr>
<td>Standing</td>
<td style="background:#CFC">3044 (+14 diff constituency)</td>
<td style="background:#FCC">125</td>
</tr>
<tr>
<td>Not standing</td>
<td style="background:#FCC">23</td>
<td style="background:#CFC">1087</td>
</tr>
<tr>
<td>Unknown</td>
<td style="background:#FFC">910</td>
<td style="background:#FFC">1915</td>
</tr>
</tbody></table>

<div class='caption'>Status of candidates on the 1<sup>st</sup> March (rows) versus status on the 7<sup>th</sup> of May (columns)</div>

<div class='caption'>Status of candidates over time versus final status</div>

You can see that it was a gradual improvement towards the nomination date, at which point the last few candidates for each constituency were rapidly finalised and then didn’t change. For a long time there were just a lot of unknowns, mostly candidates that we didn’t know existed but also a lot of candidates from 2010 we didn’t know were standing again or not.

Once nominations were finalised we changed the interface to hide the remaining unknown candidates, but you can consider those remaining to be “We didn’t know before, but they aren’t standing”, which explains the remaining "Unknown → Not standing".

### Merges

Of the 195 people who YourNextMP at some point claimed were not standing when in fact they ultimately did (“Not standing → Standing”), 144 of those cases were people whose records were merged with another at some point. Similarly, of the 62 people who at some point were marked as standing in the wrong constituency, 39 were merged at some point. Some of those statistics will be of the same candidate having had the error classes at different points in time.

Candidates switching constituency from 2010 to 2015 account for 96/144 of those merged candidates with the "Not standing → Standing" error. This indicates the main error model is that someone stood in constituency X in 2010, they were then marked as “Not standing”, and then they were added independently in constituency Y. This duplication is then noticed and the two records are merged.

In other cases, candidates were accidentally added twice in the same constituency by editors, and then one was marked as “not standing” rather than being merged properly.

### Withdrawn candidates

There were 248 people who YourNextMP at some point claimed were standing when in fact they ended up not ("Standing → Not standing"). Examining a sample of these indicates that these are mostly withdrawals or candidates being changed by the party. The top parties for this error class are shown in the table below. 

Top 10 parties for candidates who were thought to be standing but didn’t

| Party | # Standing → Not standing | # Actually stood |
|-------|---------------------------|------------------|
| UKIP | 51 | 617 |
| Class War | 28 | 7 |
| Liberal Democrats | 20 | 632|
| Independent | 18 | 171 |
| Green Party | 18 | 543 |
| Labour Party | 16 | 590 |
| Workers Revolutionary Party | 10 | 7 |
| Conservative Party | 10 | 632 |
| TUSC | 9 | 129 |
| Christian Peoples Alliance | 8 | 17 |

There’s not much to say here other than that, for parties of their size, Labour, Liberal Democrats, Green and Conservatives had low incidences of standing candidates no longer standing. On the other hand, UKIP did particularly poorly &mdash; perhaps indicating a more confusing message in the press over who was standing. Class War also stands out for having many more candidates drop out than actually stood.

Properties
Email address

Twitter account


Facebook profile

Facebook page

Wikipedia Page

## Conclusions

### The accuracy

The conclusion is that if you want _totally accurate_ data on who is and isn’t standing you’re really just going to have to wait until nominations come out and [some brave volunteers go through every PDF for you](https://democracyclub.org.uk/blog/2015/04/10/nomination-papers-are-out-yournextmpcom-case/).

If you just want whatever data is available, perhaps [so voters can ask them for their CVs](http://cv.democracyclub.org.uk/) or [so you can find what the press has said about them](https://www.electionmentions.com/), bearing in mind that some information simply doesn’t exist yet, YourNextMP won’t go far wrong. Ideally we’d compare our accuracy at a point in time to commercial databases, but since they’re not open, we can’t!

### Preventing errors

The analysis indicates that there should be a better way for editors to notice that a new or existing candidate is the same person as a previous one, preventing duplications and reducing the number of merges needed.

This isn't without risks &mdash; there are about 250 candidates in our 2010/2015 list with the same name as another candidate. Any new interface will need balance the risks of

- missing a merge
- merging two records which are actually dissimilar

In addition, we should revisit the semantics of “Not standing”. It seems, in retro-respect, that it’s difficult to make such a solid claim that someone isn’t standing for election, since they may pop up in another constituency! It seems safest to include those people in the same category as the rest of the population: "Unknown".

Candidates withdrawing is generally beyond our control. Errors of that nature fall into the category of information that was accurate at the time, but with the potential to change.

I hope that this post has provided some insight into the accuracy of YourNextMP for different tasks, and the different types of error that could arise in a crowdsourcing project like this!


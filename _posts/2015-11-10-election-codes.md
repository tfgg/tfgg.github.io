---
layout: post
title: Standard codes for UK elections
---

This is something that's been bumping around my head for a bit, and has come up quite a bit in chats around [Democracy Club](https://www.democracyclub.org.uk/) and [civic tech](https://www.mysociety.org/2014/09/08/civic-tech-has-won-the-name-game-but-what-does-it-mean/) generally. It's a very simple but, I'd say, necessary bit of infrastructure for UK elections online: <em>standardised codes for elections</em>.

## Why?

It's hard building websites like [YourNextMP](https://www.yournextmp.com) (crowdsourcing candidate info), or [MP CV](http://cv.democracyclub.org.uk/) (gathering CVs of candidates) to last for multiple elections. If you only target general elections in the UK you'll be waiting for five years to test your improvements! However, recently there's been more momentum to do so, as we've realised the benefits of being able to iterate over many elections, year-on-year. In 2016, [Democracy Club is planning on covering elections](https://democracyclub.org.uk/blog/2015/10/19/plans-for-2016/) of

- the Northern Irish Assembly
- the Welsh Assembly
- the Scottish Parliament
- Police and Crime Commissioners
- City Mayors

If our tools and sites are handling all these different elections, we need a unified way to refer to these different elections over all the different datasets and sites that are produced during an election. For example, a person's candidacies in the 2010 and 2015 general elections might be represented as

~~~python
{
    'candidacies': {
        'ge2010': {
            'party': 'Labour Party',
            'constituency': 'Oxford East',
        },
        'ge2015': {
            'party': 'Labour Party',
            'constituency': 'Oxford West'
        },
    },
}
~~~
<div class="caption">
    A hypothetical person's candidacies in 2010 and 2015<br/>
    <small style="font-style:italic;">(in reality there would be unique IDs for the party and constituency fields)</small>
</div>

Where the pair of election code ('ge2010') and the candidate-specific data (party, constituency) gives the full information about the candidacy. Similarly, election codes might be used in URIs, e.g. `http://www.yourcandidates.com/ge2015/oxford-east/` for all the candidates who ran in 2015 in Oxford East. 

In essence, I want to devise a standard way of making <em>nice, short codes that repesent elections</em>. Candidate-specific data, which might be different between elections but will usually consist of party and constituency, will fill in the remaining information about a candidacy.

You might be thinking, shouldn't this be some sort of official ISO proposal or something with committees? Yeah, probably, but the civic tech community is going to be actually using it and this post is intended to be the start of that conversation. As far as I know there's no existing standard. I'd love to hear of other examples of efforts at UK or international election codes, especially some official document I've completely missed!

Looking at the code for [elections in YourNextRepresentative](https://github.com/mysociety/yournextrepresentative/blob/master/elections/models.py) (née YourNextMP), mySociety has a large number of fields, the most important seeming to be

- the date of the election
- the name of the election
- the role being vied for
- the areas covered

Looking at the [Google Civic Information API](https://developers.google.com/civic-information/docs/v2/elections), they just have

- an integer id for the election
- the name of the election
- the date of the election

Have a go at filling in the form below with what your idea of a good election code would be. I've selected a few elections, including some tricky cases that have come up.

<iframe src="https://docs.google.com/forms/d/1SKgDNtcsaqQMb7GXMnT1XWUABRppMExLvD8kF2Zn8OI/viewform?embedded=true" width="80%" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>

Thanks! I'll be following up soon, hopefully incorporating some of the feedback to this post. <a href="mailto:timothy.green@gmail.com">Email me</a> or <a href="https://twitter.com/tfgg2">tweet at me</a> with comments.

Do you want to be involved in this sort of thing? Check out <a href="https://democracyclub.org.uk/">Democracy Club</a> and drop us an email to join Slack.


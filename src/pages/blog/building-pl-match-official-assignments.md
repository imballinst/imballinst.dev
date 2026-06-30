---
title: Building Premier League Match Official Assignments
description: In this post, I am sharing my experience building Premier League Match Official Assignments feature.
publishDate: 2026-05-09T02:47:14.718Z
image: /assets/blog/building-pl-match-official-assignments/building-pl-match-official-assignments.png
imageAlt: An image showing one of the screenshots of Premier League Match Official Assignments page.
imageCaption: An image showing one of the screenshots of Premier League Match Official Assignments page.
tags: software engineering, football
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello! In this post, I'm going to share my experience, or rather, my thoughtflow when building Premier League Match Official Assignments. Let's get going!

## Motivation

Like any other thing, when you want to do something, you must have _just_ enough motivation to do it. Otherwise, it's either you won't see it through, you won't be able to do it well, or you won't be able to create an "attachment" to it. It is regardless of whether you utilize LLM or not in the process.

In my case, my motivation was to know if a referee or a match official has a consistent bias against Arsenal. This is because in 2024/25 season, there were at least 4 horrendous calls that resulted in an Arsenal player getting red card, but the same rule was not applied to other teams when the same kind of foul happened, which are:

### Declan Rice vs. Brighton (home)

Arsenal started the second half leading 1-0, with Rice having one yellow card already (he got one in the first half). Knowing this, Brighton players tried really hard to get Rice a second yellow card... and they were successful. Joël Veltman was about to take a free kick, so he rolled the ball forward against Rice who was moving back to his position. Since the ball was still rolling, Rice accidentally, or maybe not accidentally, knocked the ball sideways (without power), all the while Veltman swung his leg to take the free kick.

Rice went down, rolling out in pain because who wouldn't be? Your leg just got kicked from behind with full power, by someone who wanted Rice to get a second yellow card for "delaying the game" by standing too close to the free kick spot. Guess what? Instead of Veltman who got a yellow (or even red) card for a serious foul play, it was Rice who Chris Kavanagh gave a second yellow card for delaying the game.

Arsenal finished the game 1-1.

Not too long after, Howard Webb said it was a correct call because "letter of the law". Across the seasons, similar second yellow cards were never given consistently (if ever, at all).

### Leandro Trossard vs. Man City (away)

Arsenal were leading 2-1 against Man City in Etihad Stadium. Just before half-time, Leandro Trossard got second yellow card for kicking the ball away from the Arsenal goal when Bernardo Silva was fouled. Martinelli was seen reaching out to the ball, presumably a valid counterattack. However, Michael Oliver had none of it. He gave a second yellow card to Trossard for "delaying the game", again.

Arsenal finished the game 2-2.

### William Saliba vs. Bournemouth (away)

Arsenal were on a stalemate against Bournemouth (0-0) during the first half. A wrong backpass from Trossard caused Saliba to instinctively pull down Evanilson in the halfway line. Rob Jones gave Saliba a red card for this, despite that in the following game, Tosin (Chelsea) committed a similar foul against Jota (Liverpool).

Arsenal lost the game 2-0, but I think the result would still be the same because the players were very underperforming that day.

### Myles Lewis-Skelly vs. Wolves (away)

Arsenal were also on a stalematea against Wolves (0-0). Wolves started a counterattack JUST outside of their penalty box. Lewis-Skelly clipped (or rather, grazed) Doherty's leg. Michael Oliver gave him a red card because he thought Lewis-Skelly was committing a serious foul play by tackling the Doherty's achilles. VAR didn't object with the deision. The cherry on top? Wolves fans sang, _"Same old Arsenal, always cheating"_ when in fact, it was Arsenal who were being cheated at by the officials.

Luckily, Arsenal won the game 0-1. The fun thing? Lewis-Skelly's red card was appealed and in the end, overturned.

## LLM use

You might ask, _"Did you use LLM to build this?"_ When building the initial versions, I only used it for debugging. Good ol' copy-paste to ChatGPT and Claude free versions. Later on, when migrating off Premier League data sources to FBref and Understat, I used OpenCode Zen's free models, which I think did quite effective to my surprise. I mean, there were still areas that I had to point out or manually update, but it surpassed my expectations. Also, it wasn't as wordy as Claude (which I dislike).

Why I did that, you might ask again? Because I wanted to grasp the idea first. If I had a strong grasp of the idea, I would be able to steer the direction better, whether it was me, or LLM who implemented the thing. It also gave me some sort of "ownership", which is probably scarce these days. Especially when people would just invoke "popular" skills or prompt _"make it good and make no mistakes"_ kind of thing without going into the specifics.

## Finding the data

Before building this page, I already sourced my data from the official Premier League website. Yes, that was wrong. I realized it after reading several references, including [the Premier League's Terms of Use page](https://www.premierleague.com/en/terms-and-conditions). Keep in mind that I **do not** encourage in any way to do the same here, especially since now you know.

> The Website and App must not be used in any other way, including for commercial purposes, and you may not otherwise reproduce, re-utilise or redistribute it (including, by way of example, creating a database (electronic or otherwise) that includes material downloaded or otherwise obtained from the Website or App) ...

Anyway, I'll share more about it in later sections. The data itself is just API calls to [PulseLive](https://www.pulselive.com/) endpoints. Every information is available, although I was only using matches data before (from a season, get the matches, then get the score).

However, now I need more data: who are the referees and the other match stats (offsides, fouls, penalties, number of yellow cards, number of red cards). Using all of these data, I can create a "derived" stats such as the following.

- Win rates per team, per referee
- Fouls per yellow card per team, per referee
- Fouls per red card per team, per referee

## Stitching the data

The stitching part was quite tough. Since I wanted the UX to be "free", which means users will be able to view the data in the way they want, e.g. filter by seasons or filter by roles, I had to compute the stat in an easy manner in the client-side. What's easier than creating a ready-to-compute dictionary record? This was the data structure that I came up with:

```
- Team dictionary
  - Team name
    - Referee name
      - Referee: [match ID]
      - VAR: [match ID]
```

Then, there is another dictionary that contains the stats:

```
- Match ID dictionary
  - Match ID
    - Number of fouls
    - Number of offsides
    - ...and so on
```

Using the above form, I was able to determine the number of times a team was officiated by a certain referee. I was also able to "associate" the match statistics with the match officials for a certain team.

## Presenting the data

Now that the data has been stitched, it's now time to package it for users... which is sometimes the hardest part! Present too little and users will get a lot of friction (from having to do many interactions). Present too many and users will be confused on where to look at.

![The initial state of the table.](/assets/blog/building-pl-match-official-assignments/plain.png)

The above is the initial looks of the table, where it shows the number of games a team was officiated by a referee. Very bland. The table only shows the number of games, no further explanations. Looking at the table alone won't cause a bulb to appear above our heads.

![To dive deeper, user needs to click the number of games, once per referee/team mapping.](/assets/blog/building-pl-match-official-assignments/plain.png)

If the user wants to see the win rate and fouls per referee per team, they have to click the number of games. This is very inconvenient. Imagine if you want to see the win rate or fouls per yellow/red cards, you'd have to click _that_ many cells.

![Add more info and colors.](/assets/blog/building-pl-match-official-assignments/richer.png)

This was the interesting part. I initially wanted to show every stat in the cell, but it looked very "busy". So, I opted for few "derived" stat instead, such as win rates/fouls per yellow card/fouls per red card. I think it provides a good "birds-eye view" which can help users to choose whether to dive deeper or not by clicking the number of games.

Additionally, the green background of cells were added to indicate which match official was most often assigned to a team. From the picture above, we can see that the most times someone refereed a team was 4-5 times. Those cells tend to have the darkest green in the row. It's easier to scan by color rather than by arbitrary number, at least for me.

Also, referee who never officiated a team will have its cell "blocked". Again, it's to make it easier to scan, so when we see a blocked cell, we can just skip pass it and look at other cells.

## User experience improvements

### Sticky headers

![The table headers are sticky when scrolling horizontally/vertically.](/assets/blog/building-pl-match-official-assignments/sticky-headers.png)

Since the table is big, when we scroll right or down enough, eventually the table headers (or the left-most cell) will be hidden and we won't be able to determine which cell is for which row/column. The fix is easy enough, for the table headers, we use `sticky top-0` whereas for the table's first column, we use `sticky left-0`.

### Controlling dialog states

In the first iterations, I utilized the approach of [shadcn/ui's Dialog component](https://ui.shadcn.com/docs/components/radix/dialog), which means every trigger is a sibling of the content, wrapped by a `<Dialog>` component.

```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

However, this approach isn't really optimal when the table can be as big as 400 cells. Each cell must "compute" the stats from every referee-team map and that caused a bit of performance downgrade when I updated the filters (it was like, around ~500ms freeze or something). So, I extracted those out of the cells and used a single controlled `<Dialog>` component to contain the referee-team stats modal.

There was a further issue. I noticed the "smoothness" of using a custom controlled triggers and states (by passing `open` and `onOpenChange` to `<Dialog>`) degraded heavily compared to using the "normal" approach above. Like, sometimes the dialog just appeared immediately (without transitions). Similar issues were reported in GitHub [[1](https://github.com/radix-ui/primitives/issues/2386), [2](https://github.com/radix-ui/primitives/issues/1634), [3](https://github.com/shadcn-ui/ui/discussions/8106)]. I ended up with a "hidden trigger" approach, something like:

```tsx
<Button
  className="flex gap-0.5 underline size-auto! p-0 text-xs"
  variant="link"
  size="sm"
  data-ga-label="ga-official-assignments-view-referee-detail-button"
  data-ga-value={`${name} - ${rowValue.name}`}
  onClick={() => {
    setSelectedCell([rowValue, name])
    openDialogBtnRef.current?.click()
  }}
>
  {seasons.map((season) => refereeData.perSeasonRecord[season]?.score ?? 0).join(' → ')} games
</Button>

<DialogTrigger asChild>
  <Button hidden ref={openDialogBtnRef} />
</DialogTrigger>
```

This way, I can programmatically still trigger the dialog triggers with proper animations.

### Virtualization

In the prior sections above, I mentioned that the table can be as big as 400 cells. Given that size and each cell might eat quite some space on the screen, it is certain that not all cells would need to be rendered all at once. By doing this, we prevent the "repainting" process of the browser, further reducing the render duration when the query parameters changed (because of seasons/roles filter changes).

After all the above improvements were implemented, what would took like ~500ms to render (something like a browser freeze) after we update seasons/roles, it would now take near an instant to do so because of the improvements above.

## Analytics

![Events fed to Google Analytics based on the clicks.](/assets/blog/building-pl-match-official-assignments/analytics.png)

If you noticed in my code snippets above, there are these attributes:

```
data-ga-label="ga-official-assignments-view-referee-detail-button"
data-ga-value={`${name} - ${rowValue.name}`}
```

These are HTML attributes that I used to trigger out data streams from Tag Manager to Google Analytics. I will explain more the setup in another post, perhaps. But it's nice seeing the numbers flow which I can access through the "Explore" menu in Google Analytics. As they say, _"It's not much, but it's honest work"_.

I will probably consider adding more trigger attributes to other pages so that I could measure the performance of those other pages all the same. This is one area that I am quite interested: how to convert information from Google Analytics into product decisions that would help drive better adoption.

## Migrating to Understat and FBref

Alright, last part! I wrote above that I originally didn't know about the Premier League's Terms of Use (which I should have checked in the first place, probably). So, I decided to change the data to Understat and FBref. This migration process is helped by OpenCode (first time trying OpenCode, by the way). It was okay, apart from some initial confusion about "how to turn off sounds", which I apparently mixed "System notifications" and "Sound effects" (I should've turned off the latter rather than the former, but anyway I turned them both off). The app sometimes also froze a bit, but it wasn't a big deal.

With me having a good grasp on how the feature should be, I know what the input and output should be. I asked OpenCode Zen's Big Pickle (the free model) to generate the migration scripts. I thought I would be able to do it all in TypeScript, but it would seem that the scraping ecosystem is more mature in Python. At the time of writing, I used [Soccerdata](https://github.com/probberechts/soccerdata) to scrape FBref with accordance to their scraping rules (no more than 10 requests per minute). The scripts worked well enough, as mentioned above I had to make some further adjustments but for a free model, the result was "above passing" in my book.

The scraping process took a bit while, but at the end, I managed to change the match results from Premier League data source to Understat; and the supporting data to use FBref. I am currently in the process of asking them whether I am allowed to use their data to create a "derived data", let's see what's their response in the future.

If they don't give me the permissino, I probably would just take down the supporting stats, which is very unfortunate, but it is what it is.

## Closing words

So, yeah. That should be all for this "development log". Hopefully this post is useful and catch you all in the next one!

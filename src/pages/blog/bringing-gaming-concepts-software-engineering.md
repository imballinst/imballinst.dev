---
title: Bringing Gaming Concepts to Software Engineering
description: Let's talk about how some concepts in gaming can be brought to software engineering.
publishDate: 2024-03-30T05:51:49.642Z
image: /assets/blog/bringing-gaming-concepts-software-engineering/bringing-gaming-concepts-software-engineering.png
imageAlt: An image containing the text, "Bringing Gaming Concepts to Software Engineering".
imageCaption: An image containing the text, "Bringing Gaming Concepts to Software Engineering".
tags: gaming, software engineering
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello there! Hope you are doing OK. Time flies kinda super fast these days. I feel like yesterday was just the beginning of 2024 and here we are at March's curtain closing. Anyway, in this post, I am going to write a bit about how gaming concepts could be brought to software engineering.

## What is an "encounter"?

As we know, there are a lot of games that involve a lot of encounters (or fights), such as those with genre Action and Role-Playing Game (RPG). Usually, the encounters consist of trash mobs (the minions of the antagonists) and bosses (the antagonists).

Each enemy _may_ have different strengths and weaknesses, for example, maybe some enemies are weak to physical attacks whereas some others are weak to magical attacks. Magical attacks may have different "aspects" (or "elements"), such as fire, water, wind, and lightning. Some enemies may be weak to one, absorb another, and resistant/normal to the rest.

As such, it's important to know what is your enemy's weakness so that you can beat the encounter as smoothly as possible.

## How first runs are always unoptimized

If you have ever seen people doing speed runs, you will notice that their movements and decision-making are very optimized. Things that casual players do within 10 seconds, they can do in maybe less than 5 seconds. Take this Stray speedrun, for example.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/U3DuojHih9Y?si=di1L7hyBUzI1pNV4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

There are a lot of types of speedruns, like maybe there are speedruns that accept glitches and those that aren't... which is fine. In the case above, the said streamer could finish Stray in a mind-boggling 47 minutes and 59 seconds! For context, when I did my Stray platinum trophy, I needed to finish the game in under 2 hours (which I think was 1 hour 50 minutes, or something). So, to be able to finish it in under 1 hour is impressive for me.

Don't ask me about the first run. I think it was around 8 hours or something. The thing is, as we repeat the playthrough, we get more convenient with the game so that we can learn about which parts we can optimize and which parts we can't.

## Logging and parsing

In the context of Massive(ly) Multiplayer Online Role-Playing Game (MMORPG), we have this term called "log parsing". It works by reading the game's combat log and transforming it into metrics. Some common metrics include:

- Damage Per Second (DPS): how much damage are you doing per second during the encounter.
- Damage Done: how much damage you do over the encounter.
- Healing Per Second (DPS): how much healing are you doing per second during the encounter.
- Healing Done: how much healing that you do over the encounter.
- Overheal: how much heal that "overflow" (go above 100% of the character's HP) that you do over the encounter.

Usually, "raiders" (people who do endgame encounters) are more obsessed with the DPS metric, because, you know, it's some kind of achievement itself being shown on the top DPS leaderboard. It's pretty similar to speedruns where people compete for the highest spot at the table.

However, the same rules in speedruns apply here, too. The first runs of an encounter _usually_ are unoptimized. During the first runs, people will be focusing on "how to beat the encounter", because they do not know the full mechanics of the boss. How many phases do they have? What are the mechanics?

:::
If we don't know the whole process, we won't be able to determine the parts that we can optimize.
:::

There is also another term, usually called "greed". Let's take the example of taking a train. Your train departs at 13:30 and at the moment it's 10:00. The travel time between your home and the train station is around 30 minutes. At the moment, you are busy doing work. You can bring your laptop to the train station and continue the work there, but the surroundings aren't as optimal compared to your home. So, we will be torn between 2 choices. Guarantee our train ride while sacrificing our productivity, or risk our train ride while maintaining our productivity?

That is the analogy for "greed" in gaming. It's all about risk management. When your character's HP is low, do you want to heal yourself, or can you somehow optimize not getting hit by the enemy's actions so you can do more DPS?

## Similarity with software engineering

How does that correlate with software engineering? I believe you have ever heard of "first do it, then do it right, then do it better". Sounds similar to the game encounter approach?

When we first create software, we create the thing first. End users do not care about how our codebase looks like. Sure, it may impact our productivity down the road, but if we focus too much on "clean code", we may lose sight of what actually matters: delivering the product. If we do not know the bigger picture of our codebase, we will not know how to optimize it. We may end up reducing our productivity.

There are some nuances to that, of course. Maybe in some cases, we can just write spaghetti code at first, maybe in other cases we can write semi-optimized code at first, but we _definitely_ do not want to write overly-optimized code at first... especially if the requirements are quickly changing. We can maybe "greed" the refactoring process.

In frontend cases, for example, we often split a big component into smaller components in separate files. One might argue that a file with too many lines is hard to scan. That might be true, but the solution isn't always separating it into another file. Navigation should also be taken into consideration. You have a page, then the page is broken down into components, and each of the components is broken down into further broken down components until you arrive at the leaf component, the part which you want to update. Then, you are left with a lot of tabs open in your IDE because of your traces in looking for the file that you want to update.

As such, I usually think of different alternatives before refactoring a component.

- If a component is referred by other components (more than once), then most likely we want to split it.
- If a component is referred to by other components only once, then it may depend on how logic-heavy is the component.
  - If the logic is heavy, then it may be better to split it into a separate file.
  - If not, then perhaps it's better to split the component, but still localize it in the same file.

What does localize mean? It means we split the component, but we don't export it. Take this example:

```tsx
// Exported login page component, which will be used in the App.
export function LoginPage() {
  return (
    <div>
      {/* Login form */}

      <hr />

      <SSOLogin />
    </div>
  );
}

// Components used in the login page ONLY.
// No reason to split this into a separate file, unless this <SSOLogin /> component contains vast heavy logic.
// But, if it only renders JSX, maybe we don't need to separate it into a different file.
function SSOLogin() {
  // ...
}
```

With the above approach, we achieve at least 4 things:

1. We split the component so that the JSX in `<LoginPage />` component is easier to contextualize.
2. We reduce the number of possible import suggestions. Remember, we can have import suggestions in our IDE. What happens if we have too many exports? How will we choose the component that we want to import if there are many components, especially those with similar names?
3. We reduce the number of files in our codebase. Again, we can search by file name in our IDE, so the fewer files that we have, the easier it is to find the file that we want to search.
4. We reduce the number of traversals when we are navigating. Instead of having to navigate 4 files to find the part that we want to update, we can just maybe navigate only 2 files.

All the above is to say, that there is a ["diminishing returns"](https://dictionary.cambridge.org/dictionary/english/diminishing-returns) when it comes to refactoring. So... optimize responsibly.

## Closing words

I think that's all that I can share in this post. Hopefully, it is useful, thanks for reading this far, and take care!

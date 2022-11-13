---
title: minmax
description: minmax is a small app to calculate the required expense to get the maximum discount.
publishDate: 2020-05-10T08:46:00.000Z
githubLink: https://github.com/imballinst/minmax
layout: '../../layouts/Project.astro'
---

In Indonesia, sometimes there are "coupons" for promotions that have maximum amount of discounts. Because I am lazy, I built this `minmax` tool ([link to the app](https://minmax.imballinst.dev/)) that will help me calculate the expense "steps", along with their respecting discounts and total expense (after discount). For example, take this data:

- **Minimum expense**: 40.000
- **Discount percentage**: 35%
- **Maximum discount value**: 25000

Let's try inputting the above data to this calculator. It will output something like this table below.

| Harga Awal (Rp) | Diskon (Rp) | Harga Akhir (Rp) |
| --------------- | ----------- | ---------------- |
| 40.000          | 14.000      | 26.000           |
| 50.000          | 17.500      | 32.500           |
| 60.000          | 21.000      | 39.000           |
| 70.000          | 24.500      | 45.500           |
| 71.428          | 24.999      | 46.429           |

There, you will know the expense "steps" (in this case, each step is 10k more expensive than the previous step), along with their discounts and total expense.

There are also "coupons" that can't yield optimal discounts. With this data, for example:

- **Minimum expense**: 40.000
- **Discount percentage**: 80%
- **Maximum discount value**: 10000

If we spend 40k, then the maximum discount we could get is only 10k. It is not efficient for us, because it can't scale. At this rate, spending 40k is the best option because it saves our money by 25 percent. However, of course, like little birdy said, we save 100% for spendings that we don't spend.

---
title: "Adding a Sorting Feature to Your Blog with Astro: A Complete Guide to Organizing Posts by Date"
date: "2024-12-19"
description: "Adding a sorting feature to the blog so posts are listed in date order"
category: "Blogging"
tags: ["astro", "blogging", "blog", "sorting", "sort"]
---

# Adding a Sorting Feature to the Blog to Sort Posts by Date
## The Approach
1. Walk through all the md files in the posts directory and grab each file's creation time and filename.
2. Sort by creation time to get the ordered blog list.

### The Implementation
Sort the fetched allPosts by date.   
</br>
```js
const allPosts = await getCollection("blog");
allPosts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
```  
</br>
One line of code is all it takes to implement sorting.

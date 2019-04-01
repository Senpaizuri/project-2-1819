# Volkswagen [Project 2]

From zero 🚘 to (accesible) hero 🏎

Assignment:
Help ValTech_ 👨‍💻 with the Volkswagen 🚘 website.
They haven't done anything with performance nor accesibility and needs Us to improve the site.

## Breakdown

[`AXE ♿️`](https://www.deque.com/axe/) reveals some issues.

![screenshot axe issues](/screenshots/axe-before.png)

It reveals at least 70 cases of contrast issues on the homepage alone.
Detail pages have the exact same problem, however it al seems to boil down to the same few colors.

1. `#00b1eb` in combination with `#f1f4f5` || `#fff` ([2.23](https://webaim.org/resources/contrastchecker/?fcolor=00b1eb&bcolor=f1f4f5),[1.59](https://webaim.org/resources/contrastchecker/?fcolor=00b1eb&bcolor=fff) respectively) used for most links, buttons and highlights
2. `#ccc` on `#dae2e5` ([4.41](https://webaim.org/resources/contrastchecker/?fcolor=ccc&bcolor=dae2e5)) used in the footer

This issue could be resolved fairly easy with just bumping up the contrast on the blue `#00b1eb` to something like `#005470` ([7.59](https://webaim.org/resources/contrastchecker/?fcolor=00b1eb&bcolor=f1f4f5))

![Old contrast volkswagen website](/screenshots/contrast/old.png)

to

![New contrast volkswagen website](/screenshots/contrast/new.png)

This boosts the contrast ratio significantly.
Namely from a measily 2.23 to a whopping 7.59 👀.
Usually only a contrast ratio of 4.5 is needed, but for smaller/thinner text it is recommended to have a greater contrast.

Let's persume the end user is outside, it's a lovely sunny day ☀️ really, and decides to visit the site to look for a car to cruise away in the upcoming summer. Then this is what the site may look like.

![screenshot of homepage with simulated sunny weather](/screenshots/contrast/sunny.png)

With the "new" color it would look something like this.

![screenshot of homepage with simulated sunny weather](/screenshots/contrast/sunny-new.png)


Thus I recommend to change the main blue color to something that creates more contrast.
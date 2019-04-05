# Volkswagen [Project 2]

From zero 🚘 to (accesible) hero 🏎

Assignment:
Help [`ValTech_ 👨‍💻`](https://www.valtech.com/) with the [`Volkswagen 🚘`](https://www.wolkswagen.nl) website.
They haven't done anything with performance nor accesibility and needs Us to improve the site.

[Current site 🚘](https://www.volkswagen.nl) <br>
[Improved site 🏎 [WIP]](https://senpaizuri.github.io/project-2-1819/)

# Breakdown 🔨

[`AXE ♿️`](https://www.deque.com/axe/) reveals some accesibility issues.

1. Contrast
2. Labeling

[`Lighthouse 🕯`](https://developers.google.com/web/tools/lighthouse/) reveals some performance issues with the site.

1. Uncompressed images
2. Image formats
3. Renderblocking CSS
4. Cache fonts
5. Preconnected resources

# Accesibility Issues ️️♿️

## Contrast Issues 🚫

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

## Labeling issue 🏷

[`AXE ♿️`](https://www.deque.com/axe/) also reveals an issue with the license plate form.

![Screenshot of license plate](/screenshots/license-issue.png)

This issue could be resolved with minimum effort and will improve not only it's PE but also it's usablility.

```html
<!-- Current code -->
<input type="text" name="licensePlate" placeholder="Vul hier je kenteken in" maxlength="8">

<!-- Suggested Code -->
<label for="licensePlate">
    <span>Vul hier je kenteken in:</span>
    <input id="licensePlate" type="text" name="licensePlate" placeholder="abc123fg" maxlength="8">
</label>
```

This doens't only improve the PE but also allows screenreaders to read the previous placeholder text to the user.
Also, say you've already filled in 1 character the placeholder disappears. Using a label here just makes sense.
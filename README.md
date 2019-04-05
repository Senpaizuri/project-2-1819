# Volkswagen [Project 2]

From zero 🚘 to (accesible/performance) hero 🏎

Assignment:
Help [`ValTech_ 👨‍💻`](https://www.valtech.com/) with the [`Volkswagen 🚘`](https://www.wolkswagen.nl) website.
They haven't done anything with performance nor accesibility and needs Us to improve the site.

[Current site 🚘](https://www.volkswagen.nl) <br>
[Improved site 🏎 [WIP]](https://senpaizuri.github.io/project-2-1819/)

# Top 5 Improvements

1. Contrast
2. Critical CSS
3. Compressed/Next-gen images
4. Service Workers for serving from cache
5. Compress statische assets

Point 1,2 and 3 are fairly low effort points with a high reward.

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

# Performance Issues 🕯

## Uncompressed Images & Format 🖼

On the current site `src-set` is being used to accomodate for different sizes and formats which is a good thing. However the images themself are served in a `.ashx` format in the source. With js this is translated to a request to fetch the correct image from the server (if I'm not mistaken).

This means that if for whatever reason JS is blocked no images are shown. at all.
![No js screenshot](/screenshots/nojs.png)
Not only this, but `src-set` is not supported in most older browsers.
![canisuse for src-set](/screenshots/srcset.png)

I recommend still serving the `src-set`, however do supply a fallback and remove it with JS if necessary.
Secondly, try to serve the `.webp` format to next-gen browsers with a fallback to regular compressed `.png` & `.jpg`'s.
`.webp` support isn't that great yet, but very powerfull.
![](/screenshots/webp.png)
And last, try to precompress al the images you are serving.
I went from this:
![](/screenshots/old-image.png)
to:
![](/screenshots/opt-image.png)
Saving about **4MB** in the process and having major time savings because it isn't served via `fetch` in js.

## Renderblocking CSS 🚨

CSS is renderblocking, This means that no content is shown until the CSS is fully loaded and parsed along with the HTML.
If the CSS is pretty huge the percieved perfomance gets higher.
To "enhance" the precieved performance we can "fake" the css file by using Critical CSS 🚨.

Critical CSS 🚨 is a small snippet of css that only contains css for the content that is shown above the fold, this is then put in the html/template. Now the webpage can be rendered earlier while the full file loads in the background and renders the rest when it's available.

I used [this tool](https://jonassebastianohlsson.com/criticalpathcssgenerator/) for generating the css.

This pushed the first paint from *2s* to *1.1s*
On slower connections this difference only gets bigger.

## Caching Fonts 🔡

Fonts were a big problem on this site. Mainly on slower connections.
The fonts were custom, no big deal. However the `@font-face` had no `font-display:swap;` attribute. This means the content is only rendered if the font is loaded or fails loading. Which results in a much longer waiting time to actually show the meaningful content.

If you use `font-display:swapt;` in your `@font-face` declaration the font will always show the fallback fonts first and replace it with the new font when it's loaded.

I'll touch on caching later.

## Preconnecting resources 📚

Some recoures that are needed are loaded in one after another.
However, you can also loadin some files at the same time with
```html
    <link rel="preload" href="/css/dist/styles.min.css" as="style">
    <link rel="preload" href="/css/addon.css" as="style">

    <link rel="preconnect" href="https://www.volkswagen.nl"/>
```

The `preload` ensures that the files are loaded in simultaniously.

If you need resources from a different server `preconnect` is recommended.
This literally preconnects the page to your requests to the defined `href`.
When you request a resource from this server it "skips" the handshake since it is already done.

# Service workers

Service workers are great, they can enable the use a cache in modern browsers enabling to serve you your website faster than before.
Another benefit from utilizing Service workers is that you can still serve the pages to your users when they are offline.

To register a service worken you can use this code:
```javascript
if("serviceWorker" in navigator){
    console.log("SW registering")
    window.addEventListener("load",()=>{
        navigator.serviceWorker.register("/service-worker.js")
        .then((regis)=>{
            return regis.update()
        })
    })
}
```

Serving the page without the cache renders the page in about **3-4s**
With the cache it's able to fully load the page in **0.3s**!

![SW](/screenshots/sw.png)
![SW](/screenshots/swf.png)

# Final build

![](/screenshots/swfull.png)

The final build gives us these results on a fast 3g network.

| |Final|Original|
|--|--|--|
|FCP|1.6s|1.7s|
|FCP(Cache)|0.3s|-|
|FMP|2.8s|4.8s|
|FMP(Cache)|0.5s|-|



# Wishlist
- [ ] HTTP2
- [ ] Dynamic Caching with SW for frequently used pages
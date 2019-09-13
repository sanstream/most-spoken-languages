<template>
  <section data-component="intro">
    <header>
      <h1>The most spoken languages arround the world</h1>
    </header>

    <p>
      When we are raised by our family we naturally learn the language they speak.
      This helps us to communicate. Share ideas and learn from them.
      Most of the time just this is just one, but it can be two.
      Throughout life, depending where you were born, you might even learn one or more extra languages.
    </p>

    <p>
      The last decades the network of people that human being know (due to globalisation) has shifted from
      knowing just the people in your local area to people all across the world.
      In order to effectively communicate with other people from across the world it is useful to speak
      a shared language.
    </p>

    <p>But which are those languages and how do you decide which language is worth learning?</p>

    <p>
      In order to get an insight into this I scowered the internet for articles about this subject,
      but all I found was were a few click-bait articles ultimately explaining what were the most common
      <strong>native</strong> spoken languages, but this is only half the story.
      Since losts of people speak more than one language.
      So I went deeper as discovered that the UN and the CIA did
      language censusses about this subject.
      What I found that the answer to this question is not an simple one, but a complicated.
      For instance, it might seem obvious for a non-amerikan, when moving to the USA to learn English.
      And this does make sense, but while 250 miljon amerikans speak English, also 21 miljon speak Spanish.
      On top of that, for some country no proper census data is even available, but for the most it is.
      In the end it boils down to who do want to talk to and where do they come from.
    </p>

    <p>
      To make it easier to find an answer to this question I needed to make the census data more accessible.
      I did this by making it easy to explore.
      so go on and explore for yourself and see what languages are spoken mostly everywhere on earth.
    </p>

    <router-link
      to="/overview">
      Load the overview
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'Intro',
}
</script>

<style lang="scss">
@import '../../definitions';

[data-component="intro"] {
  max-width: $maxWidthText;
  margin: 0 auto;
}
</style>

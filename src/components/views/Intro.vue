<template>
  <section data-component="intro">
    <article
      class="intro--article"
    >
      <p>
        When we are young we first learn the language from the people arround us.
        This helps us to communicate, share ideas and learn from them. <br>
        Most of the time just this is just one, but it can be <strong>more than one</strong>.
      </p>

      <p>
        The last decades the network of people that human being know (due to globalisation) has shifted from
        knowing just the people in your local area to people all across the world.
        In order to effectively communicate with other people from across the world it is useful to speak
        a shared language.
      </p>

      <h2>Which languages are worth learning?</h2>
      <p>
        I love the concept of languages, and reading and learning about them.
        So in order to get an insight into this I looked for articles about this subject,
        but all I found was were a few click-baity articles ultimately explaining what were the most common
        <strong>native</strong> spoken languages, but this is only half the story.</p>
      since <strong>lots of people speak more than one language</strong>.

      <h2>Finding data</h2>

      <p>
        So I went deeper and discovered the world of language census data.
        What I found was that the answer to this question is not simple, but a complicated.
        For instance, it might seem obvious for a non-american, when moving to the USA to learn English.
        And this does make sense, but while 250 million amerikans speak English and 21 million speak Spanish.
        On top of that, for some country no proper census data is even available, but for the most it is.
      </p>
      <p>
        The census data provided by the <a href="http://data.un.org/Data.aspx?d=POP&f=tableCode:27">UN</a> is supprisingly detailed, while the
        <a href="https://www.cia.gov/library/publications/resources/the-world-factbook/fields/402.html">CIA</a> ranges from detailed to rough estimates.
        There is also wikipedia of course, but the ammount of work needed to extract data from there is just ridiculous.
        In the end it boils down to who do want to talk to and where do they come from.
      </p>

      <p>
        To make it easier to find an answer to this question I needed to make the census data more accessible.
        I did this by making it easy to explore.
        so go on and explore for yourself and see what languages are spoken mostly everywhere on earth.
      </p>
    </article>

    <router-link
      class="intro--load-overview"
      to="/overview">
      Show the results<br>&#8964;
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
  // padding-bottom: 4rem;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;

  .intro--article {
    overflow: auto;
    flex: 1 1;
    margin: 0 0 1rem 0;
    line-height: 1.5rem;

    > h2 {
      margin-top: 2rem;
    }
  }

  .intro--load-overview {
    display: block;
    color: $colour-red;
    width: 100%;
    text-align: center;
    text-decoration: none;
    font-size: 1.5rem;
    flex: 0 0;
  }
}
</style>

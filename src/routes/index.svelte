<script context="module">
  export const prerender = true;
</script>

<script>
import Piano from "$lib/Piano.svelte";

</script>

<svelte:head>
  <title>Piano</title>
  <meta name="description" content="Webapp for learning piano." />
</svelte:head>

<section>
<!-- Menu/Controls -->

</section>

<section class="flex flex-col items-center">
<!-- Piano -->
<Piano />
</section>

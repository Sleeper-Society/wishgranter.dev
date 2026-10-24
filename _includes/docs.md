---
layout: header.html
navigationOptions:
    listElement: "menu"
---

<style>{% include "menu.css"%}</style>
<style>{% include "docs.css"%}</style>

<nav class="docs-menu">
{{ collections.all | eleventyNavigation | eleventyNavigationToHtml: navigationOptions}}
</nav>
{{ content }}

---
layout: header.html
---

# Wishgranter

{% assign randomAdj = insults.adj | getRandom %}
{% assign randomNoun = insults.noun | getRandom %}

<script>
fetch("/_data/insults.json")
.then((response) => response.json())
.then(
    (insults) => {
        console.log(insults)
        document.getElementById("random-adj").textContent = insults.adj[Math.floor(Math.random() * insults.adj.length)]
        document.getElementById("random-noun").textContent = insults.noun[Math.floor(Math.random() * insults.noun.length)]
        })
</script>
<style>
#random-adj, #random-noun{
    color: #f03c79
}
img{
    width: 32px;
}
</style>

A modloader for Sleeper Games Hyperspace Deck Command, for that <span id="random-adj">{{ randomAdj }}</span> <span id="random-noun">{{ randomNoun }}</span> in your life

## Download

[![Windows](https://www.microsoft.com/favicon.ico?v2)](https://github.com/Sleeper-Society/HDC-Wishgranter/releases/latest/download/wishgranter-win32-x64.zip)
[![Linux](https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/linux/default.svg)](https://github.com/Sleeper-Society/HDC-Wishgranter/releases/latest/download/wishgranter-linux-x64.zip)

## Get Hyperspace Deck Command

[![Steam](https://store.steampowered.com/favicon.ico)](https://store.steampowered.com/app/2711190/Hyperspace_Deck_Command/)
[![Itch](https://itch.io/favicon.ico)](https://sleeper-games.itch.io/hyperspace-deck-command)

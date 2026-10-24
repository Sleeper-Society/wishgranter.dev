---
eleventyNavigation:
    key: Card Animations
    parent: Jsons
---

# card_animations.json

## Examples

### Simple Example

```json
{
    "my_card": {
        "sprites": ["example_sprite.png", "example_sprite1.png"],
        "points": {
            "origin": { "x": 0, "y": 0 },
            "center": { "x": 32, "y": 32 }
        },
        "collsion_polygon": [
            { "x": 16, "y": 16 },
            { "x": 24, "y": 16 },
            { "x": 24, "y": 24 },
            { "x": 16, "y": 24 }
        ]
    }
}
```

### Complex Example

```json
{
    "my_card": {
        "sprites": ["example_sprite.png", "example_sprite1.png"],
        "points": {
            "origin": { "x": 0, "y": 0 },
            "center": { "x": 0, "y": 0 }
        },
        "collsion_polygon": [
            { "x": 16, "y": 16 },
            { "x": 24, "y": 16 },
            { "x": 24, "y": 24 },
            { "x": 16, "y": 24 }
        ]
    }
}
```

## Elements

### `sprites`

Array of local paths to sprites. Expected to be about 4 of the same image run through the [same process as the developer](/docs/Developer-Q-&-A#creating-sprites)

### `points`

### `collison_polygon`

### `frame_order`

## Future Plans

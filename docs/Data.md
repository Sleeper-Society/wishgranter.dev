---
eleventyNavigation:
    key: Data
---

# Data.json

`data.js` is a base game file that is essentially a json. As such, Wishgranter allows to to modify it as a json.
`data.json` controls:

- Card animations, which are more easily modified via [`card_animations.json`](/docs/Jsons/Wishgranter-Added/Card-Animations)

Very large and difficult to work with, I recommend the following tools:

- [Convert Javascript to JSON](https://www.convertsimple.com/convert-javascript-to-json/) (for use with the viewer below)
- [JSON Tree Viewer](https://jsonlint.com/json-tree) Makes looking at file structure MUCH easier

Data.js holds all game data, including variables, assets, and properties, though most of them are initialized properly in code0 and do not use their written values. Still necessary for defining animations. The important parts are resources, which contains file paths to every asset in game, and layouts, which contains game objects and groups.

Groups contain objects[] listing objects by name. Objects contain a name, type, variables[], effects[], and animations[]. Usually only objects and animations are important for mod additions.

## Layouts Categories

### objectsgroups

- group_hitflash

- group_ghost_source
- group_auto_remove
- group_parallax
- group_card_attach
- group_card_sprites
- group_flare_source
- group_card_cleanup
- group_tooltip_ui
- group_tooltip
- group_cam_tracking
- group_button
- group_orbit_move
- group_interactable
- group_map_component
- group_encounter_cleanup
- group_damp_move
- group_comms
- group_glitch
- group_card_anim
- group_ability_anim
- group_unit_anim
- group_items
- group_particles
- group_stealth_affected
- group_ui_magnetize

### objects

- obj_card

- obj_status_icon
- txt_status_icon
- obj_card_attach
- obj_card_por_back
- obj_unit_attachment
- ui_attack_tell
- obj_asteroid_scenery
- obj_system
- obj_star_layer
- obj_interactable
- obj_orbit_move_helper
- ui_orbit_line
- ui_orbit_effect
- ui_map_node
- ui_map_icon
- txt_float
- vfx_flare_short
- vfx_flare_continuous
- vfx_flare_ghost
- ui_camera_target
- ui_mouse_cursor
- ui_mouse_collider
- ui_element_main
- txt_ui
- obj_attack_helper
- obj_delayed_effect
- obj_shot
- vfx_pooled
- ui_death_mark
- ui_card_targeting
- obj_shield
- obj_mine
- obj_tiled_background
- vfx_pp_overlay
- ui_box_tooltip
- txt_tooltip
- txt_pause_main
- txt_pause_shadow
- ui_cam_overlay
- txt_tut
- obj_debris_parallax
- obj_helper_universal
- vfx_screen_glitch
- txt_card
- obj_upgrade
- txt_tooltip_bb
- obj_location_anim
- ui_title_icon
- txt_ui_bb
- obj_pickup
- ui_comms_box
- ui_comms_attach
- txt_comms
- ui_por
- obj_squadron_helper
- obj_small_craft_pl
- obj_small_craft_hos
- obj_bot_craft
- obj_countermeasures
- ui_unit_attach
- obj_ab_lt
- obj_ab_con
- obj_ab_flo
- obj_ab_et
- obj_ab_universal
- obj_ab_tu
- obj_unit_hos
- obj_unit_lt
- obj_unit_tu
- obj_unit_flo
- obj_unit_con
- obj_unit_et
- obj_unit_universal
- obj_fleet_upgrade
- ui_unlock_icon
- part_mis_trail
- part_shot_impact
- part_mis_smoke_glow
- part_mis_smoke
- obj_sim_background
- mask_jump_checkers
- txt_up
- txt_data_cloud
- ui_data_cloud_marker
- obj_background_nebula
- txt_credits
- ui_shuffle_visualizer
- ui_unit_orbit_target

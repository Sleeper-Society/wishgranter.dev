---
eleventyNavigation:
    key: Cards
---

# Cards.json

Simple json table defining fundamental stats and keywords. New entries here will be functional but not appear in game unless forced, or use correct sprites without corresponding entries in data.js.

## Parameters

_NOTE: most of these are not required! only include when relevant!_

|   Parameter    |                                                    Entry                                                    |                                                                        Result                                                                         |
| :------------: | :---------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
|      data      |                                                "0" or string                                                |                         "0" gives no data entry in datacloud, otherwise any string here will appear with "View Data" button.                          |
|      type      |                                                   1 or 2                                                    |                                          unknown, probably determines tech cards (2) or deployable units (1)                                          |
|      dmg       |                                                  0 or more                                                  |                                                    base damage. -1 for no damage component at all                                                     |
|       hp       |                                                  0 or more                                                  |                                                             base hull. constructs have 0                                                              |
|      size      |                                         0 or more, max of 3 is best                                         |                                           unit's orbit size. can be anything, but never more than 3 in game                                           |
|     timer      |                                                  0 or more                                                  |                                                          base timer. 0 for no timer at all.                                                           |
|    boss_up     |                                                  dongle id                                                  |                                              upgrade given by Reward Program coordinate, only for bosses                                              |
|    attacks     |                                                  1 or more                                                  |                                                             more than 1 means multistrike                                                             |
|  effect_count  |                                                  0 or more                                                  |                                                            amount of effects to read next                                                             |
|    effect_X    |                                     type, variant, status, and/or power                                     | X is 1,2,etc. up to effect_count, one entry per effect. see [Internal IDs](https://github.com/Hederarch/HDC-Modloader/wiki/Internal-IDs) for effects. |
|      name      |                                                   string                                                    |                                                 plaintext name the player sees. useful for searching.                                                 |
|     comms      |                                                  comms id                                                   |                                    specified comms dialog set, seems to concatenate with conditions in comms.json                                     |
|    faction     |                                      "heg" "lt" "tu" "con" "flo" "et"                                       |                                                         use unknown, possibly for loot pools?                                                         |
|    por_obj     | "obj_unit_hos" "obj_unit_lt" "obj_unit_tu" "obj_unit_con" "obj_unit_flo" "obj_unit_et" "obj_unit_universal" |                 use unknown, seems to determine default sprite if no sprite is in data.js. factional, heg is GP, universal is mercs.                  |
|    dc_cond     |                                             unlock condition id                                             |                                                              datacloud unlock condition                                                               |
|   por_angle    |                             rotation applied in card view, clockwise in degrees                             |
|   por_scale    |                                                decimal float                                                |                                           scalar multiplier to card view, mostly for shrinking big sprites                                            |
|   deck_group   |                                                   0 to 3                                                    |             special ordering in deck view, Megaship is 0, auxes are 1, flagships are 2, constructs are 3. Some starting cards are also 3.             |
|    por_back    |                                               cp\_ something                                                |                                                  filename of `card_por_` asset abbreviated as `cp_`                                                   |
|    jump_fx     |                                                   1 to 4                                                    |                                                    jump effect, unknown which corresponds to which                                                    |
|   gun_mounts   |                                                  0 or more                                                  |                   amount of turreted guns, up to its sprite's number of mounting points (see data.js). No more than 4 in base game                    |
| death_fx_power |                                                   1 to 5                                                    |                                                    explosion strength on death. only N-Mine uses 5                                                    |
|  death_total   |                                                      1                                                      |                                                     ??? what the fuck is this? only on constructs                                                     |
| death_time_max |                                                  0.1 to 6                                                   |                          not really known, presumably how long death animation lasts, Megaships are all 6, plus some extras                           |

/\*\*

- Definition of all Cards that appear in game
  \*/
  export type Cards = Record<string, Card>;
  /\*\*
- Card text or other custom behaviour.
-
- @remarks
- For more information: <https://wishgranter.dev/mod-docs/card-effects/>
  \*/
  export interface CardEffect {
  effect*type: number;
  effect_status?: number;
  effect_variant?: number;
  effect_power?: number;
  effect_anim?: string;
  effect_force_anim?: number;
  effect_cmd_id?: string;
  effect_cmd_comms?: string;
  effect_cmd_tier?: number;
  effect_cmd_ability?: number;
  effect_card_id?: string;
  effect_card_convert?: string;
  effect_card_list?: string;
  effect_card_text?: string;
  effect_up_list?: string;
  effect_status_target?: number;
  }
  export interface Card extends Record<`effect*${number}`, CardEffect> {
  /\*\*
    - Name as it appears in game
      \*/
      name: string;
      /\*\*
    - Flavor text as it appears in the data cloud or on right click. "0" for none.
      \*/
      data: string;
      dmg: number;
      faction: string;
      por*obj: `obj*${"unit" | "ab"}_${string}`;
      /\*\*
    - Background to render sprite on when card is in hand or deck
      \*/
      por*back: `cp*${string}`;
  por_angle?: number;
  por_scale?: number;
  por_repos_rate?: number;
  por_repos_range?: number;
  attacks?: number;
  /\*\* - If more effects are defined then specified, those effects will not be used. Good for comments.
  \*/
  effect_count?: number;
  /\*\* - Unlock Condition
  \*/
  dc_cond?: string;
  delayed_effect_time?: number;
  target_update_delay?: number;
  }
  export interface PlayerCard extends Card {
  /\*\* - Id of text list to pull from when this card appears in shops / escalation mechanism
  _/
  store*loc: string;
  /\*\*Priority of card when in deck view. Lower numbers appear first */
  deck*group?: number;
  }
  export interface Unit extends Card {
  /\*\* - How the game knows this card can be placed on the board
  \*/
  type: 1;
  /\*\* - Base hull
  \*/
  hp: number;
  /\*\* - How much of an orbit this unit takes up
  \*/
  size: 1 | 2 | 3;
  timer: number;
  por*obj: `obj_unit*${string}`;
  srm*drop?: number;
  jump_fx?: 1 | 2 | 3 | 4;
  gun_mounts?: number;
  death_fx_power?: 1 | 2 | 3 | 4 | 5;
  death_total?: 1;
  death_time_max?: number;
  /\*\* - prefix to add to events to get the ids of entries in Comms
  \*/
  comms?: string;
  }
  export interface EnemeyUnit extends Unit {
  por_obj: `obj_unit_hos`;
  /\*\* - If unit is a boss, this dongle will be applied to
  \*/
  boss_up?: string;
  /\*\* - Name as it appears in endless mode
  \*/
  name_gp?: string;
  /\*\* - Id of dongle to apply in endless mode
  \*/
  up*gp?: string;
  }
  export interface PlayerUnit extends PlayerCard, Unit {}
  export interface Ability extends PlayerCard {
  type: 2;
  por*obj: `obj_ab*${string}`;
ab_target: number;
ab_type?: number;
ab_attach_mount_type?: number;
ab_attach_anim?: string;
ab_comms_hos?: `ab*${string}\_hos`;
  ab_comms_ally?: `ab\*${string}\_ally`;
ab_comms_pl?: `ab\*${string}\_pl`;
  speaker?: string;
  }

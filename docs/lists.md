---
eleventyNavigation:
    key: Lists
---

# Lists of Things

export type Comms = Record<string, Record<`text_${number}`, string[]> | string>;
export type Encounters = Record<`enc_${string}_${string}`, Encounter>;
export interface Encounter extends Record<`wave${number}`, Wave> {
/\*\*
_Comma seperated list of all card ids that appear in this encounter
_/
comment*wave_enemies: string;
}
export interface Wave extends Record<
`variant${number}`,
Record<`o${3 | 2 | 1 | 0}_unit${number}`, `${string}*${string}`>

> {

    wave_rand: number;
    wave_music?: number;
    wave_screen_text?: string;

}
export interface LootListUp {
fleet: { boss: string[]; glo: string[]; [key: string]: string[] };
up: { glo: string[]; [key: string]: string[] };
start: Record<string, { gen: string[]; stat: string[] }>;
}
export interface TextLists {
shop*loc: Record<string, string[]>;
con_insult: { adj: string[]; noun: string[] };
gp: {
corp_1: Uppercase<string>[];
corp_2: Uppercase<string>[];
leg: Uppercase<string>[];
};
}
export type Tutorials = Record<`tut*${string}`, { txt: string }>;
export type Upgrades = Record<
    `fl_boss_${string}`|`fl*glo*${string}` | `fl_${string}\_${string}`,
FleetUpgrade

> &

    Record<`up_${string}`, Dongle> &
    Record<`up_start_${string}`, StartingUpgrade>;

export interface FleetUpgrade {
header: string;
txt: string;
txt*equip: string;
}
export interface Dongle {
header: string;
txt: string;
}
export interface StartingUpgrade {
icon: string;
icon_prio: number;
}
export type CloudLabels = Record<string, { txt: string; size: number }>;
export type Credits = Record<number, { txt: string[]; size: number }>;
export type LootListCard = Record<string, FactionLoot | RandomStart> & {
start: RandomStart;
};
export interface FactionLoot {
shp: `pl*${string}_${string}`[];
    shp_combo: Record<string, `pl*${string}*${string}`>;
    tch: `ab_${string}`[];
    tch_combo: Record<string, `ab*${string}`>;
    str: `pl*${string}_${string}`[];
    use: `ab*${string}`[];
}
export interface RandomStart {
    defense: `ab*${string}`[];
    damage: `ab_${string}`[];
    buff: `ab*${string}`[];
    control: `ab*${string}`[];
    const: `pl_${string}_${string}`[];
}
export type SpUp = Record<
    `pl_${string}_${string}`|`ab\_${string}`,
| Record<SpUpKeys, number>
| (Record<SpUpKeys, number> & { apply_status: number; power: number })
| (Record<SpUpKeys, number> & { gain_status: number; gain_power: number })
| (Record<SpUpKeys, number> & {
target_debuff: number;
debuff_power: number;
})

> ;
> export type SpUpKeys =

    | "ep"
    | "dmg"
    | "hp"
    | "scatter"
    | "pierce"
    | "start_status"
    | "timer"
    | "self_attack"
    | "decay_amp"
    | "rapid"
    | "amp_am"
    | "deploy_cost"
    | "range"
    | "spawn_sp_up"
    | "phoenix"
    | "up_slot"
    | "crit_mul"
    | "drive_power"
    | "ready"
    | "eliminate"
    | "heavy_armor"
    | "final_stand"
    | "replay"
    | "mass_produced"
    | "hack_bonus"
    | "multi"
    | "primed"
    | "interdict"
    | "mega_boost"
    | "mirror"
    | "fast_draw"
    | "ab_target"
    | "consume"
    | "dmg_vs_emp"
    | "priority"
    | "megaship_boost"
    | "unload"
    | "scatter_overwrite"
    | "multi_tmp"
    | "intercept"
    | "repair"
    | "add_replay";

export type Tooltips = Record<
string,
{ header?: string; txt: string; suf?: number }

> ;
> export type UnlockCond = Record<string, { cond: string; unlock: string }>;

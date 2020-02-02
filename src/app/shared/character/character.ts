import { Dice } from '@app/shared/dice/dice';
import { GetBaseAttributeTypeOfSkill, SkillType } from '@app/shared/character/skillType';
import { AttributeType } from '@app/shared/character/attributeType';

export interface CharacterSkill {
  type: SkillType;
  value: number;
}

export interface CharacterAttribute {
  type: AttributeType;
  value: number;
}

export interface CharacterDrainable {
  currentValue: number;
  maximumValue: number;
}

export interface CharacterBodyStatus {
  hitpoints?: CharacterDrainable;
  mindpoints?: CharacterDrainable;
  radiationPoints?: CharacterDrainable;
  encumbarance?: CharacterDrainable;
  armor?: number;
  reputation?: number;
}

// interface CoriolisItem {
//   itemId: number;
//   itemName: string;
//   itemWeight: number;
//   influenceToSkill: [];
// }

export class Character {
  name: string;
  concept: string;
  groupConcept: string;
  personalProblem: string;
  background: string;
  icon: string;
  xp: number;

  attributes: CharacterAttribute[];
  skills: CharacterSkill[];
  bodyStatus: CharacterBodyStatus;

  private static rollNumberOfDice(numberOfDiceToRoll: number): Dice[] {
    const dice: Dice[] = [];
    let numberOfSuccesses = 0;
    for (let i = 0; i < numberOfDiceToRoll; i++) {
      dice[i] = new Dice();
      if (dice[i].rollAgainstUpperThreshold(6)) {
        ++numberOfSuccesses;
      }
    }
    return dice;
  }

  // inventory: CharacterInventory;

  // private uid: number;

  public constructor(init?: Partial<Character>) {
    Object.assign(this, init);
  }

  /**
   * rolls a skilltype and returns the successses and the dices
   * @param skill - the skilltype to roll
   * @param manualModifications - manual modifications for the roll
   */
  rollSkill(skill: SkillType, manualModifications: number = 0): Dice[] {
    const numberOfDiceToRoll = this.countAvailableDiceForSkill(skill) + manualModifications;
    return Character.rollNumberOfDice(numberOfDiceToRoll);
  }

  /**
   * rolls a single attribute and returns the successses and the dices
   * @param attribute - attribute to use
   * @param manualModifications - manual modifications for the roll
   */
  rollAttribute(attribute: AttributeType, manualModifications: number = 0): Dice[] {
    const numberOfDiceToRoll = this.countAvailableDiceForAttribute(attribute) + manualModifications;
    return Character.rollNumberOfDice(numberOfDiceToRoll);
  }

  gainXP(additionalXp: number) {
    // TODO: BUG 24 + 2 = 242 .. somthing weird with the addition function
    const xp: number = this.xp;
    this.xp = xp + additionalXp;
  }

  private countAvailableDiceForSkill(skill: SkillType): number {
    const usedSkill: CharacterSkill = this.skills.find(item => item.type === skill);
    const skillValue = usedSkill.value;

    const baseAttributeToUse: AttributeType = GetBaseAttributeTypeOfSkill(skill);
    const baseAttributeValue = this.countAvailableDiceForAttribute(baseAttributeToUse);

    return skillValue + baseAttributeValue;
  }

  private countAvailableDiceForAttribute(attributeType: AttributeType): number {
    const attribute = this.attributes.find(item => item.type === attributeType);
    return attribute.value;
  }
}

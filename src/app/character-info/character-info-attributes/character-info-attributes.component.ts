import { Component, Input, OnInit } from '@angular/core';
import { Character } from '@app/character-info/character';

@Component({
  selector: 'app-character-info-attributes',
  templateUrl: './character-info-attributes.component.html',
  styleUrls: ['./character-info-attributes.component.scss']
})
export class CharacterInfoAttributesComponent implements OnInit {
  @Input() selectedCharacter: Character;
  @Input() isPanelExpanded: boolean;

  constructor() {}

  ngOnInit() {}
}

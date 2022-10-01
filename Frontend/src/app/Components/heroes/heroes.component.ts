import { Component, OnInit } from '@angular/core'

import { HeroService } from 'src/app/Services/hero.service'
import { MessageService } from 'src/app/Services/message.service'

import { Hero } from 'src/app/Interfaces/Hero'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {
  heroes?: Hero[]

  getHeroes = (): void => {
    this.heroService.getHeroes()
      .subscribe((heroes) => this.heroes = heroes)
  }

  // selectedHero?: Hero
  // onSelect = (hero: Hero): void => {
  //   this.selectedHero = hero
  //   this.messageService.add(`HeroesComponent: Selected hero ID = ${this.selectedHero.id}`)
  // }

  constructor(
    private heroService: HeroService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes()
  }
}

import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { MessageService } from './message.service'

import { Hero } from 'src/app/Interfaces/Hero'

import { HEROES } from 'src/app/TestDB/Heroes'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHero = (id: number): Observable<Hero> => {
    const hero = HEROES.find(hero => hero.id === id)!
    this.messageService.add(`HeroService: fetched hero id=${id}`)
    return of(hero)
  }
  getHeroes = (): Observable<Hero[]> => {
    const heroes = of(HEROES)
    this.messageService.add("Hero service: heroes fetched")
    return heroes
  }

  constructor(private messageService: MessageService) { }
}

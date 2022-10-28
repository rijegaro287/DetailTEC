import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  form: FormGroup
  /** 
   * Clase que contiene funciones auxiliares para el manejo de formularios
  */
  constructor() { this.form = new FormGroup({}) }

  /** Reinicia los valores del formulario */
  resetForm = () => { this.form = new FormGroup({}) }

  /** Devuelve todos los campos del formulario */
  getFormValue = () => this.form.value

  /** 
   * Asigna todos los campos del formulario según un objeto dado
   * @param value Objeto con los valores a asignar
  */
  patchFormValue = (value: any) => this.form.patchValue(value)

  /** 
   * Asigna todos los campos del formulario según un objeto dado
   * @param value Objeto con los valores a asignar
  */
  setFormValue = (value: any) => this.form.setValue(value)

  /** Imprime en consola los valores actuales del formulario */
  printFormValue = () => console.log(this.form.value)
}

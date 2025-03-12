import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollbar]' 
})
export class ScrollbarDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.setScrollbar();
  }

  private setScrollbar() {
    const element = this.el.nativeElement;

    // Estilos para a barra de rolagem
    this.renderer.setStyle(element, 'scrollbar-color', 'green #3CAF59');
    this.renderer.setStyle(element, 'scrollbar-width', 'thin'); 
  }
}

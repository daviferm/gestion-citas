import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit, EventEmitter } from '@angular/core';
import { GestionMenuService } from '../servicios/gestion-menu.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewInit {

  @ViewChild('wrapper')
  wrapper!: ElementRef;
  @ViewChild('aside')
  aside!: ElementRef;
  @ViewChild('contenido')
  contenido!: ElementRef;

  constructor( private gestionMenu: GestionMenuService,
               private renderer: Renderer2 ) {}

  ngOnInit(): void {

    // Esconder o expandir Sidebar version escritorio
    this.gestionMenu.actualizarMenuDescktop.subscribe( (resp: boolean) => {
      const wrapper = this.wrapper.nativeElement;
      if ( !resp ) {
        this.renderer.setStyle( wrapper, 'grid-template-columns', '50px auto' );
      } else {
        this.renderer.setStyle( wrapper, 'grid-template-columns', '240px auto' );
      }
    } )
    // Esconder o expandir Sidebar version movil
    this.gestionMenu.actualizarMenuMovil.subscribe( (resp: boolean) => {
      if( resp ) {
        // Mostrar Sidebar
        this.renderer.setStyle( this.aside.nativeElement, 'transition-duration', '.2s' );
        this.renderer.setStyle( this.aside.nativeElement, 'left', '0px' );
      } else {
        // Esconder Sidebar
        this.renderer.setStyle( this.aside.nativeElement, 'transition-duration', '.1s' );
        this.renderer.setStyle( this.aside.nativeElement, 'left', '-240px' );
      }
    } )

  }
  ngAfterViewInit() {

    const wrapper = this.wrapper.nativeElement.clientWidth;
    
    if ( wrapper <= 580 ) {
      this.styleMobile();
    } else {
      this.styleDescktop();
    }

  }

  onResize(event: any) {
    if ( event.target.innerWidth < 580 ) {
      // Estilos para mobiles
      this.styleMobile();
    } else {
      // Estilos para escritorio
      this.styleDescktop();
    }

}

styleMobile() {
  const aside = this.aside.nativeElement;
  const wrapper = this.wrapper.nativeElement;
  this.renderer.addClass( wrapper, 'wrapper-mobile' );
  this.renderer.removeClass( wrapper, 'page-wrapper' );
  this.renderer.addClass( aside, 'aside-mobile');
  this.renderer.removeClass( aside, 'aside-descktop');
  this.renderer.setStyle( this.aside.nativeElement, 'left', '-240px' );

}
styleDescktop() {
  const aside = this.aside.nativeElement;
  const wrapper = this.wrapper.nativeElement;
  this.renderer.addClass( wrapper, 'page-wrapper' );
  this.renderer.removeClass( wrapper, 'wrapper-mobile' );
  this.renderer.addClass( aside, 'aside-descktop');
  this.renderer.removeClass( aside, 'aside-mobile');
  this.renderer.setStyle( aside, 'transition-duration', '0s' );
  this.renderer.setStyle( aside, 'left', '0px' );
  this.renderer.setStyle( wrapper, 'grid-template-columns', '240px auto' );
}

}

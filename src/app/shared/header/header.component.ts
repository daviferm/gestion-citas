import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { GestionMenuService } from '../../servicios/gestion-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('header')
  header!: ElementRef;
  isMobile: boolean = false;
  menuActive?: boolean = true;
  title?: boolean;
  delay = timer(100);

  constructor( private renderer: Renderer2,
               private gestionMenu: GestionMenuService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    const widtheader = this.header.nativeElement.clientWidth;
    const header = this.header.nativeElement;
    if ( widtheader <= 580 ) {
      this.delay.subscribe( () => this.title = false );
      this.renderer.setStyle( header, 'grid-template-columns', '50px auto' );
      this.menuActive = false;
    } else {
      this.delay.subscribe( () => this.title = true );
      this.renderer.setStyle( header, 'grid-template-columns', '240px auto' );
    }

  }
  onResize( event: any ) {
    const header = this.header.nativeElement;
    const ancho = event.target.innerWidth;
    if ( ancho <= 580 ) {
      this.renderer.setStyle( header, 'grid-template-columns', '50px auto' );
      this.title = false;
      this.menuActive = false;
    } else {
      this.renderer.setStyle( header, 'grid-template-columns', '240px auto' );
      this.title = true;
      this.menuActive = true;
    }
  }
  

  activarMenu(): void {

    const widtheader = this.header.nativeElement.clientWidth;
    const header = this.header.nativeElement;
    if ( widtheader <= 580 ) {
      // Versión para moviles
      if ( this.menuActive ) {
        // Plegar Sidebar
        this.menuActive = false;
        this.gestionMenu.actualizarMenuMovil.emit(false);
      } else {
        // Desplegar Sidebar
        this.menuActive = true;
        this.gestionMenu.actualizarMenuMovil.emit(true);
      }

    } else {
      // Versión escritorio
      this.title = true;
      if ( this.menuActive ) {
        // Cuando el Sidebar está plegado
        this.title = false;
        this.renderer.setStyle( header, 'grid-template-columns', '50px auto' );
        this.gestionMenu.actualizarMenuDescktop.emit(false);
        this.menuActive = false;
      } else {
        // Cuando el Sidebar está desplegado
        this.title = true
        this.renderer.setStyle( header, 'grid-template-columns', '240px auto' );
        this.gestionMenu.actualizarMenuDescktop.emit(true);
        this.menuActive = true;
      }

    }


  }


}

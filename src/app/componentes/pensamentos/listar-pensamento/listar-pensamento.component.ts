import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent {

  constructor(private service: PensamentoService, private router: Router) {}
  paginaAtual: number = 1;

  haMaisPensamentos:boolean = true;

  listaPensamentos: Pensamento[] = [];

  filtro:string = '';

  favorito:boolean = false;

  listaFavoritos: Pensamento[] = [];

  titulo: string = 'Meu Mural'

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }

  pesquisarPensamentos(){
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe(listapensamentos => {
      this.listaPensamentos = listapensamentos;
    })
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favorito).subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos);
      if(!listaPensamentos.length){
        this.haMaisPensamentos = false;
      }
    })
  }

  recarregarComponente(){
    //location.reload();
    this.favorito = false;
    this.paginaAtual = 1;

    this.router.routeReuseStrategy.shouldReuseRoute= () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  listarFavoritos(){
    this.titulo = 'Meus Favoritos'
    this.favorito = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;

    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe(listadePensamentosFavoritos => {
      this.listaPensamentos = listadePensamentosFavoritos;
      this.listaFavoritos = listadePensamentosFavoritos;
    })
  }
}

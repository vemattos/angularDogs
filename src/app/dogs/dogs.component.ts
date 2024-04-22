import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css']
})
export class DogsComponent implements OnInit {

  formularioLanche!: FormGroup ;
  lanches: any[] = [];
  idCounter: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarLanches();
  }

  resetar() {
    window.location.reload();
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  inicializarFormulario() {
    this.formularioLanche = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(5)]],
      preco: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      imagem: ['', Validators.required]
    });
  }

  adicionarLanche() {
    if (this.formularioLanche.valid) {
      const novoLanche = {
        id: this.idCounter++,
        nome: this.formularioLanche.value.nome,
        descricao: this.formularioLanche.value.descricao,
        preco: this.formularioLanche.value.preco,
        peso: this.formularioLanche.value.peso,
        imagem: this.formularioLanche.value.imagem
      };

      this.lanches.push(novoLanche);
      this.salvarLanches();
      this.formularioLanche.reset();
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  excluirLanche(id: number) {
    this.lanches = this.lanches.filter(lanche => lanche.id !== id);
    this.salvarLanches();
  }

  editarLanche(lanche: any) {
    let novoNome;
    let novaDescricao;
    let novoPreco;
    let novoPeso;
    let novaImagem;
    let valid = false;

    while (!valid) {
      novoNome = prompt('Novo nome:', lanche.nome);
      if (novoNome === null) return;

      novoNome = novoNome.trim();

      if (novoNome.length < 3) {
        alert('O nome deve ter pelo menos 3 caracteres.');
        continue;
      }

      novaDescricao = prompt('Nova descrição:', lanche.descricao);
      if (novaDescricao === null) return;

      novaDescricao = novaDescricao.trim();

      if (novaDescricao.length < 5) {
        alert('A descrição deve ter pelo menos 5 caracteres.');
        continue;
      }

      novoPreco = prompt('Novo preço:', lanche.preco);
      if (novoPreco === null) return;

      novoPreco = novoPreco.trim();

      if (isNaN(parseFloat(novoPreco))) {
        alert('O preço deve ser um número.');
        continue;
      }

      novoPeso = prompt('Novo peso:', lanche.peso);
      if (novoPeso === null) return;

      novoPeso = novoPeso.trim();

      if (isNaN(parseFloat(novoPeso))) {
        alert('O peso deve ser um número.');
        continue;
      }

      novaImagem = prompt('Nova URL da imagem:', lanche.imagem);
      if (novaImagem === null) return;

      novaImagem = novaImagem.trim();

      if (!novaImagem.startsWith('http://') && !novaImagem.startsWith('https://')) {
        alert('A URL da imagem deve começar com "http://" ou "https://".');
        continue;
      }

      valid = true;
    }

    lanche.nome = novoNome;
    lanche.descricao = novaDescricao;
    lanche.preco = novoPreco;
    lanche.peso = novoPeso;
    lanche.imagem = novaImagem;

    this.salvarLanches();
  }

  salvarLanches() {
    localStorage.setItem('lanches', JSON.stringify(this.lanches));
  }

  carregarLanches() {
    const lanchesString = localStorage.getItem('lanches');
    if (lanchesString) {
      this.lanches = JSON.parse(lanchesString);
    }
  }
}

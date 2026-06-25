import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { CriarProdutoDTO } from "../model/produto/dto/criar-produto.dto";
import { ProdutoService } from "../model/produto/produto.service";

@Controller("/produtos")
export class ProdutoController {

    constructor (
        private readonly produtoService : ProdutoService
    ) {}

    @Post()
    async criarProduto(@Body() dadosProduto : CriarProdutoDTO){
        this.produtoService.criarProduto(dadosProduto);
    }

    @Get()
    async listarProduto(){

    }

    @Put()
    async atualizarProduto(){

    } 

    @Delete()
    async deletarProduto(){
        
    }
}
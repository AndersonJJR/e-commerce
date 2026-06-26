import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param,
     ParseUUIDPipe, Post, Put, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { CriarProdutoDTO } from "../model/produto/dto/criar-produto.dto";
import { ProdutoService } from "../model/produto/produto.service";
import { AtualizarProdutoDTO } from "../model/produto/dto/atualizar-produto.dto";
import { BuscarProdutoResponseDTO, ListarProdutosResponseDTO } from "../model/produto/dto/listar-produto.dto";

@Controller("/produtos")
@UseInterceptors(ClassSerializerInterceptor)
export class ProdutoController {

    constructor (
        private readonly produtoService : ProdutoService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async criarProduto(@Body() dadosProduto : CriarProdutoDTO){
        return await this.produtoService.criarProduto(dadosProduto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @SerializeOptions({ type : ListarProdutosResponseDTO, excludeExtraneousValues : true})
    async listarProdutos(): Promise<ListarProdutosResponseDTO[]>{
        return await this.produtoService.listarProdutos();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    @SerializeOptions({ type : BuscarProdutoResponseDTO , excludeExtraneousValues : true})
    async buscarProduto(
        @Param("id" , new ParseUUIDPipe) id : string
    ): Promise<BuscarProdutoResponseDTO>{
        return await this.produtoService.buscarProduto(id);
    }

    @Put("/:id")
    @HttpCode(HttpStatus.OK)
    async atualizarProduto(
        @Param("id" , new ParseUUIDPipe()) id : string,
        @Body() dadosAtualizarProduto : AtualizarProdutoDTO
    ){
        return await this.produtoService.atualizarProdutos(id , dadosAtualizarProduto);
    } 

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    async deletarProduto(
        @Param("id") id : string
    ){
        return await this.produtoService.deletarProduto(id);
    }

    @Delete("/desabilitar/:id")
    @HttpCode(HttpStatus.OK)
    async desativarProduto(
        @Param("id" , new ParseUUIDPipe) id : string
    ){
        return await this.produtoService.desabilitarProduto(id);
    }

    @Post("/habilitar/:id")
    @HttpCode(HttpStatus.CREATED)
    async habilitarProduto(@Param("id", new ParseUUIDPipe) id : string){
        return this.produtoService.habilitarProduto(id);
    }

    @Get("/desabilitados")
    @HttpCode(HttpStatus.OK)
    @SerializeOptions({ type : ListarProdutosResponseDTO, excludeExtraneousValues : true})
    async listarDesabilitados(): Promise<ListarProdutosResponseDTO[]>{
        return this.produtoService.listarDesabilitados();
    }
}
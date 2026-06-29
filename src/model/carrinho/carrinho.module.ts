import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarrinhoEntity } from "./entities/carrinho.entity";
import { ItemCarrinhoEntity } from "./entities/item-carrinho.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { HistoricoCarrinho, HistoricoCarrinhoSchema } from "./entities/historico-carrinho.schema";
import { ProdutoModule } from "../produto/produto.module";
import { CarrinhoController } from "../../controller/carrinho.controller";
import { CarrinhoService } from "./carrinho.service";

@Module({
    imports : [
        TypeOrmModule.forFeature([CarrinhoEntity, ItemCarrinhoEntity]),
        MongooseModule.forFeature([{name : HistoricoCarrinho.name, schema : HistoricoCarrinhoSchema}],
            'analytics'
        ),
        ProdutoModule,
    ],
    controllers:[CarrinhoController],
    providers:[CarrinhoService]
})
export class CarrinhoModule {

}
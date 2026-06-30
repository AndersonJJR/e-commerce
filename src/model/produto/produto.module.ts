import { Module } from "@nestjs/common";
import { ProdutoController } from "../../controller/produto.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoEntity } from "./entities/produto.entity";
import { CaracteristicasProduto } from "./entities/caracteristicas-produto.entity";
import { ProdutoService } from "./produto.service";

@Module({
    imports : [TypeOrmModule.forFeature([
        ProdutoEntity,
        CaracteristicasProduto
    ])],
    controllers : [ProdutoController],
    providers : [ProdutoService],
    exports : [ProdutoService]
})
export class ProdutoModule {
}
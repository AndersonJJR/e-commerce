import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProdutoEntity } from "../../produto/entities/produto.entity";
import { CarrinhoEntity } from "./carrinho.entity";

@Entity()
export class ItemCarrinhoEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({precision : 10 , scale : 2 , type : 'decimal'})
    precoUnitario : number;

    @Column({type : 'int'})
    quantidade : number;

    @ManyToOne(() => ProdutoEntity, {
        eager : true
    })
    produto: ProdutoEntity;

    @ManyToOne(() => CarrinhoEntity , (carrinho) => carrinho.items, {
        onDelete : 'CASCADE'
    })
    carrinho : CarrinhoEntity;
}
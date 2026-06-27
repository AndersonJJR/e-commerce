import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProdutoEntity } from "../../produto/entities/produto.entity";

@Entity({name : 'Carrinho'})
export class CarrinhoEntity{

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @OneToMany(() => ProdutoEntity, (produto) => produto.id , {
        eager : false
    })
    carrinho : ProdutoEntity[];

    @Column({ type: 'decimal' , precision : 10 , scale : 2 })
    valorTotal : number;
}
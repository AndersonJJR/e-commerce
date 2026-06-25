import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProdutoEntity } from "./produto.entity";

@Entity({ name : 'caracteristicas_produto' })
export class CaracteristicasProduto {

    @PrimaryGeneratedColumn('uuid')
    id : string;
    @Column()
    chave : string;
    @Column()
    valor : string;

    @ManyToOne(() => ProdutoEntity, (produto) => produto.caracteristicasDoProduto, {
        onDelete : 'CASCADE'
    })
    @JoinColumn({ name : 'produto_id'})
    produto : ProdutoEntity;
}
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CaracteristicasProduto } from './caracteristicas-produto.entity';
import { CATEGORIA_PRODUTO_VALUES } from '../types/categoria-produto.type';
import type { CategoriaProduto } from '../types/categoria-produto.type';

@Entity({ name: 'Produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nome: string;
  @Column()
  descricao: string;
  @Column()
  codigoDoProduto: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorProduto: number;

  @Column({
    type: 'enum',
    enum: CATEGORIA_PRODUTO_VALUES,
    default: 'SEM_CATEGORIA',
  })
  categoriaProduto: CategoriaProduto;

  @OneToMany(() => CaracteristicasProduto, (char) => char.produto, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  caracteristicasDoProduto: CaracteristicasProduto[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Column({ type: 'boolean' })
  status: boolean;
}

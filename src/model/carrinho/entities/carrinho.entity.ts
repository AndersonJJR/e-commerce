import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProdutoEntity } from '../../produto/entities/produto.entity';
import { ItemCarrinhoEntity } from './item-carrinho.entity';

@Entity({ name: 'Carrinho' })
export class CarrinhoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @OneToMany(() => ItemCarrinhoEntity, (item) => item.carrinho, {
    cascade: true,
    eager: true,
  })
  items: CarrinhoEntity[];
}

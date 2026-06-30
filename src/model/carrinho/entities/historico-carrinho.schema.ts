import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class ItemCarrinhoSnapshot {
  @Prop({ required: true })
  idProduto: string;

  @Prop({ required: true })
  nomeProduto: string;

  @Prop({ required: true })
  quantidade: number;

  @Prop({ required: true })
  precoUnitario: number;
}

@Schema({ timestamps: { createdAt: 'purchasedAt', updatedAt: false } })
export class HistoricoCarrinho extends Document {
  @Prop({ required: true, index: true })
  idUsuario: string;

  @Prop({ type: [Object], required: true })
  items: ItemCarrinhoSnapshot[];

  @Prop({ required: true })
  valorTotal: number;

  purchasedAt: Date;
}

export const HistoricoCarrinhoSchema =
  SchemaFactory.createForClass(HistoricoCarrinho);

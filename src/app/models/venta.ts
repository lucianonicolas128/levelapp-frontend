import { Cliente } from './cliente';

export class Venta{
    constructor(
        public _id: string,
        public fecha: string,
        public cliente: string,
        public pedido: string,
        public descripcion: string,
        public monto: number,
        public saldo: number,
        public entregado: boolean,
        public company: string,
    ){}
}
export class Egreso{
    constructor(
        public _id: string,
        public fecha: string,
        public proveedor: string,
        public pedido: string,
        public descripcion: string,
        public monto: number
    ){}
}
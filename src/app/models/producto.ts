export class Producto{
    constructor(
        public _id: string,
        public nombre: string,
        public descripcion: string,
        public categoria: string,
        public costo: number,
        public precio: number,
        public image: string
    ){}
}
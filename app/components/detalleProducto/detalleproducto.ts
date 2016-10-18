export class DetalleProducto {

     constructor(public  Name:string, public Template: string, public Lista: Array<DetalleProducto>,public Navigate: string,public Icon: string) { }
}
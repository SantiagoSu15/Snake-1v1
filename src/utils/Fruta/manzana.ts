import type { snake } from "../Serpiente/snake"
import { fruit } from "./fruit"

export class manzana extends fruit{
    cssClass = "ManzanaClass"


    putEffect(s: snake): void {
        s.grow();
    }

}
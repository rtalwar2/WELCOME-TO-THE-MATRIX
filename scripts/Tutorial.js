import {Matrix} from "./Matrix.js"
export class Tutorial {
    stapnummer;
    matrix;
    constructor() {

      if (this.constructor === Tutorial) {
        throw new Error("Dit is een abstracte klasse");
      }
    }
    
    Tutorial(matrix) {
      throw new Error("Method 'Tutorial()' must be implemented.");
    }
  
    refresh(stapnummer) {
        throw new Error("Method 'refresh()' must be implemented.");
    }
  }

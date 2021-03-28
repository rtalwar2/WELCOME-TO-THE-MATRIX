import Matrix from "./Matrix.js"
export class Tutorial {
    stapnummer;
    matrix;
    constructor() {
        if (this.constructor === Tutorial) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    Tutorial(matrix) {
      throw new Error("Method 'Tutorial()' must be implemented.");
    }
    refresh(stapnummer) {
        throw new Error("Method 'refresh()' must be implemented.");
    }
  }

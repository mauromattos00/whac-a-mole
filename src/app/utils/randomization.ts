export class Randomization {
  static generateMoleDuration(): number {
    return Math.round(Math.random() * (3000 - 1000) + 1000);
  }

  static generateHoleNumber(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  static generateNewHoles(): number[] {
    const newHoles: number[] = [];
    for (let i = 0; i < 3; i++) {
      let newHole: number
      do {
        newHole = this.generateHoleNumber();
      } while (newHoles.includes(newHole));

      newHoles.push(newHole);
    }

    return newHoles;
  }
}

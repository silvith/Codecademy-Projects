// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// factory function
const pAequorFactory = (specimenNum, dna) => {
  return (
    {
      specimenNum, 
      dna,
      mutate() {
        let randBaseLocation = Math.floor(Math.random()*15);
        let randBase = returnRandBase();
        while (randBase == dna[randBaseLocation]) {
          randBase = returnRandBase();
        }
        this.dna[randBaseLocation] = randBase;
      },
      compareDNA(sibling) {
        let sameDNA = 0;
        for (base of this.dna) {          
          if (base == sibling.dna[this.dna.indexOf(base)]) {
            sameDNA++;
          };
        };

        let percentage = sameDNA * Math.floor((100/15));

        console.log(`Specimen ${this.specimenNum} and specimen ${sibling.specimenNum} have ${percentage}% DNA strands in common.`);
      },
      willLikelySurvive() {
        let gBases = 0;
        let cBases = 0;
        for (base of this.dna) {
          if (base == 'G') {
            gBases++;
          } else if (base == 'C') {
            cBases++;
          }
        };
        gBases *= Math.floor((100/15));
        cBases *= Math.floor((100/15));

        if (gBases >= 60 || cBases >= 60) {
          return true;
        } else { 
          return false;
        }
      },
    }
  );
};

let thing = pAequorFactory(1,mockUpStrand());
let siblingThing = pAequorFactory(2,mockUpStrand());

console.log(thing);

thing.mutate();
console.log('dna: ',thing.dna);

console.log('sibling dna: ', siblingThing.dna);
thing.compareDNA(siblingThing);

console.log('It likely survives: ', thing.willLikelySurvive());

let strongThings = [];
let id = 5;
do {
  let newThing = pAequorFactory(id,mockUpStrand());
  if (newThing.willLikelySurvive()) {
    strongThings.push(newThing);
  }
  id++;
} 
while ( strongThings.length < 30);

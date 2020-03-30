import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showChart: any = false;
  showSub: any = false;
  cantSwap = true;
  leftText: string;
  rightText: string;
  key: any;
  encryptionKey = "";
  lang: string;
  freq: any;
  letterA: string;
  letterB: string;
  alphabet = [];
  alphabetENG = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  alphabetARA = ["ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ",
    "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي", "أ", "إ", "ى", "ء", "ئ", "آ", "ة", "ؤ"];
  alphabetGRE = ["Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ",
    "Υ", "Φ", "Χ", "Ψ", "Ω"];

  arabicOrderByFreq = ["ا", "ل", "ن", "م", "و", "ي", "ه", "ر", "ب", "ت", "ك", "ع", "أ",
    "ف", "ق", "س", "د", "إ", "ذ", "ح", "ج", "ى", "خ", "ة", "ش", "ص", "ض", "ز", "ء", "آ", "ث", "ط", "غ", "ئ", "ظ", "ؤ"];
  englishOrderByFreq = ["E", "T", "A", "O", "I", "N", "S", "R", "H", "D", "L", "U", "C", "M", "F", "Y", "W", "G", "P", "B", "V", "K", "X", "Q", "J", "Z"];
  greekOrderByFreq = ["Α", "Ο", "Ι", "Ε", "Τ", "Σ", "Ν", "Η", "Υ", "Ρ", "Π", "Κ", "Μ", "Λ", "Ω", "Δ", "Γ", "Χ", "Θ", "Φ", "Β", "Ξ", "Ζ", "Ψ"];

  dataSource: any;
  chartConfig: any;
  substitutions: any;
  color = 'accent';
  checked = false;
  disabled = false;
  lastClicked = 1;
  orderByFreq: any = true;
  tableRow1 = [];
  tableRow2 = [];
  usedLetters: string;

  constructor() {
    this.substitutions = [];
  }

  orderByFrequency() {
    if (this.orderByFreq == false) {
      this.orderByFreq == true;

    } else {
      this.orderByFreq == false;

    }

    if (this.orderByFreq) {
      this.freq = this.freq.sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0))
    } else {
      this.freq = this.freq.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))


    }

  }

  getLetterIndex(letter: string) {
    let index = -1;
    for (let i = 0; i < this.tableRow1.length; i++) {
      if (this.tableRow1[i].label === letter) {
        index = i;

      }
    }
    return index;
  }
  swap() {
    if (this.leftText.split(this.letterA.toUpperCase()).length > 1) {

      if (this.usedLetters.split(this.letterB.toLowerCase()).length <= 1) {
        this.usedLetters += this.letterB.toLowerCase();
        this.leftText = this.leftText.split(this.letterA.toUpperCase()).join(this.letterB.toLowerCase());

        let index = this.getLetterIndex(this.letterA.toUpperCase());

        this.substitutions[index] = { class: "removableCell", letter: this.letterB.toLowerCase(), original: this.letterA.toUpperCase() };
      }


    }

  }
  undoSwap(s: any) {
    this.usedLetters = this.usedLetters.split(s.letter.toLowerCase()).join("");
    this.leftText = this.leftText.split(s.letter.toLowerCase()).join(s.original.toUpperCase());
    let index = this.getLetterIndex(s.original.toUpperCase());
    this.substitutions[index] = { class: "cell", letter: "", original: "" };
  }
  checkLanguage(text: string) {
    var arabic = /[\u0600-\u06FF]/; //the unicode range for arabic letters
    var greek = /[\u0391-\u03a9]/; //the unicode range for uppercase Greek letters
    if (arabic.test(text)) {
      this.lang = "ARA";
      this.alphabet = this.alphabetARA;
    }
    else {
      if (greek.test(text.toUpperCase())) {
        this.lang = "GRE";
        this.alphabet = this.alphabetGRE;

      } else {
        this.alphabet = this.alphabetENG;
        this.lang = "ENG";
      }

    }
    for (let i = 0; i < this.alphabet.length; i++) {
      this.substitutions[i] = { class: "cell", letter: "" }
    }
  }
  alert(l: any) {
    alert(l)
  }
  showChartDiv() {
    this.getTableData();
    this.chartConfig = {
      width: '100%',
      height: '200',
      type: 'column2d',
      dataFormat: 'json',
    };
    this.freq = this.freq.sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0))
    this.dataSource = {
      "chart": {
        "caption": "Letters Frequencies",
        "xAxisName": "Letter",
        "yAxisName": "Frequency",
        "numberSuffix": "%",
        "theme": "gammel",
      },
      "data": this.freq
    };
    for (let i = 0; i < this.freq.length; i++) {
      if (this.freq[i].value == 100) {
        this.dataSource = {
          "chart": {
            "yAxisMaxValue": "100",
            "caption": "Letters Frequencies",
            "xAxisName": "Letter",
            "yAxisName": "Frequency",
            "numberSuffix": "%",
            "theme": "gammel",
          },
          "data": this.freq
        };
      }
    }

    this.showChart = true;
  }
  decrypt() {
    this.usedLetters = "";
    this.checkLanguage(this.rightText);
    this.getFrequency()
    this.showChartDiv();
    this.leftText = this.rightText.toUpperCase();
    this.cantSwap = false;

  }
  encrypt() {
    this.showChart = false;
    //let freq = this.getFrequency(this.leftText)
    //console.log(freq)
    this.checkLanguage(this.leftText);
    this.getRandomKey()
    console.log(this.key)
    this.cantSwap = true;

  }
  getRandomKey() {
    var alphabet = [];
    switch (this.lang) {
      case "ENG": alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        break;
      case "GRE": alphabet = ["Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ",
        "Υ", "Φ", "Χ", "Ψ", "Ω"];

        break;
      case "ARA": alphabet = ["ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ",
        "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي", "أ", "إ", "ى", "ء", "ئ", "آ", "ة", "ؤ"];

        break;
    }


    var currentIndex = alphabet.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = alphabet[currentIndex];
      alphabet[currentIndex] = alphabet[randomIndex];
      alphabet[randomIndex] = temporaryValue;
    }
    this.encryptionKey = "";
    for (let i = 0; i < alphabet.length; i++) {
      this.encryptionKey += alphabet[i];
    }
    this.key = alphabet;


    console.log("Alphabet :" + this.alphabet)
    var encrypted = "";
    for (let i = 0; i < this.leftText.length; i++) {
      var currentChar = this.leftText.charAt(i);
      var charIndex = -1;
      for (let j = 0; j < this.alphabet.length; j++) {
        if (currentChar.toUpperCase() === this.alphabet[j]) {
          charIndex = j;
        }
      }
      if (charIndex == -1) {
        encrypted += currentChar
      } else {
        encrypted += this.key[charIndex]

      }

    }
    this.rightText = <string>encrypted;



  }

  updateKey() {

  }
  getFrequency() {
    let input;
    //remove spaces
    switch (this.lang) {
      case "ENG": input = this.rightText.replace(/[^A-Za-z]/g, "")

        break;
      case "GRE": input = this.rightText.toUpperCase().replace(/[^ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ]/g, "")

        break;
      case "ARA": input = this.rightText.replace(/[^ا-ي]/g, "")

        break;
    }

    input = input.toUpperCase();
    var freq = [];
    for (var i = 0; i < this.alphabet.length; i++) {
      let count = 0;
      for (let j = 0; j < input.length; j++) {
        if (this.alphabet[i] == input.charAt(j)) {
          count++;
        }

      }
      freq[i] = { label: this.alphabet[i], value: (count / input.length) * 100 }


    }
    this.freq = freq;



    return freq;
  }
  clearAll() {
    this.leftText = "";
    this.rightText = "";
    this.encryptionKey = "";
    this.freq = null;
    this.substitutions = [];
    this.showChart = false;
    this.letterA = "";
    this.letterB = "";
  }
  getTableData() {
    this.tableRow1 = [];
    for (let i = 0; i < this.freq.length; i++) {
      this.tableRow1[i] = this.freq[i]
    }
    this.tableRow1 = this.tableRow1.sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0));

    switch (this.lang) {
      case "ENG": this.tableRow2 = this.englishOrderByFreq;


        break;
      case "GRE": this.tableRow2 = this.greekOrderByFreq;

        break;
      case "ARA": this.tableRow2 = this.arabicOrderByFreq;


        break;
    }


  }


}


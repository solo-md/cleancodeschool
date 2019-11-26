<h1 align="center">Development playground</h1>
Clean Code School Developer School

<details>
<summary>Details</summary>
<p>
<h3><a href="https://ccd-school.de/coding-dojo/function-katas/russische-bauernmultiplikation/">Russische Bauernmultiplikation</a></h3>
Schreibe eine Funktion, die zwei ganze Zahlen mit dem Algorithmus „russische Bauernmultiplikation“ multipliziert.

Die Signatur der Methode sieht wie folgt aus:
```javascript
int Mul(int x, int y);
```

Der Algorithmus der sogenannten Russischen Bauernmultiplikation verläuft wie folgt: man halbiert die linke der beiden Zahlen so lange, bis die 1 erreicht ist. Nachkommastellen werden abgerundet. Die rechte Zahl wird jeweils daneben geschrieben und verdoppelt. Von den rechten Zahlen werden alle gestrichen, neben denen links eine gerade Zahl steht. Die verbleibenden nicht gestrichenen Zahlen der rechten Seite werden dann addiert und bilden das Ergebnis der Multiplikation.
Beispiel:
```javascript
47 * 42
-------
47 42
23 84
11 168
5 336
2 672
1 1344
=======
1974
```

<h3><a href="https://ccd-school.de/coding-dojo/function-katas/loc/">Line of Code</a></h3>
Entwickle eine Funktion, die die Lines of Code (LOC) in einem C# Quelltext zählt.

Der Quelltext wird als String angeliefert, zurückgegeben wird die Zahl der Zeilen, die ausführbaren Code enthalten. Zeilen, die nur aus Kommentar oder Whitespace bestehen, sollen also herausgefiltert werden.

Beachte:
* C# kennt keine geschachtelten Kommentare
* Kommentarzeichen – /*, */, // – öffnen/schließen Kommentare nicht innerhalb von Strings
* Strings in Kommentaren werden als solche nicht erkannt, d.h. der Kommentar
/\*a"\*/"b... endet schon vor "b.
* Ausführbarer Code kann in der selben Zeile wie ein Kommentar stehen: vor /* bzw. // oder
nach */.

<h3><a href="https://ccd-school.de/coding-dojo/function-katas/from-roman-numerals/">From Roman Numerals</a></h3>
Schreibe eine Funktion, die Römische Zahlen in Dezimalzahlen übersetzt.

Beispiele:
* „I“ -> 1
* „II“ -> 2
* „IV“ -> 4
* „V“ -> 5
* „IX“ -> 9
* „XLII“ -> 42
* „XCIX“ -> 99
* „MMXIII“ -> 2013
Die Römischen Zahlen bewegen sich im Bereich von „I“ bis „MMM“.

| Römische Ziffer | I | V | X | L | C | D | M  |
|-----------------|---|---|---|---|---|---|----|
|      Wert       | 1 | 5 | 10| 50|100|500|1000|

Nimm an, dass die Römischen Zahlen korrekt sind.

<h3><a href="https://ccd-school.de/coding-dojo/application-katas/bankocr/">BankOCR</a></h3>
Schreibe ein Programm, das Kontonummern in ASCII Dateien erkennt.

OCR steht für Optical Character Recognition. Natürlich wäre es etwas viel verlangt, im Rahmen einer Übungsaufgabe eine OCR Software zu schreiben. Doch selbst wenn man die Aufgabe drastisch abspeckt, bleibt sie interessant.

Die einzulesenden ASCII Dateien enthalten Ziffernfolgen, die jeweils in drei Zeilen kodiert sind. Die folgenden Abbildungen zeigen, wie die Ziffern dargestellt werden.

![Example](https://ccd-school.de/wp-content/uploads/2016/04/img_5710980a9e236-750x1024.png)

Jede Ziffer ist drei Zeichen breit und drei Zeilen hoch. Aufeinanderfolgende Ziffern werden durch ein Leerzeichen getrennt. Aufeinanderfolgende Zeilen mit Ziffernfolgen werden durch eine Leerzeile getrennt. Die Ziffern bestehen aus den Zeichen „_“ (Unterstrich) und „I“ (großes i).

Das Programm wird mit einem Dateinamen als Parameter aufgerufen und gibt als Ergebnis die erkannten Ziffern aus. Der Aufbau der Dateien ist immer korrekt.

```powershell
C:> bankocr datei1.txt
1234567890
815
42
07
```
<br><br><br><br><br>
</p>
</details>

<h1 align="center">Documentation</h1>

## Technical description
The goal of the project is to implement four tasks: russian multiplication algorithm, translation of roman numerals to arabic numbers, statistical calculation of a csharp file and a custom OCR processing. In order to make the project closer to a real one, I've decided to include next features:
<ul>
  <li>Static code analysis // <a href="https://eslint.org/">ESLint</a></li>
  <li>Unit testing // <a href="https://jasmine.github.io/">Jasmine</a></li>
  <li>Documentation // <a href="https://devdocs.io/jsdoc/">JSDoc</a></li>
  <li>Logging // <a href="https://github.com/winstonjs/winston">Winston</a></li>
</ul>
Because of a narrow domain, there is also a list of features that are intentionally not part of the project:
<ul>
  <li>Internationalization</li>
  <li>Build type (dev, prod, test) dependent configuration</li>
  <li>Modularization and classes (besides OcrDigit class)</li>
  <li>Build artifact (distribution)</li>
</ul>
The project has a simple and staightforward structure. It can be manually tested via an interactive CLI tool (see User guide below), which provides a single unified interface to test all the tasks, one by one. Validation is part of the project, however there was a very shallow QA work performed on that area.

## Project structure
<ul>
  <li>
    <details>
      <summary>app (source code)</summary>
      <ul>
        <li><details>
          <summary>bank_ocr</summary>
          <ul><li>implementation *.js files</li></ul>
        </details></li>
        <li><details>
          <summary>line_of_code</summary>
          <ul><li>implementation *.js files</li></ul>
        </details></li>
        <li><details>
          <summary>roman_numerals</summary>
          <ul><li>implementation *.js files</li></ul>
        </details></li>
        <li><details>
          <summary>russian_multiplication</summary>
          <ul><li>implementation *.js files</li></ul>
        </details></li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary>test (unit tests)</summary>
      <ul>
        <li><details>
          <summary>bank_ocr</summary>
          <ul><li>test *_spec.js files</li></ul>
        </details></li>
        <li><details>
          <summary>line_of_code</summary>
          <ul><li>data (test data files)</li></ul>
          <ul><li>test *_spec.js files</li></ul>
        </details></li>
        <li><details>
          <summary>roman_numerals</summary>
          <ul><li>test *_spec.js files</li></ul>
        </details></li>
        <li><details>
          <summary>russian_multiplication</summary>
          <ul><li>data (test data files)</li></ul>
          <ul><li>test *_spec.js files</li></ul>
        </details></li>
        <li>jasmine.cfg.json (test library config)</li>
      </ul>
    </details>
  </li>
  <li>index.js (entry point)</li>
  <li>package.json (package metadata)</li>
  <li>.eslintrc.json (static code analysis config)</li>
</ul>

## Prerequisites
Please ensure that latest version of <b>npm</b> and <b>node</b> are installed at your machine.

## Step by step guide
  ```javascript
  npm install // install npm dependencies
  npm test // run linting and unit tests
  npm start // start an interactive tool, follow instructions
  ```
## Interactive tool user guide
Interactive CLI (command line) tool is implemented as a set of questions, where a user must select an item from given list or input a value. Value is validated and in case of an error user can see a feedback about the problem. In case of a successfully finished task a correspondent value will be printed out.
The interactive tool is designed as an infinite loop. User can quit the tool whether with selection a correspondent item from main menu, or with pressing "Ctrl+C key combination.

Please have fun! :wink:
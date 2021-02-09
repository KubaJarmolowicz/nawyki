import { MonthManager } from "./MonthManager.js";

/* YearManager jako singleton do zarzadzania konkretnym rokiem, jesli rok sie zmieni
to dopiero tworzymy nowego, poki rok trwa to zapisujemy w savedState i w firebasie
czy tam gdzies -> jedyny komponent mogacy nadpisywac stan?

Poki metoda jakas w stylu isStillValid() zwraca true to return this i chuj

Na nim metoda do pobierania miesiecy + metody nadpisujace stan..?


, jak isStillValid() zwroci false to  wywolujemy je wszystkie i na nowo zapisujemy wyniki
w savedState

Mozemy zrobic 12 instancji managerow miesiaca zeby bylo latwiej okreslic czy klikniete
czy nie..

Tu chyba tez jakis listener na zaznaczenie/odznaczenie kolka zeby calosc stanu nadpisac
przy kazdej modyfikacji (mutation Observer? listener na custom event?)
*/

export class YearManager {
	constructor(date) {
		this.currentYear = date.getFullYear();
	}

	init() {}
}

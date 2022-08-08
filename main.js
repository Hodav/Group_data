
button_start.onclick = function(){
	// создание массива из данных таблицы
let arrTable = [
			[document.getElementById("1a").value,document.getElementById("1b").value,document.getElementById("1c").value,document.getElementById("1d").value,document.getElementById("1e").value],
			[document.getElementById("2a").value,document.getElementById("2b").value,document.getElementById("2c").value,document.getElementById("2d").value,document.getElementById("2e").value],
			[document.getElementById("3a").value,document.getElementById("3b").value,document.getElementById("3c").value,document.getElementById("3d").value,document.getElementById("3e").value],
			[document.getElementById("4a").value,document.getElementById("4b").value,document.getElementById("4c").value,document.getElementById("4d").value,document.getElementById("4e").value],
			[document.getElementById("5a").value,document.getElementById("5b").value,document.getElementById("5c").value,document.getElementById("5d").value,document.getElementById("5e").value],
			[document.getElementById("6a").value,document.getElementById("6b").value,document.getElementById("6c").value,document.getElementById("6d").value,document.getElementById("6e").value],
			[document.getElementById("7a").value,document.getElementById("7b").value,document.getElementById("7c").value,document.getElementById("7d").value,document.getElementById("7e").value],
			[document.getElementById("8a").value,document.getElementById("8b").value,document.getElementById("8c").value,document.getElementById("8d").value,document.getElementById("8e").value],
			[document.getElementById("9a").value,document.getElementById("9b").value,document.getElementById("9c").value,document.getElementById("9d").value,document.getElementById("9e").value],
			[document.getElementById("10a").value,document.getElementById("10b").value,document.getElementById("10c").value,document.getElementById("10d").value,document.getElementById("10e").value]
		   ];
		   
let arrTable_group = [0,0,0,0,0,0,0,0,0,0],// создание паралельного массива для отметки группирования
	 arrTable_col = [1,1,1,1,1];//создание массива для отметки колонок не использующихся при группировке

	// получение данных из выпадающих списков
let arrRequirement = [document.getElementById("select1").value,document.getElementById("select2").value,document.getElementById("select3").value,document.getElementById("select4").value,document.getElementById("select5").value]
	
function comparingRows() { 		//функция сравнивания и групировки строк
	let pass = 0, // счетчик сравнивания ячеек для группировки
		 criterion = 0; // количество критериев

	for (var s = 0; s < arrTable.length-1; s++) {	//Берется одна строка
		if(arrTable_group[s]==0){//вхождение только при условии что строка еще не сгруппированна
			arrTable_group[s] = 1;
			for (var i = s+1; i <= arrTable.length-1; i++) { // Сравнивается со всеми последующими
				if(arrTable_group[i]==0){//вхождение только при условии что строка еще не сгруппированна
					
					for (var j = 0; j < arrTable[0].length; j++) { // Сравнивание параллельных ячеек
						
						if ((arrRequirement[j] == "criterion")&&(arrTable[s][j] == arrTable[i][j])||(arrRequirement[j] != "criterion")){
							pass++;
							if(arrRequirement[j] == "criterion") criterion++;
						}
						
					}
					if (pass == arrRequirement.length && criterion>0){
						arrTable_group[i] = 2; // отмечаем строку проверенной и состоящей в группе
						for (var iArrRequirement = 0; iArrRequirement < arrRequirement.length; iArrRequirement++) {
							if(arrRequirement[iArrRequirement] == "sum") {
								let sum =  Number(arrTable[s][iArrRequirement]) + Number(arrTable[i][iArrRequirement]);
								arrTable[s][iArrRequirement] = sum;
							}
							if(arrRequirement[iArrRequirement] == "max") {
								if (Number(arrTable[s][iArrRequirement]) < Number(arrTable[i][iArrRequirement])) arrTable[s][iArrRequirement] = arrTable[i][iArrRequirement];
							}
							if(arrRequirement[iArrRequirement] == "min") {
								if (Number(arrTable[s][iArrRequirement]) > Number(arrTable[i][iArrRequirement])) arrTable[s][iArrRequirement] = arrTable[i][iArrRequirement];
							}
							if(arrRequirement[iArrRequirement] == "concatenation") {
								arrTable[s][iArrRequirement] += arrTable[i][iArrRequirement];
							}


						}
					}
					pass = 0;
					criterion = 0;
				}
			}
		}
	}
	if(arrTable_group[arrTable_group.length-1] == 0) arrTable_group[arrTable_group.length-1] = 1; // в случае если последняя строка не группируется она становится отдельной группой

	for (var i = 0; i < arrRequirement.length; i++) { // отметка колонок не исользующихся в группировке 
		if(arrRequirement[i] == "skip") {
			arrTable_col[i] = 2;
		}
	}
}
comparingRows();
function outputOfRows(){
	//удаление предыдущей таблицы
	document.getElementById('answer').innerHTML = "";

	let outputMassage = document.createElement('div');
	outputMassage.innerHTML = "Результат";
	document.getElementById('answer').appendChild(outputMassage);

	let table = document.createElement('table'),
		 thead = document.createElement('thead'),
		 tbody = document.createElement('tbody');
	table.appendChild(thead);
	let tha = document.createElement('th'),
		 thb = document.createElement('th'),
		 thc = document.createElement('th'),
		 thd = document.createElement('th'),
		 the = document.createElement('th');
	for (var i = 0; i < arrTable_col.length; i++) {
		if(arrTable_col[i]==1)
		switch(i){
			case 0:tha.innerHTML = "A"; thead.appendChild(tha); break;
			case 1:thb.innerHTML = "B"; thead.appendChild(thb); break;
			case 2:thc.innerHTML = "C"; thead.appendChild(thc); break;
			case 3:thd.innerHTML = "D"; thead.appendChild(thd); break;
			case 4:the.innerHTML = "E"; thead.appendChild(the); break;
		}
	}
	
	table.appendChild(tbody);

	for (var i = 0; i < arrTable.length; i++) {
		if(arrTable_group[i]==1){
			let row = document.createElement('tr');
			for (var j = 0; j < arrTable[i].length; j++) {
				if(arrTable_col[j]==1){
					let data = document.createElement('td');
					data.innerHTML = arrTable[i][j];
					row.appendChild(data);
				}
			}
			tbody.appendChild(row);
		}
	}
	document.getElementById('answer').appendChild(table);
}
outputOfRows();
}

button_test.onclick = function(){
	document.getElementById("1a").value = 100;
	document.getElementById("1b").value = 25;
	document.getElementById("1c").value = 3;
	document.getElementById("1d").value = 16;
	document.getElementById("1e").value = 15;

	document.getElementById("2a").value = 200;
	document.getElementById("2b").value = 3;
	document.getElementById("2c").value = 3;
	document.getElementById("2d").value = 2;
	document.getElementById("2e").value = 1;

	document.getElementById("3a").value = 300;
	document.getElementById("3b").value = 3;
	document.getElementById("3c").value = 1;
	document.getElementById("3d").value = 1;
	document.getElementById("3e").value = 1;
	
	document.getElementById("4a").value = 100;
	document.getElementById("4b").value = 25;
	document.getElementById("4c").value = 3;
	document.getElementById("4d").value = 4;
	document.getElementById("4e").value = 52;
	
	document.getElementById("5a").value = 200;
	document.getElementById("5b").value = 3;
	document.getElementById("5c").value = 3;
	document.getElementById("5d").value = 2;
	document.getElementById("5e").value = 1;

	document.getElementById("6a").value = 300;
	document.getElementById("6b").value = 3;
	document.getElementById("6c").value = 1;
	document.getElementById("6d").value = 1;
	document.getElementById("6e").value = 1;

	document.getElementById("7a").value = 100;
	document.getElementById("7b").value = 25;
	document.getElementById("7c").value = 3;
	document.getElementById("7d").value = 5;
	document.getElementById("7e").value = 53;

	document.getElementById("8a").value = 200;
	document.getElementById("8b").value = 3;
	document.getElementById("8c").value = 3;
	document.getElementById("8d").value = 2;
	document.getElementById("8e").value = 1;
	
	document.getElementById("9a").value = 300;
	document.getElementById("9b").value = 3;
	document.getElementById("9c").value = 1;
	document.getElementById("9d").value = 1;
	document.getElementById("9e").value = 1;
	
	document.getElementById("10a").value = 100;
	document.getElementById("10b").value = 25;
	document.getElementById("10c").value = 3;
	document.getElementById("10d").value = 20;
	document.getElementById("10e").value = 101;

	document.querySelector("#select1").value = "criterion";
	document.querySelector("#select2").value = "sum";
	document.querySelector("#select3").value = "criterion";
	document.querySelector("#select4").value = "skip";
	document.querySelector("#select5").value = "concatenation";
}

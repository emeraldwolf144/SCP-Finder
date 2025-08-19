const uiLang = chrome.i18n.getUILanguage(); 

const scpInput = document.getElementById("scpNumber");
const findButton = document.getElementById('findButton');
console.log("Detected UI language:", uiLang);

var scpNumber = scpInput.value;
var wiki_branch;

document.getElementById('title').textContent = chrome.i18n.getMessage('ext_name');
scpInput.textContent = chrome.i18n.getMessage('scp_input_placeholder');
findButton.textContent = chrome.i18n.getMessage('find_button');

scpInput.focus();

if (uiLang.startsWith('ja')) {
	wiki_branch = "http://scp-jp.wikidot.com/scp-"
} else if (uiLang.startsWith('es')) {
	wiki_branch = 'https://lafundacionscp.wikidot.com/scp-';
} else {
	wiki_branch = "http://scp-wiki.wikidot.com/scp-"
}

function fixInputNumber(input) {
	const stringInput = Number(input).toString();
	
	return stringInput.padStart(3, '0');
}

scpInput.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        goToSCP();
    }
})

function goToSCP() {
	//Updates scpNumber var
	scpNumber = scpInput.value;
	
	console.log("SCP " + fixInputNumber(scpNumber));
	window.open(wiki_branch+fixInputNumber(scpNumber));
}

findButton.addEventListener("click", function() {
	goToSCP();
});

//stops non-number input
scpInput.addEventListener('input', e=> {
	e.target.value = e.target.value.replace(/\D+/g, '')
});

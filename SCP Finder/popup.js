const uiLang = chrome.i18n.getUILanguage(); 

const scpInput = document.getElementById("scpNumber");
const findButton = document.getElementById('findButton');
const findOtherLangButton1 = document.getElementById('findOtherLangButton1');
const findOtherLangButton2 = document.getElementById('findOtherLangButton2');
console.log("Detected UI language:", uiLang);

var scpNumber = scpInput.value;
var wiki_branch;

document.getElementById('title').textContent = chrome.i18n.getMessage('ext_name');
scpInput.textContent = chrome.i18n.getMessage('scp_input_placeholder');
findButton.textContent = chrome.i18n.getMessage('find_button');
findOtherLangButton1.textContent = chrome.i18n.getMessage('find_other_lang_1_button');
findOtherLangButton2.textContent = chrome.i18n.getMessage('find_other_lang_2_button');

scpInput.focus();

if (uiLang.startsWith('ja')) {
	wiki_branch = "http://scp-jp.wikidot.com/scp-"
} else if (uiLang.startsWith('es')) {
	wiki_branch = 'https://lafundacionscp.wikidot.com/scp-';
} else {
	wiki_branch = "https://scp-wiki.wikidot.com/scp-"
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

function goToSCP(_wiki) {
	//Updates scpNumber var
	scpNumber = scpInput.value;
	
	console.log("SCP " + fixInputNumber(scpNumber));
	window.open(_wiki+fixInputNumber(scpNumber));
}

findButton.addEventListener("click", function() {
	goToSCP(wiki_branch);
});

findOtherLangButton1.addEventListener("click", function() {
	let otherWiki = "";
	if (uiLang.startsWith('en')) {
		otherWiki = "https://lafundacionscp.wikidot.com/scp-"
	} else {
		otherWiki = "https://scp-wiki.wikidot.com/scp-";
	}
	goToSCP(otherWiki);
});
findOtherLangButton2.addEventListener("click", function() {
	let otherWiki = "";
	if (uiLang.startsWith('ja')) {
		otherWiki = "https://lafundacionscp.wikidot.com/scp-"
	} else {
		otherWiki = "http://scp-jp.wikidot.com/scp-";
	}
	goToSCP(otherWiki);
});

//stops non-number input
scpInput.addEventListener('input', e=> {
	e.target.value = e.target.value.replace(/\D+/g, '')
});

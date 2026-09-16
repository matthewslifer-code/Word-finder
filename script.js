const WORDS = [
"able","about","above","acid","across","act","active","add","after","again","age","ago","air","all","also","and","any","apple","area","arm","art","as","ask","at","away",
"back","bad","bag","ball","bank","base","be","bear","beat","beauty","bed","bee","been","before","best","better","big","bird","bit","black","blue","boat","body","book","box","boy","break","bring","brother","build","bus","buy",
"call","came","can","car","care","carry","case","cat","cause","cell","change","check","child","city","class","clean","clear","close","cold","come","common","company","could","country","course","cover","create","cut",
"dark","day","deal","deep","did","different","do","dog","door","down","draw","dream","drive","dry","during",
"each","early","earth","east","easy","eat","edge","eight","else","end","enough","even","ever","every","example","eye",
"face","fact","fall","family","far","fast","father","feel","few","field","find","fine","fire","first","fish","five","food","for","form","found","four","free","friend","from","full","fun",
"game","gave","get","girl","give","go","good","great","green","group","grow",
"had","half","hand","happen","happy","hard","has","have","he","head","hear","help","her","here","high","him","his","home","hope","hot","house","how",
"I","idea","if","important","in","include","into","is","it","its",
"job","just","keep","kind","know",
"land","large","last","late","later","laugh","learn","leave","left","less","let","letter","life","light","like","line","little","live","long","look","love","low",
"made","make","man","many","may","me","mean","meet","men","might","mile","mind","minute","miss","money","more","most","mother","move","much","must","my",
"name","near","need","never","new","next","night","no","not","now","number",
"of","off","often","old","on","once","one","only","open","or","order","other","our","out","over","own",
"part","people","place","play","point","put",
"question","quick","quite",
"read","real","red","remember","right","road","room","run",
"said","same","saw","say","school","second","see","seem","set","seven","she","should","show","side","simple","since","six","small","so","some","something","sometimes","song","soon","sound","south","start","state","still","stop","story","street","such","sure",
"take","talk","tell","ten","than","that","the","their","them","then","there","these","they","thing","think","this","those","three","through","time","to","today","together","too","town","try","two",
"under","until","up","us","use",
"very",
"walk","want","was","water","way","we","well","went","were","what","when","where","which","while","who","why","will","with","without","woman","word","work","world","would","write",
"year","yes","you","young","your"
];

const lettersEl=document.getElementById("letters");
const minEl=document.getElementById("minLen");
const maxEl=document.getElementById("maxLen");
const resultsEl=document.getElementById("results");
const statusEl=document.getElementById("status");

function canMake(word, tiles){
  const counts={}; let blanks=0;
  for(const c of tiles){ if(c==="?") blanks++; else counts[c]=(counts[c]||0)+1; }
  const need={};
  for(const c of word){ need[c]=(need[c]||0)+1; }
  let missing=0;
  for(const c in need) missing += Math.max(0, need[c]-(counts[c]||0));
  return missing<=blanks && word.length<=tiles.length;
}
function findWords(){
  const tiles=lettersEl.value.toLowerCase().replace(/[^a-z?]/g,"");
  const min=+minEl.value,max=+maxEl.value;
  resultsEl.innerHTML="";
  if(!tiles){statusEl.textContent="Enter some letters to begin.";return;}
  const matches=WORDS.filter(w=>w.length>=min&&w.length<=max&&w.length<=tiles.length&&canMake(w,tiles))
    .sort((a,b)=>b.length-a.length||a.localeCompare(b));
  statusEl.textContent=`Found ${matches.length} word${matches.length===1?"":"s"} from your letters.`;
  if(!matches.length){resultsEl.innerHTML='<div class="group"><strong>No matches found.</strong><p>Try different letters, a blank tile (?) or a shorter minimum length.</p></div>';return;}
  for(let len=max;len>=min;len--){
    const group=matches.filter(w=>w.length===len);
    if(!group.length) continue;
    const div=document.createElement("div");div.className="group";
    div.innerHTML=`<h2>${len}-letter words</h2><div class="words">${group.map(w=>`<span class="word">${w}</span>`).join("")}</div>`;
    resultsEl.appendChild(div);
  }
}
document.getElementById("findBtn").addEventListener("click",findWords);
lettersEl.addEventListener("keydown",e=>{if(e.key==="Enter")findWords()});

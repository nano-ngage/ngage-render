
function getSwears(){
    return ['abuse','abusing','anal','analbeads','ass','assfuck','asshole','bastard','bdsm','bitch','bj','blowjob','buttplug','canabis','choke','choking','clit','clitoris','cocaine','cock','cuc','cum','cunt','dick','dickhead','dickmuncher','dicksucker','dicksucking','dildo','dyke','fag', 'faggot','fanny','fannymonster','fannymuncher','fingering','fist','fisting','fuck','fucking','fuckton','fucktonne','führer','hitler','holocaust','jerk','jackoff','kiddy','kiddyfiddler','kill','killing','marijuana','masochism','masochist','murder','murdering','nazi','nigga','nigger','nob','nobhead','nobsucker','pedo','pedophile','penis','porn','pussy','pussymonster','pussymuncher','prick','rape','raping','rapist','sadism','sadist','sadomasochism','sex','sext','sexting','shit','shithouse','shitting','slut','smells','stab','stabbing','suck','sux','tits','titsucker','titsucking','titty','tittyfidler','twat','twatmuncher','vagina','wank','wanker','weed','whore','wrist','4ck','4cking','4q','retard','midget','bang','gang','kkk','sperm','semen','genitalia','fudgepacker','butt','prostitute','slut','skank','thot']
}

function getExceptions(){
    return ['operating','including','following','beginning','watching','training','thinking','teaching','starting','standing','spending','speaking','somthing','shopping','planning','painting','offering','makering','learning','fighting','existing','changing','carrying','building','becoming','anything','writing','working','wedding','warning','walking','turning','trading','thanked','testing','telling','talking','sitting','showing','setting','sending','selling','running','reading','putting','playing','opening','nothing','morning','meeting','meaning','looking','leaving','leading','keeping','housing','holding','helping','hearing','growing','getting','getting','funding','fishing','finding','evening','driving','dealing','cutting','trying','taking','string','spring','seeing','seeing','saying','saving','moving','making','living','having','giving','eating','during','coming','asking','while','water','using','thing','hitch','going','doing','crane','bring','being','torn','that','that','such','ripe','ring','king','corn','sum','job']
}

function wagnerFischer(str1,str2){
    if(typeof(str1) != 'string' || typeof(str2) != 'string') throw new Error('isProfanity Error: Both str1 and str2 must both be strings...');
    var dist = [];
    for(var i = 0; i < str1.length+1; ++i)
        dist[i] = [i];
    for(var i = 0; i < str2.length+1; ++i)
        dist[0][i] = i
    for (var t = 1; t < str2.length+1; ++t)
        for (var i = 1; i < str1.length+1; ++i)
            dist[i][t] = str1[i - 1] === str2[t - 1] ? dist[i-1][t-1] :
                Math.min.apply(Math, [dist[i-1] [t]+1,dist[i] [t-1]+1,dist[i-1] [t-1]+1
                ]);
    return dist[str1.length][str2.length];
}

export default function isProfanity(string){
    if(typeof(string) != 'string') throw new Error('isProfanity Error: The var \'string\' is not a String...');
    var containsASwear = false;
    var swears = getSwears();
    var exceptions = getExceptions();
    var strings = string.split(' ');
    strings.forEach(function(word) {
        swears.forEach(function(swear) {
            var x = wagnerFischer(swear.toLowerCase(),word.toLowerCase());
            if(x < (swear.length/2) && exceptions.indexOf(word.toLowerCase()) === -1){
                containsASwear = true;
            }
        }, this);
    }, this);
    return containsASwear;
}


const api = 'insert dev api here';
let ddragonVersion = '';

export async function getUserBySummonerName(name) {
    validateVersion();
    return (await fetch(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${api}`)).json();
}

export async function getIconById(id) {
    validateVersion();
    return (await fetch(`http://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/27.png`));
}

export async function getMatchById(id) {
    validateVersion();
    return (await fetch(`https://eun1.api.riotgames.com/lol/match/v4/matches/${id}?api_key=${api}`)).json();
}

export async function getMatchesByEncAccId(id) {
    validateVersion();
    return (await fetch(`https://eun1.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?api_key=${api}`)).json();
}

export async function getChampionById(id) {
    validateVersion();
    return (await fetch(`http://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion.json`)).json();
}

export async function setMostRecentVersion() {
    ddragonVersion = await getMostRecentDdragonVersion();
}

async function getMostRecentDdragonVersion() {
    const allVersions = await (await fetch('https://ddragon.leagueoflegends.com/api/versions.json')).json();
    const mostRecentVersion = allVersions[0];
    return mostRecentVersion;
}

function validateVersion() {
    if (ddragonVersion === '') {
        setMostRecentVersion();
    }
}
const api = 'insert dev api here';


export async function getUserBySummonerName(name) {
    return (await fetch(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${api}`)).json();
}

export async function getIconById(id) {
    return (await fetch(`http://ddragon.leagueoflegends.com/cdn/9.3.1/img/profileicon/27.png`));
}

export async function getMatchById(id) {
    return (await fetch(`https://eun1.api.riotgames.com/lol/match/v4/matches/${id}?api_key=${api}`)).json();
}

export async function getMatchesByEncAccId(id) {
    return (await fetch(`https://eun1.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?api_key=${api}`)).json();
}

export async function getChampionById(id) {
    return (await fetch(`http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json`)).json();
}
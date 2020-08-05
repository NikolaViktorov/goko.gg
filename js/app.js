import { setMostRecentVersion, getChampionById, getUserBySummonerName, getIconById, getMatchesByEncAccId, getMatchById } from './data.js';
import el from './dom.js';

window.addEventListener('load', () => {
    const infoEl = document.getElementById('info');
    const nameInputEl = document.getElementById('name');
    const playersEl = document.getElementById('players');
    const championsEl = document.getElementById('champions');
    const containerEl = document.getElementById('container');
    const loadingEl = document.getElementById('loading');
    const numberGamesInputEl = document.getElementById('numberGames');
    
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', renderData)
    
    async function renderData(e) {
        e.preventDefault();

        try {
            loadingEl.classList.remove('hidden');
            containerEl.innerHTML = '';
            submitBtn.disabled = true;
            const data = await getUserBySummonerName(nameInputEl.value);
            const matches = await getMatchesByEncAccId(data.accountId);

            const lastTenMatches = [];
            for (let i = 0; i < 10; i++) {
                lastTenMatches[i] = matches.matches[i];
            }

            for (let i = 0; i < +numberGamesInputEl.value; i++) {
                const data = await getMatchData(lastTenMatches[i].gameId);

                while (data.champNames.length < 10) {
                    data.champNames.push('Version for Champion Finder too old!')
                }

                const table = createTable(data.names, data.champNames,
                     data.profileIconIds, data.firstTeamState,
                      data.secondTeamState);
                containerEl.appendChild(table);
            }     
        } catch (error) {
            console.error(error);
        } finally {
            loadingEl.classList.add('hidden');
            submitBtn.disabled = false;
        }
    }
});

function createTable(names, champNames, profileIconIds, stateFirstTeam, stateSecondTeam) {
    function getIconUrl(id) {
        return `http://ddragon.leagueoflegends.com/cdn/10.15.1/img/profileicon/${id}.png`;
    }

    function getChampionIconUrl(name) {
        return `http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${name}.png`
    }

    // Fuction to format champ name for url -> Kai'sa = Kaisa / Jarvan IV = JarvanIV / Nunu & Willump = Nunu
    // Function for creating the parts of the table which repeat

    const inn = [
        el('tr', [
            el('th', `${stateFirstTeam === 'Fail' ? 'Defeat' : 'Victory'}`, { className: stateFirstTeam}),
            el('th', '', { className: stateFirstTeam}),
            el('th', ''),
            el('th', `${stateSecondTeam === 'Fail' ? 'Defeat' : 'Victory'}`, { className: stateSecondTeam}),
            el('th', ``, { className: stateSecondTeam}),
        ]),
        el('tr', [
            el('th', 'Player Names'),
            el('th', 'Champ Names'),
            el('th', ' '),
            el('th', 'Player Names'),
            el('th', 'Champ Names'),
        ]),
        el('tr', [
            el('td', [
                el('img', '', { src: getIconUrl(profileIconIds[0]), className: 'playerIcon'}),
                names[0]
            ]),
            el('td', [
                el('img', '', { src: getChampionIconUrl(champNames[0].split(' ').join('')), className: 'playerIcon'}),
                champNames[0]
            ]),
            el('td', ' '),
            el('td', [
                el('img', '', { src: getIconUrl(profileIconIds[5]), className: 'playerIcon'}),
                names[5]
            ]),
            el('td', [
                el('img', '', { src: getChampionIconUrl(champNames[5].split(' ').join('')), className: 'playerIcon'}),
                champNames[5]
            ]),
        ]),
        el('tr', [
            el('td', [
                el('img', '', { src: getIconUrl(profileIconIds[1]), className: 'playerIcon'}),
                names[1]
            ]),
            el('td', [
                el('img', '', { src: getChampionIconUrl(champNames[1].split(' ').join('')), className: 'playerIcon'}),
                champNames[1]
            ]),
            el('td', ' '),
            el('td', [
                el('img', '', { src: getIconUrl(profileIconIds[6]), className: 'playerIcon'}),
                names[6]
            ]),
            el('td', [
                el('img', '', { src: getChampionIconUrl(champNames[6].split(' ').join('')), className: 'playerIcon'}),
                champNames[6]
            ]),
        ]),
        el('tr', [
            el('td', [
                el('img', '', { src: getIconUrl(profileIconIds[2]), className: 'playerIcon'}),
                names[2]
            ]),
            el('td', [
                el('img', '', { src: getChampionIconUrl(champNames[2].split(' ').join('')), className: 'playerIcon'}),
                champNames[2]
            ]),
            el('td', ' '),
            el('td', [
                el('img', '', { src: getIconUrl(profileIconIds[7]), className: 'playerIcon'}),
                names[7]
            ]),
            el('td', [
                el('img', '', { src: getChampionIconUrl(champNames[7].split(' ').join('')), className: 'playerIcon'}),
                champNames[7]
            ]),
        ]),
        el('tr', [
            el('td', [
                el('img', '', { src: getIconUrl(profileIconIds[3]), className: 'playerIcon'}),
                names[3]
            ]),
            el('td', [
                el('img', '', { src: getChampionIconUrl(champNames[3].split(' ').join('')), className: 'playerIcon'}),
                champNames[3]
            ]),
            el('td', ' '),
            el('td', [
                el('img', '', { src: getIconUrl(profileIconIds[8]), className: 'playerIcon'}),
                names[8]
            ]),
            el('td', [
                el('img', '', { src: getChampionIconUrl(champNames[8].split(' ').join('')), className: 'playerIcon'}),
                champNames[8]
            ]),
        ]),
        el('tr', [
            el('td', [
                el('img', '', { src: getIconUrl(profileIconIds[4]), className: 'playerIcon'}),
                names[4]
            ]),
            el('td', [
                el('img', '', { src: getChampionIconUrl(champNames[4].split(' ').join('')), className: 'playerIcon'}),
                champNames[4]
            ]),
            el('td', ' '),
            el('td', [
                el('img', '', { src: getIconUrl(profileIconIds[9]), className: 'playerIcon'}),
                names[9]
            ]),
            el('td', [
                el('img', '', { src: getChampionIconUrl(champNames[9].split(' ').join('')), className: 'playerIcon'}),
                champNames[9]
            ]),
        ])];
    const table = el('table', inn);

    return table;
}

async function getMatchData(gameId) {
        const match = await getMatchById(gameId);

        const firstTeamState = match.teams[0].win;
        const secondTeamState = match.teams[1].win;

        const participants = match.participants;
        participants.sort(p => p.participantId);

        const participantIdentities = match.participantIdentities;
        participantIdentities.sort(p => p.participantId);

        const profileIconIds = [];
        const names = [];
        participantIdentities.forEach(p => {
            profileIconIds.push(p.player.profileIcon);
            const id = p.participantId;
            let largestMultiKill = '';
            switch(participants[id - 1].stats.largestMultiKill) {
                case 2: largestMultiKill = 'Double Kill';
                break;
                case 3: largestMultiKill = 'Triple Kill';
                break;
                case 4: largestMultiKill = 'Quadra Kill';
                break;
                case 5: largestMultiKill = 'Penta Kill';
                break;
                case 6: largestMultiKill = 'Hexa Kill';
            }
            names.push(p.player.summonerName + ` ${participants[id - 1].stats.kills}`
            + `/${participants[id - 1].stats.deaths}` + `/${participants[id - 1].stats.assists}` +
            `${largestMultiKill !== '' ? ` ${largestMultiKill}` : ''}`);
        });

        const champIds = [];
        participants.forEach(p => {
            champIds.push(p.championId);
        })

        const champions = await getChampions(champIds);
        const champNames = [];
        champions.forEach(c => {
            champNames.push(c.name);
        });

        return {
            names,
            champNames,
            profileIconIds,
            firstTeamState,
            secondTeamState
        }
}

async function getChampions(ids) {
    const champs = [];

    let f = 0;
    for (let id of ids) {
        const list = await getChampionById(id);
        const champList = list.data;
    
        for (let i in champList) {
            if (champList[i].key == id) {
               champs[f] = champList[i]; 
               f++;
               break;
            }
            if (champList[i].key === '143') {
                champs[f] = { name: 'Not Found yet!' };
                f++;
            }
        }
    }
    return champs;
}
// Configuration
const CONFIG = {
    topembedApis: {
        nfl: 'https://topembed.pw/api.php?format=json&sport=American+Football&tournament=NFL',
        nba: 'https://topembed.pw/api.php?format=json&sport=Basketball&tournament=NBA',
        mlb: 'https://topembed.pw/api.php?format=json&sport=Baseball&tournament=MLB',
        nhl: 'https://topembed.pw/api.php?format=json&sport=Ice+Hockey&tournament=NHL',
        soccer: 'https://topembed.pw/api.php?format=json&sport=Football',
        cfb: 'https://topembed.pw/api.php?format=json&sport=American+Football&tournament=NCAA',
        mma: 'https://topembed.pw/api.php?format=json&sport=MMA',
        boxing: 'https://topembed.pw/api.php?format=json&sport=Boxing'
    },
    leagues: ['nfl', 'nba', 'mlb', 'nhl', 'soccer', 'cfb', 'mma', 'boxing']
};

// Global Variables
let currentSection = 'home';
let currentDateOffset = 0;
let allEvents = [];

// MANUAL EVENTS DATA
const MANUAL_EVENTS = {
    nfl: [
        {
            id: 'nfl_1',
            title: "Kansas City Chiefs vs Buffalo Bills",
            time: "8:20 PM",
            league: "NFL",
            status: "live",
            date: new Date(),
            isLive: true,
            isUpcoming: false,
            homeTeam: {
                name: "Buffalo Bills",
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png",
                score: "24"
            },
            awayTeam: {
                name: "Kansas City Chiefs",
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png",
                score: "21"
            },
            channels: [
                { name: "NFL Network", embedUrl: "https://topembed.pw/channel/nfl", quality: "HD" },
                { name: "CBS Sportas", embedUrl: "https://topembed.pw/channel/cbs", quality: "720p" }
            ]
        },
        {
            id: 'nfl_2',
            title: "Dallas Cowboys vs Philadelphia Eagles",
            time: "4:25 PM",
            league: "NFL",
            status: "upcoming",
            date: new Date(Date.now() + 2 * 60 * 60 * 1000),
            isLive: false,
            isUpcoming: true,
            homeTeam: {
                name: "Philadelphia Eagles",
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png",
                score: "0"
            },
            awayTeam: {
                name: "Dallas Cowboys",
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png",
                score: "0"
            },
            channels: [
                { name: "FOX Sports", embedUrl: "https://topembed.pw/channel/fox", quality: "HD" }
            ]
        }
    ],

    nba: [
       {
    id: "nba_1",
    title: "San Antonio Spurs vs Miami Heat",
    time: "4:30 AM ET",
    league: "NBA",
    status: "upcoming",
    date: new Date("2025-10-08T04:30:00-04:00"),
    isLive: false,
    isUpcoming: true,
    homeTeam: {
      name: "Miami Heat",
      logo: "https://a.espncdn.com/i/teamlogos/nba/500/mia.png",
      score: "0"
    },
    awayTeam: {
      name: "San Antonio Spurs",
      logo: "https://a.espncdn.com/i/teamlogos/nba/500/sa.png",
      score: "0"
    },
    channels: [
      { name: "ESPN", embedUrl: "https://topembed.pw/channel/espn", quality: "HD" },
      { name: "NBA TV", embedUrl: "https://topembed.pw/channel/nbatv", quality: "720p" }
    ]
  },
  {
    id: "nba_2",
    title: "Utah Jazz vs Houston Rockets",
    time: "5:00 AM ET",
    league: "NBA",
    status: "upcoming",
    date: new Date("2025-10-08T05:00:00-04:00"),
    isLive: false,
    isUpcoming: true,
    homeTeam: {
      name: "Houston Rockets",
      logo: "https://a.espncdn.com/i/teamlogos/nba/500/hou.png",
      score: "0"
    },
    awayTeam: {
      name: "Utah Jazz",
      logo: "https://a.espncdn.com/i/teamlogos/nba/500/utah.png",
      score: "0"
    },
    channels: [
      { name: "TNT", embedUrl: "https://topembed.pw/channel/tnt", quality: "HD" }
    ]
  },
  {
    id: "nba_3",
    title: "Boston Celtics vs Memphis Grizzlies",
    time: "5:00 AM ET",
    league: "NBA",
    status: "upcoming",
    date: new Date("2025-10-08T05:00:00-04:00"),
    isLive: false,
    isUpcoming: true,
    homeTeam: {
      name: "Memphis Grizzlies",
      logo: "https://a.espncdn.com/i/teamlogos/nba/500/mem.png",
      score: "0"
    },
    awayTeam: {
      name: "Boston Celtics",
      logo: "https://a.espncdn.com/i/teamlogos/nba/500/bos.png",
      score: "0"
    },
    channels: [
      { name: "ABC", embedUrl: "https://topembed.pw/channel/abc", quality: "HD" }
    ]
  },
  {
    id: "nba_4",
    title: "Portland Trail Blazers vs Golden State Warriors",
    time: "7:00 AM ET",
    league: "NBA",
    status: "upcoming",
    date: new Date("2025-10-08T07:00:00-04:00"),
    isLive: false,
    isUpcoming: true,
    homeTeam: {
      name: "Golden State Warriors",
      logo: "https://a.espncdn.com/i/teamlogos/nba/500/gs.png",
      score: "0"
    },
    awayTeam: {
      name: "Portland Trail Blazers",
      logo: "https://a.espncdn.com/i/teamlogos/nba/500/por.png",
      score: "0"
    },
    channels: [
      { name: "ESPN", embedUrl: "https://topembed.pw/channel/espn", quality: "HD" }
    ]
  },
  {
    id: "nba_5",
    title: "Toronto Raptors vs Sacramento Kings",
    time: "7:00 AM ET",
    league: "NBA",
    status: "upcoming",
    date: new Date("2025-10-08T07:00:00-04:00"),
    isLive: false,
    isUpcoming: true,
    homeTeam: {
      name: "Sacramento Kings",
      logo: "https://a.espncdn.com/i/teamlogos/nba/500/sac.png",
      score: "0"
    },
    awayTeam: {
      name: "Toronto Raptors",
      logo: "https://a.espncdn.com/i/teamlogos/nba/500/tor.png",
      score: "0"
    },
    channels: [
      { name: "NBA TV", embedUrl: "https://topembed.pw/channel/nbatv", quality: "HD" }
    ]
  }
    ],

    mlb: [
        {
            id: 'mlb_1',
            title: "New York Yankees vs Boston Red Sox",
            time: "7:10 PM",
            league: "MLB",
            status: "upcoming",
            date: new Date(Date.now() + 3 * 60 * 60 * 1000),
            isLive: false,
            isUpcoming: true,
            homeTeam: {
                name: "Boston Red Sox",
                logo: "https://a.espncdn.com/i/teamlogos/mlb/500/bos.png",
                score: "0"
            },
            awayTeam: {
                name: "New York Yankees",
                logo: "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
                score: "0"
            },
            channels: [
                { name: "MLB Network", embedUrl: "https://topembed.pw/channel/mlb", quality: "HD" }
            ]
        }
    ],

    soccer: [
        {
            id: 'soccer_1',
            title: "Manchester United vs Liverpool",
            time: "3:00 PM",
            league: "SOCCER",
            status: "upcoming",
            date: new Date(Date.now() + 24 * 60 * 60 * 1000),
            isLive: false,
            isUpcoming: true,
            homeTeam: {
                name: "Liverpool",
                logo: "https://a.espncdn.com/i/teamlogos/soccer/500/364.png",
                score: "0"
            },
            awayTeam: {
                name: "Manchester United",
                logo: "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
                score: "0"
            },
            channels: [
                { name: "Sky Sports", embedUrl: "https://topembed.pw/channel/skysports", quality: "HD" },
                { name: "NBC Sports", embedUrl: "https://topembed.pw/channel/nbc", quality: "720p" }
            ]
        }
    ],

    nhl: [
          {
    id: "nhl_1",
    title: "Montreal Canadiens vs Toronto Maple Leafs",
    time: "4:00 AM ET",
    league: "NHL",
    status: "upcoming",
    date: new Date("2025-10-08T04:00:00-04:00"),
    isLive: false,
    isUpcoming: true,
    homeTeam: {
      name: "Toronto Maple Leafs",
      logo: "https://a.espncdn.com/i/teamlogos/nhl/500/tor.png",
      score: "0"
    },
    awayTeam: {
      name: "Montreal Canadiens",
      logo: "https://a.espncdn.com/i/teamlogos/nhl/500/mtl.png",
      score: "0"
    },
    channels: [
      { name: "ESPN+", embedUrl: "https://topembed.pw/channel/espnplus", quality: "HD" },
      { name: "NHL Network", embedUrl: "https://topembed.pw/channel/nhl", quality: "720p" }
    ]
  },
  {
    id: "nhl_2",
    title: "Boston Bruins vs Washington Capitals",
    time: "4:30 AM ET",
    league: "NHL",
    status: "upcoming",
    date: new Date("2025-10-08T04:30:00-04:00"),
    isLive: false,
    isUpcoming: true,
    homeTeam: {
      name: "Washington Capitals",
      logo: "https://a.espncdn.com/i/teamlogos/nhl/500/wsh.png",
      score: "0"
    },
    awayTeam: {
      name: "Boston Bruins",
      logo: "https://a.espncdn.com/i/teamlogos/nhl/500/bos.png",
      score: "0"
    },
    channels: [
      { name: "TNT", embedUrl: "https://topembed.pw/channel/tnt", quality: "HD" }
    ]
  },
  {
    id: "nhl_3",
    title: "Calgary Flames vs Edmonton Oilers",
    time: "7:00 AM ET",
    league: "NHL",
    status: "upcoming",
    date: new Date("2025-10-08T07:00:00-04:00"),
    isLive: false,
    isUpcoming: true,
    homeTeam: {
      name: "Edmonton Oilers",
      logo: "https://a.espncdn.com/i/teamlogos/nhl/500/edm.png",
      score: "0"
    },
    awayTeam: {
      name: "Calgary Flames",
      logo: "https://a.espncdn.com/i/teamlogos/nhl/500/cgy.png",
      score: "0"
    },
    channels: [
      { name: "Sportsnet", embedUrl: "https://topembed.pw/channel/sportsnet", quality: "HD" }
    ]
  },
  {
    id: "nhl_4",
    title: "Los Angeles Kings vs Vegas Golden Knights",
    time: "7:00 AM ET",
    league: "NHL",
    status: "upcoming",
    date: new Date("2025-10-08T07:00:00-04:00"),
    isLive: false,
    isUpcoming: true,
    homeTeam: {
      name: "Vegas Golden Knights",
      logo: "https://a.espncdn.com/i/teamlogos/nhl/500/vgs.png",
      score: "0"
    },
    awayTeam: {
      name: "Los Angeles Kings",
      logo: "https://a.espncdn.com/i/teamlogos/nhl/500/la.png",
      score: "0"
    },
    channels: [
      { name: "ESPN", embedUrl: "https://topembed.pw/channel/espn", quality: "HD" }
    ]
  }
    ],

    cfb: [
        {
            id: 'cfb_1',
            title: "Alabama vs Georgia",
            time: "8:00 PM",
            league: "CFB",
            status: "upcoming",
            date: new Date(Date.now() + 48 * 60 * 60 * 1000),
            isLive: false,
            isUpcoming: true,
            homeTeam: {
                name: "Georgia Bulldogs",
                logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/61.png",
                score: "0"
            },
            awayTeam: {
                name: "Alabama Crimson Tide",
                logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/333.png",
                score: "0"
            },
            channels: [
                { name: "ESPN College", embedUrl: "https://topembed.pw/channel/espn", quality: "HD" }
            ]
        }
    ],

    mma: [
        {
            id: 'mma_1',
            title: "UFC 300: Main Event",
            time: "10:00 PM",
            league: "MMA",
            status: "upcoming",
            date: new Date(Date.now() + 72 * 60 * 60 * 1000),
            isLive: false,
            isUpcoming: true,
            homeTeam: {
                name: "Champion Fighter",
                logo: "https://a.espncdn.com/i/teamlogos/mma/500/default.png",
                score: "0"
            },
            awayTeam: {
                name: "Challenger Fighter",
                logo: "https://a.espncdn.com/i/teamlogos/mma/500/default.png",
                score: "0"
            },
            channels: [
                { name: "UFC PPV", embedUrl: "https://topembed.pw/channel/ufc", quality: "HD" }
            ]
        }
    ],

    boxing: [
        {
            id: 'boxing_1',
            title: "World Heavyweight Championship",
            time: "9:00 PM",
            league: "BOXING",
            status: "upcoming",
            date: new Date(Date.now() + 96 * 60 * 60 * 1000),
            isLive: false,
            isUpcoming: true,
            homeTeam: {
                name: "Champion Boxer",
                logo: "https://a.espncdn.com/i/teamlogos/boxing/500/default.png",
                score: "0"
            },
            awayTeam: {
                name: "Challenger Boxer",
                logo: "https://a.espncdn.com/i/teamlogos/boxing/500/default.png",
                score: "0"
            },
            channels: [
                { name: "DAZN", embedUrl: "https://topembed.pw/channel/dazn", quality: "HD" }
            ]
        }
    ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 SportStreams App Starting...');
    initializeApp();
});

function initializeApp() {
    console.log('✅ initializeApp() called');
    setupEventListeners();
    loadManualEvents();
    showSection('home');
    console.log('🎯 App Ready! Manual events loaded');
}

function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            console.log(`📱 Navigation: ${section}`);
            showSection(section);
        });
    });

    // Date Selector
    document.querySelectorAll('.date-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.date-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentDateOffset = parseInt(tab.getAttribute('data-date'));
            console.log(`📅 Date changed: ${currentDateOffset}`);
            filterEventsByDate();
        });
    });

    console.log('✅ Event listeners setup complete');
}

// MANUAL EVENTS LOAD KARNE WALA FUNCTION
function loadManualEvents() {
    console.log('📥 Loading manual events...');

    // Clear any existing events
    allEvents = [];

    let totalLoaded = 0;

    // Har league ke events add karo
    for (let league in MANUAL_EVENTS) {
        const leagueEvents = MANUAL_EVENTS[league];
        console.log(`➕ Adding ${leagueEvents.length} events for ${league}`);

        if (leagueEvents.length > 0) {
            allEvents = [...allEvents, ...leagueEvents];
            totalLoaded += leagueEvents.length;
        }
    }

    console.log(`✅ Total manual events loaded: ${totalLoaded}`);
    console.log('All events:', allEvents);
}

// FIXED DISPLAY LEAGUE EVENTS FUNCTION
function displayLeagueEvents(league, events) {
    console.log(`🎯 DisplayLeagueEvents called for: ${league}`);
    console.log(`Events to display:`, events);

    let container;

    if (league === 'home') {
        container = document.getElementById('home-events');
    } else {
        // DIRECT CONTAINER ACCESS - YEH FIX HAI
        container = document.getElementById(`${league}-events`);
        console.log(`Looking for container: ${league}-events`);
        console.log('Container found:', !!container);
    }

    if (!container) {
        console.error(`❌ Container not found for: ${league}`);
        return;
    }

    container.innerHTML = '';

    if (events.length === 0) {
        container.innerHTML = `
            <div class="no-events">
                <h3>No Events Available</h3>
                <p>Check back later for ${league.toUpperCase()} events.</p>
            </div>
        `;
        return;
    }

    events.forEach(event => {
        const eventCard = createEventCard(event);
        container.appendChild(eventCard);
    });

    console.log(`✅ Displayed ${events.length} events for ${league}`);
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.addEventListener('click', () => openChannelSelector(event));

    const time = formatEventTime(event.date);
    const channelCount = event.channels ? event.channels.length : 0;

    card.innerHTML = `
        <div class="event-header">
            <span class="event-sport">${event.league}</span>
            <span class="event-status status-${event.status}">${event.status.toUpperCase()}</span>
        </div>
        <div class="event-teams">
            <div class="team">
                <img src="${event.awayTeam.logo}" alt="${event.awayTeam.name}" class="team-logo" onerror="this.src='https://a.espncdn.com/i/teamlogos/league/500/default.png'">
                <div class="team-name">${event.awayTeam.name}</div>
                ${event.awayTeam.score ? `<div class="team-score">${event.awayTeam.score}</div>` : ''}
            </div>
            <div class="vs">VS</div>
            <div class="team">
                <img src="${event.homeTeam.logo}" alt="${event.homeTeam.name}" class="team-logo" onerror="this.src='https://a.espncdn.com/i/teamlogos/league/500/default.png'">
                <div class="team-name">${event.homeTeam.name}</div>
                ${event.homeTeam.score ? `<div class="team-score">${event.homeTeam.score}</div>` : ''}
            </div>
        </div>
        <div class="event-time">${time}</div>
        <div class="event-meta">
            <span>${getLeagueFullName(event.league)}</span>
            <span>📺 ${channelCount} Streams</span>
        </div>
    `;

    return card;
}

function openChannelSelector(event) {
    console.log(`🎬 Opening channel selector for: ${event.title}`);

    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #1a1f3d 0%, #0c0f1d 100%);
        padding: 2rem;
        border-radius: 15px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        border: 1px solid rgba(255,255,255,0.2);
    `;

    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h2 style="color: #ff6b35; margin: 0;">Watch Live Stream</h2>
            <button onclick="this.closest('.channel-modal').remove()" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">×</button>
        </div>
        
        <div style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <h3 style="margin: 0 0 0.5rem 0; color: white;">${event.title}</h3>
            <p style="margin: 0; color: #b0b7c8;">${formatEventTime(event.date)} • ${event.league}</p>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #4ecdc4; margin-bottom: 1rem;">Available Streams:</h4>
            <div id="channel-list" style="display: flex; flex-direction: column; gap: 0.5rem;"></div>
        </div>
        
        <div style="text-align: center; color: #b0b7c8; font-size: 0.9rem;">
            <p>Select a stream to start watching</p>
        </div>
    `;

    modal.appendChild(modalContent);
    modal.className = 'channel-modal';
    document.body.appendChild(modal);

    const channelList = document.getElementById('channel-list');
    if (event.channels && event.channels.length > 0) {
        event.channels.forEach((channel, index) => {
            const channelItem = document.createElement('div');
            channelItem.style.cssText = `
                padding: 1rem;
                background: rgba(255,255,255,0.1);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 1px solid rgba(255,255,255,0.2);
            `;
            channelItem.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: 600; color: white;">${channel.name}</div>
                        <div style="font-size: 0.8rem; color: #4ecdc4;">Quality: ${channel.quality}</div>
                    </div>
                    <button style="background: #ff6b35; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; font-weight: 600;">
                        Watch
                    </button>
                </div>
            `;

            channelItem.addEventListener('mouseenter', () => {
                channelItem.style.background = 'rgba(255,255,255,0.15)';
                channelItem.style.borderColor = '#ff6b35';
            });

            channelItem.addEventListener('mouseleave', () => {
                channelItem.style.background = 'rgba(255,255,255,0.1)';
                channelItem.style.borderColor = 'rgba(255,255,255,0.2)';
            });

            channelItem.addEventListener('click', () => {
                console.log(`📺 Stream selected: ${channel.name}`);
                openStreamWithChannel(event, channel);
                modal.remove();
            });

            channelList.appendChild(channelItem);
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function openStreamWithChannel(event, channel) {
    console.log(`🎥 Opening stream: ${channel.name}`);
    const streamPageUrl = createStreamPageUrl(event, channel);
    window.open(streamPageUrl, '_blank');
}

function openStreamWithChannel(event, channel) {
    console.log(`🎥 Opening stream: ${channel.name}`);

    // Combine event + channel details
    const streamData = {
        title: event.title,
        league: event.league,
        time: formatEventTime(event.date),
        status: event.status,
        channelName: channel.name,
        embedUrl: channel.embedUrl,
        quality: channel.quality
    };

    // Generate unique ID and store in localStorage
    const streamId = `${event.league}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(streamId, JSON.stringify(streamData));

    // Open short URL
    window.open(`stream.html?id=${streamId}`, "_blank");
}

// Helper functions
function formatEventTime(eventDate) {
    if (!eventDate) return 'Time TBD ET';

    try {
        return eventDate.toLocaleString('en-US', {
            weekday: 'short',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: 'America/New_York'
        }) + ' ET';
    } catch (error) {
        return 'Time TBD ET';
    }
}

function getLeagueFullName(leagueCode) {
    const leagues = {
        'NFL': 'National Football League',
        'NBA': 'National Basketball Association',
        'MLB': 'Major League Baseball',
        'NHL': 'National Hockey League',
        'SOCCER': 'International Soccer',
        'CFB': 'College Football',
        'MMA': 'Mixed Martial Arts',
        'BOXING': 'Professional Boxing'
    };

    return leagues[leagueCode] || leagueCode;
}

function isEventOnSelectedDate(eventDate) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + currentDateOffset);

    return eventDate.getDate() === targetDate.getDate() &&
        eventDate.getMonth() === targetDate.getMonth() &&
        eventDate.getFullYear() === targetDate.getFullYear();
}

function getDateDisplayText() {
    const dates = ['Today', 'Tomorrow', 'Day 3'];
    return dates[currentDateOffset] || 'Selected Date';
}

// FIXED SHOW SECTION FUNCTION
function showSection(sectionId) {
    console.log(`🔄 Showing section: ${sectionId}`);

    // Navigation active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionId) {
            item.classList.add('active');
        }
    });

    // Sections hide/show
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(`${sectionId}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log(`✅ Section activated: ${sectionId}-section`);
    } else {
        console.error(`❌ Section not found: ${sectionId}-section`);
    }

    currentSection = sectionId;
    filterEventsByDate();
}

// FIXED FILTER EVENTS FUNCTION
function filterEventsByDate() {
    console.log(`📅 Filtering events for: ${currentSection} on date offset: ${currentDateOffset}`);

    if (currentSection === 'home') {
        displayHomeEvents();
    } else {
        // CORRECT FILTERING - YEH FIX HAI
        const leagueEvents = allEvents.filter(event =>
            event.league.toLowerCase() === currentSection.toLowerCase() &&  // lowercase compare
            isEventOnSelectedDate(event.date)
        );
        console.log(`📊 Found ${leagueEvents.length} events for ${currentSection}`);
        console.log('Filtered events:', leagueEvents);
        displayLeagueEvents(currentSection, leagueEvents);
    }
}

// FIXED DISPLAY HOME EVENTS
function displayHomeEvents() {
    const container = document.getElementById('home-events');
    if (!container) {
        console.error('❌ Home events container not found');
        return;
    }

    const todayEvents = allEvents.filter(event => isEventOnSelectedDate(event.date));
    const mixedEvents = todayEvents.slice(0, 8);

    console.log(`🏠 Displaying ${mixedEvents.length} events for home`);

    container.innerHTML = '';

    if (mixedEvents.length === 0) {
        container.innerHTML = `
            <div class="no-events">
                <h3>No Events Today</h3>
                <p>No events found for ${getDateDisplayText()}.</p>
            </div>
        `;
        return;
    }

    mixedEvents.forEach(event => {
        const eventCard = createEventCard(event);
        container.appendChild(eventCard);
    });
}
// ✅ URL Navigation Enhancement (no reload, keeps your same logic)
document.addEventListener("DOMContentLoaded", () => {
    // Open correct section from URL
    const path = window.location.pathname.split("/").pop().toLowerCase();
    const validSections = ["home", "nfl", "nba", "mlb", "nhl", "soccer", "cfb", "mma", "boxing"];
    const sectionName = validSections.includes(path) ? path : "home";
    showSection(sectionName);
});

// ✅ Update URL when user clicks nav
document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", e => {
        e.preventDefault();
        const section = item.getAttribute("data-section");
        history.pushState(null, "", `/${section}`);
        showSection(section);
    });
});

// ✅ Handle Back/Forward browser buttons
window.addEventListener("popstate", () => {
    const path = window.location.pathname.split("/").pop().toLowerCase();
    const validSections = ["home", "nfl", "nba", "mlb", "nhl", "soccer", "cfb", "mma", "boxing"];
    const sectionName = validSections.includes(path) ? path : "home";
    showSection(sectionName);
});


console.log('✅ SportStreams Manual Schedule Loaded!');

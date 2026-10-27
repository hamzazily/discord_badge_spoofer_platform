export const sources = {
  official: 'https://support.discord.com/hc/en-us/articles/44369363856663-Discord-Profile-Badges-What-Each-Badge-Means',
  manage: 'https://support.discord.com/hc/en-us/articles/44393096706583-How-to-Manage-Your-Discord-Profile-Badges',
  privacy: 'https://support.discord.com/hc/en-us/articles/21865322754327-Data-Used-to-Personalize-Discord',
  tiers: 'https://github.com/EliteZilla/Discord-Badges#experimental-tier-galleries',
  corroboration: 'https://communityone.io/en/servers/1247694722173108254/infinity-hub-tm/news/discord-evolving-profile-badges-explained-2026-09-02/',
  art: 'https://github.com/dev-hoehle/discord-badges',
};
const hours = [1,5,20,75,150,300,500,1000,2000,5000];
const levels = (names, values, prefix) => names.map((name,i) => ({name, value:values[i], image:`./assets/${prefix}_${name.toLowerCase()}.png`}));
export const badges = [
  { id:'game-time', name:'Game Time', icon:'swords', color:'#a89cff', rgb:'168,156,255', unit:'hours', shortUnit:'h', description:'Every session adds to your story.', mechanic:'Total time in games detected by Discord’s desktop app.', detail:'Qualifying play since December 8, 2025 counts across detected games. Console play does not count.', levels:levels(['Casual','Recreational','Dedicated','Committed','Serious','Devoted','Seasoned','Ironclad','Unshakeable','Eternal'],hours,'game_time') },
  { id:'game-variety', name:'Game Variety', icon:'gamepad', color:'#6ce2ce', rgb:'108,226,206', unit:'games', shortUnit:'games', description:'A whole world of games. Your collection.', mechanic:'The number of different desktop games Discord recognizes.', detail:'Roblox and Fortnite experiences each count as one game. Some small games may not be detected.', levels:levels(['Sampler','Dabbler','Enthusiast','Ranger','Explorer','Adventurer','Voyager','Maverick','Polymath','Universalist'],[2,5,10,15,20,30,40,60,80,100],'game_variety') },
  { id:'streaming', name:'Streaming', icon:'stream', color:'#ef9edc', rgb:'239,158,220', unit:'hours', shortUnit:'h', description:'Good moments are better together.', mechanic:'Desktop screen-sharing time with at least one other person in the call.', detail:'Eligible screen sharing since January 1, 2024 counts. Mobile streams do not count.', levels:levels(['Newcomer','Fledgling','Breakout','Standout','Trendsetter','Headliner','Star','Sensation','Visionary','Phenomenon'],hours,'streaming') },
  { id:'account-age', name:'Account Age', icon:'spark', color:'#f3ca7b', rgb:'243,202,123', unit:'years', shortUnit:'years', description:'For all the years you’ve called it home.', mechanic:'How long your Discord account has existed.', detail:'Unlocks at one year. Once an Account Age level is earned, it is retained.', levels:levels(['Seed','Sprout','Bud','Sapling','Blossom','Redwood','Sequoia','Bristlecone','Stromatolite','Primordial'],[1,2,3,4,5,6,7,8,9,10],'account_age') },
];
export const faqs = [
  ['What are Discord’s new badges?', 'Evolving badges mark activity and account milestones. Their appearance changes as you progress. Browse the four collections above to see the community-documented tiers.'],
  ['How does Game Time progression work?', 'Recognized desktop play accumulates across games. Explore the community-documented hour milestones in the progression explorer; check Discord’s Badge Directory for your actual requirements.'],
  ['How does Game Variety progression work?', 'It counts distinct recognized games. Repeating the same game doesn’t increase your variety total. Use the explorer to browse the community-documented milestones.'],
  ['Why can’t I see these badges on my profile?', 'Check your Badge Directory and display slots: hidden badges or additional earned badges may not appear in the visible row. Restart or refresh Discord if an expected badge is missing, then check its requirements. Availability and interface details can vary.'],
  ['How long does Discord take to update progress?', 'Discord says updates may be delayed, without promising a fixed schedule. For activity badges, check desktop detection and your personalization setting.'],
  ['Can I earn badges on mobile?', 'Game Time, Game Variety, and Streaming progress require the desktop app. Viewing or managing badges on mobile is a separate feature; the mobile Badge Directory may have limited availability.'],
  ['Are the badges available to everyone?', 'Discord’s latest guide lists these as current badges. Your own Badge Directory is the best place to check available badges and requirements for your account. Earlier experiments had limited access; a preview here does not guarantee availability.'],
  ['Is Badgecraft affiliated with Discord?', 'No. Badgecraft is an independent community project. Discord owns its name and badge artwork. Every profile on this site is a simulation, and changing a preview never changes a Discord account.'],
];

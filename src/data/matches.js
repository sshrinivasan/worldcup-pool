// 2026 World Cup Match Schedule with Correct Groups
// Based on the official FIFA draw from December 5, 2025
// Dates and times in Pacific Time (PDT)

export const matches = [
  // ===== GROUP A: Mexico, South Africa, South Korea, Czechia =====
  {
    id: 3,
    date: "2026-06-11",
    time: "12:00",
    stage: "Group A",
    team1: { name: "Mexico", code: "MEX", flag: "🇲🇽" },
    team2: { name: "South Africa", code: "RSA", flag: "🇿🇦" },
    venue: "Estadio Azteca, Mexico City"
  },
  {
    id: 4,
    date: "2026-06-11",
    time: "19:00",
    stage: "Group A",
    team1: { name: "South Korea", code: "KOR", flag: "🇰🇷" },
    team2: { name: "Czechia", code: "CZE", flag: "🇨🇿" },
    venue: "Estadio Guadalajara"
  },
  {
    id: 2,
    date: "2026-06-18",
    time: "09:00",
    stage: "Group A",
    team1: { name: "South Africa", code: "RSA", flag: "🇿🇦" },
    team2: { name: "Czechia", code: "CZE", flag: "🇨🇿" },
    venue: "Mercedes-Benz Stadium, Atlanta"
  },
  {
    id: 1,
    date: "2026-06-18",
    time: "18:00",
    stage: "Group A",
    team1: { name: "Mexico", code: "MEX", flag: "🇲🇽" },
    team2: { name: "South Korea", code: "KOR", flag: "🇰🇷" },
    venue: "Estadio Guadalajara"
  },
  {
    id: 5,
    date: "2026-06-24",
    time: "18:00",
    stage: "Group A",
    team1: { name: "Mexico", code: "MEX", flag: "🇲🇽" },
    team2: { name: "Czechia", code: "CZE", flag: "🇨🇿" },
    venue: "Estadio Azteca, Mexico City"
  },
  {
    id: 6,
    date: "2026-06-24",
    time: "18:00",
    stage: "Group A",
    team1: { name: "South Korea", code: "KOR", flag: "🇰🇷" },
    team2: { name: "South Africa", code: "RSA", flag: "🇿🇦" },
    venue: "Estadio BBVA, Monterrey"
  },

  // ===== GROUP B: Canada, Switzerland, Qatar, Bosnia-Herzegovina =====
  {
    id: 11,
    date: "2026-06-12",
    time: "12:00",
    stage: "Group B",
    team1: { name: "Canada", code: "CAN", flag: "🇨🇦" },
    team2: { name: "Bosnia-Herzegovina", code: "BIH", flag: "🇧🇦" },
    venue: "BMO Field, Toronto"
  },
  {
    id: 12,
    date: "2026-06-13",
    time: "12:00",
    stage: "Group B",
    team1: { name: "Switzerland", code: "SUI", flag: "🇨🇭" },
    team2: { name: "Qatar", code: "QAT", flag: "🇶🇦" },
    venue: "Levi's Stadium, San Francisco Bay Area"
  },
  {
    id: 10,
    date: "2026-06-18",
    time: "12:00",
    stage: "Group B",
    team1: { name: "Switzerland", code: "SUI", flag: "🇨🇭" },
    team2: { name: "Bosnia-Herzegovina", code: "BIH", flag: "🇧🇦" },
    venue: "SoFi Stadium, Los Angeles"
  },
  {
    id: 9,
    date: "2026-06-18",
    time: "15:00",
    stage: "Group B",
    team1: { name: "Canada", code: "CAN", flag: "🇨🇦" },
    team2: { name: "Qatar", code: "QAT", flag: "🇶🇦" },
    venue: "BC Place, Vancouver"
  },
  {
    id: 7,
    date: "2026-06-24",
    time: "12:00",
    stage: "Group B",
    team1: { name: "Canada", code: "CAN", flag: "🇨🇦" },
    team2: { name: "Switzerland", code: "SUI", flag: "🇨🇭" },
    venue: "BC Place, Vancouver"
  },
  {
    id: 8,
    date: "2026-06-24",
    time: "12:00",
    stage: "Group B",
    team1: { name: "Qatar", code: "QAT", flag: "🇶🇦" },
    team2: { name: "Bosnia-Herzegovina", code: "BIH", flag: "🇧🇦" },
    venue: "Lumen Field, Seattle"
  },

  // ===== GROUP C: Brazil, Morocco, Haiti, Scotland =====
  {
    id: 13,
    date: "2026-06-13",
    time: "15:00",
    stage: "Group C",
    team1: { name: "Brazil", code: "BRA", flag: "🇧🇷" },
    team2: { name: "Morocco", code: "MAR", flag: "🇲🇦" },
    venue: "MetLife Stadium, New York/New Jersey"
  },
  {
    id: 14,
    date: "2026-06-13",
    time: "18:00",
    stage: "Group C",
    team1: { name: "Haiti", code: "HAI", flag: "🇭🇹" },
    team2: { name: "Scotland", code: "SCO", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    venue: "Gillette Stadium, Boston"
  },
  {
    id: 16,
    date: "2026-06-19",
    time: "15:00",
    stage: "Group C",
    team1: { name: "Morocco", code: "MAR", flag: "🇲🇦" },
    team2: { name: "Scotland", code: "SCO", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    venue: "Gillette Stadium, Boston"
  },
  {
    id: 15,
    date: "2026-06-19",
    time: "17:30",
    stage: "Group C",
    team1: { name: "Brazil", code: "BRA", flag: "🇧🇷" },
    team2: { name: "Haiti", code: "HAI", flag: "🇭🇹" },
    venue: "Lincoln Financial Field, Philadelphia"
  },
  {
    id: 17,
    date: "2026-06-24",
    time: "15:00",
    stage: "Group C",
    team1: { name: "Brazil", code: "BRA", flag: "🇧🇷" },
    team2: { name: "Scotland", code: "SCO", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    venue: "Hard Rock Stadium, Miami"
  },
  {
    id: 18,
    date: "2026-06-24",
    time: "15:00",
    stage: "Group C",
    team1: { name: "Morocco", code: "MAR", flag: "🇲🇦" },
    team2: { name: "Haiti", code: "HAI", flag: "🇭🇹" },
    venue: "Mercedes-Benz Stadium, Atlanta"
  },

  // ===== GROUP D: USA, Paraguay, Australia, Türkiye =====
  {
    id: 19,
    date: "2026-06-12",
    time: "18:00",
    stage: "Group D",
    team1: { name: "USA", code: "USA", flag: "🇺🇸" },
    team2: { name: "Paraguay", code: "PAR", flag: "🇵🇾" },
    venue: "SoFi Stadium, Los Angeles"
  },
  {
    id: 20,
    date: "2026-06-13",
    time: "21:00",
    stage: "Group D",
    team1: { name: "Australia", code: "AUS", flag: "🇦🇺" },
    team2: { name: "Türkiye", code: "TUR", flag: "🇹🇷" },
    venue: "BC Place, Vancouver"
  },
  {
    id: 21,
    date: "2026-06-19",
    time: "12:00",
    stage: "Group D",
    team1: { name: "USA", code: "USA", flag: "🇺🇸" },
    team2: { name: "Australia", code: "AUS", flag: "🇦🇺" },
    venue: "Lumen Field, Seattle"
  },
  {
    id: 22,
    date: "2026-06-19",
    time: "20:00",
    stage: "Group D",
    team1: { name: "Paraguay", code: "PAR", flag: "🇵🇾" },
    team2: { name: "Türkiye", code: "TUR", flag: "🇹🇷" },
    venue: "Levi's Stadium, San Francisco Bay Area"
  },
  {
    id: 23,
    date: "2026-06-25",
    time: "19:00",
    stage: "Group D",
    team1: { name: "USA", code: "USA", flag: "🇺🇸" },
    team2: { name: "Türkiye", code: "TUR", flag: "🇹🇷" },
    venue: "SoFi Stadium, Los Angeles"
  },
  {
    id: 24,
    date: "2026-06-26",
    time: "19:00",
    stage: "Group D",
    team1: { name: "Paraguay", code: "PAR", flag: "🇵🇾" },
    team2: { name: "Australia", code: "AUS", flag: "🇦🇺" },
    venue: "Levi's Stadium, San Francisco Bay Area"
  },

  // ===== GROUP E: Germany, Curaçao, Ivory Coast, Ecuador =====
  {
    id: 25,
    date: "2026-06-14",
    time: "10:00",
    stage: "Group E",
    team1: { name: "Germany", code: "GER", flag: "🇩🇪" },
    team2: { name: "Curaçao", code: "CUW", flag: "🇨🇼" },
    venue: "NRG Stadium, Houston"
  },
  {
    id: 26,
    date: "2026-06-14",
    time: "16:00",
    stage: "Group E",
    team1: { name: "Ivory Coast", code: "CIV", flag: "🇨🇮" },
    team2: { name: "Ecuador", code: "ECU", flag: "🇪🇨" },
    venue: "Lincoln Financial Field, Philadelphia"
  },
  {
    id: 27,
    date: "2026-06-20",
    time: "13:00",
    stage: "Group E",
    team1: { name: "Germany", code: "GER", flag: "🇩🇪" },
    team2: { name: "Ivory Coast", code: "CIV", flag: "🇨🇮" },
    venue: "BMO Field, Toronto"
  },
  {
    id: 28,
    date: "2026-06-20",
    time: "17:00",
    stage: "Group E",
    team1: { name: "Curaçao", code: "CUW", flag: "🇨🇼" },
    team2: { name: "Ecuador", code: "ECU", flag: "🇪🇨" },
    venue: "Arrowhead Stadium, Kansas City"
  },
  {
    id: 30,
    date: "2026-06-25",
    time: "13:00",
    stage: "Group E",
    team1: { name: "Curaçao", code: "CUW", flag: "🇨🇼" },
    team2: { name: "Ivory Coast", code: "CIV", flag: "🇨🇮" },
    venue: "Lincoln Financial Field, Philadelphia"
  },
  {
    id: 29,
    date: "2026-06-25",
    time: "13:00",
    stage: "Group E",
    team1: { name: "Germany", code: "GER", flag: "🇩🇪" },
    team2: { name: "Ecuador", code: "ECU", flag: "🇪🇨" },
    venue: "MetLife Stadium, New York/New Jersey"
  },

  // ===== GROUP F: Netherlands, Sweden, Tunisia, Japan =====
  {
    id: 35,
    date: "2026-06-14",
    time: "13:00",
    stage: "Group F",
    team1: { name: "Netherlands", code: "NED", flag: "🇳🇱" },
    team2: { name: "Japan", code: "JPN", flag: "🇯🇵" },
    venue: "AT&T Stadium, Dallas"
  },
  {
    id: 36,
    date: "2026-06-14",
    time: "19:00",
    stage: "Group F",
    team1: { name: "Sweden", code: "SWE", flag: "🇸🇪" },
    team2: { name: "Tunisia", code: "TUN", flag: "🇹🇳" },
    venue: "Estadio BBVA, Monterrey"
  },
  {
    id: 31,
    date: "2026-06-20",
    time: "10:00",
    stage: "Group F",
    team1: { name: "Netherlands", code: "NED", flag: "🇳🇱" },
    team2: { name: "Sweden", code: "SWE", flag: "🇸🇪" },
    venue: "NRG Stadium, Houston"
  },
  {
    id: 32,
    date: "2026-06-20",
    time: "21:00",
    stage: "Group F",
    team1: { name: "Tunisia", code: "TUN", flag: "🇹🇳" },
    team2: { name: "Japan", code: "JPN", flag: "🇯🇵" },
    venue: "Estadio BBVA, Monterrey"
  },
  {
    id: 33,
    date: "2026-06-25",
    time: "16:00",
    stage: "Group F",
    team1: { name: "Netherlands", code: "NED", flag: "🇳🇱" },
    team2: { name: "Tunisia", code: "TUN", flag: "🇹🇳" },
    venue: "Arrowhead Stadium, Kansas City"
  },
  {
    id: 34,
    date: "2026-06-25",
    time: "16:00",
    stage: "Group F",
    team1: { name: "Sweden", code: "SWE", flag: "🇸🇪" },
    team2: { name: "Japan", code: "JPN", flag: "🇯🇵" },
    venue: "AT&T Stadium, Dallas"
  },

  // ===== GROUP G: Belgium, Egypt, Iran, New Zealand =====
  {
    id: 37,
    date: "2026-06-15",
    time: "12:00",
    stage: "Group G",
    team1: { name: "Belgium", code: "BEL", flag: "🇧🇪" },
    team2: { name: "Egypt", code: "EGY", flag: "🇪🇬" },
    venue: "Lumen Field, Seattle"
  },
  {
    id: 38,
    date: "2026-06-15",
    time: "18:00",
    stage: "Group G",
    team1: { name: "Iran", code: "IRN", flag: "🇮🇷" },
    team2: { name: "New Zealand", code: "NZL", flag: "🇳🇿" },
    venue: "SoFi Stadium, Los Angeles"
  },
  {
    id: 39,
    date: "2026-06-21",
    time: "12:00",
    stage: "Group G",
    team1: { name: "Belgium", code: "BEL", flag: "🇧🇪" },
    team2: { name: "Iran", code: "IRN", flag: "🇮🇷" },
    venue: "SoFi Stadium, Los Angeles"
  },
  {
    id: 40,
    date: "2026-06-21",
    time: "18:00",
    stage: "Group G",
    team1: { name: "Egypt", code: "EGY", flag: "🇪🇬" },
    team2: { name: "New Zealand", code: "NZL", flag: "🇳🇿" },
    venue: "BC Place, Vancouver"
  },
  {
    id: 42,
    date: "2026-06-26",
    time: "20:00",
    stage: "Group G",
    team1: { name: "Egypt", code: "EGY", flag: "🇪🇬" },
    team2: { name: "Iran", code: "IRN", flag: "🇮🇷" },
    venue: "Lumen Field, Seattle"
  },
  {
    id: 41,
    date: "2026-06-27",
    time: "20:00",
    stage: "Group G",
    team1: { name: "Belgium", code: "BEL", flag: "🇧🇪" },
    team2: { name: "New Zealand", code: "NZL", flag: "🇳🇿" },
    venue: "BC Place, Vancouver"
  },

  // ===== GROUP H: Spain, Cabo Verde, Saudi Arabia, Uruguay =====
  {
    id: 43,
    date: "2026-06-15",
    time: "09:00",
    stage: "Group H",
    team1: { name: "Spain", code: "ESP", flag: "🇪🇸" },
    team2: { name: "Cabo Verde", code: "CPV", flag: "🇨🇻" },
    venue: "Mercedes-Benz Stadium, Atlanta"
  },
  {
    id: 44,
    date: "2026-06-15",
    time: "15:00",
    stage: "Group H",
    team1: { name: "Saudi Arabia", code: "KSA", flag: "🇸🇦" },
    team2: { name: "Uruguay", code: "URU", flag: "🇺🇾" },
    venue: "Hard Rock Stadium, Miami"
  },
  {
    id: 45,
    date: "2026-06-21",
    time: "09:00",
    stage: "Group H",
    team1: { name: "Spain", code: "ESP", flag: "🇪🇸" },
    team2: { name: "Saudi Arabia", code: "KSA", flag: "🇸🇦" },
    venue: "Mercedes-Benz Stadium, Atlanta"
  },
  {
    id: 46,
    date: "2026-06-21",
    time: "15:00",
    stage: "Group H",
    team1: { name: "Cabo Verde", code: "CPV", flag: "🇨🇻" },
    team2: { name: "Uruguay", code: "URU", flag: "🇺🇾" },
    venue: "Hard Rock Stadium, Miami"
  },
  {
    id: 48,
    date: "2026-06-26",
    time: "17:00",
    stage: "Group H",
    team1: { name: "Cabo Verde", code: "CPV", flag: "🇨🇻" },
    team2: { name: "Saudi Arabia", code: "KSA", flag: "🇸🇦" },
    venue: "NRG Stadium, Houston"
  },
  {
    id: 47,
    date: "2026-06-27",
    time: "17:00",
    stage: "Group H",
    team1: { name: "Spain", code: "ESP", flag: "🇪🇸" },
    team2: { name: "Uruguay", code: "URU", flag: "🇺🇾" },
    venue: "Estadio Guadalajara"
  },

  // ===== GROUP I: France, Senegal, Iraq, Norway =====
  {
    id: 49,
    date: "2026-06-16",
    time: "12:00",
    stage: "Group I",
    team1: { name: "France", code: "FRA", flag: "🇫🇷" },
    team2: { name: "Senegal", code: "SEN", flag: "🇸🇳" },
    venue: "MetLife Stadium, New York/New Jersey"
  },
  {
    id: 50,
    date: "2026-06-16",
    time: "15:00",
    stage: "Group I",
    team1: { name: "Iraq", code: "IRQ", flag: "🇮🇶" },
    team2: { name: "Norway", code: "NOR", flag: "🇳🇴" },
    venue: "Gillette Stadium, Boston"
  },
  {
    id: 51,
    date: "2026-06-22",
    time: "14:00",
    stage: "Group I",
    team1: { name: "France", code: "FRA", flag: "🇫🇷" },
    team2: { name: "Iraq", code: "IRQ", flag: "🇮🇶" },
    venue: "Lincoln Financial Field, Philadelphia"
  },
  {
    id: 52,
    date: "2026-06-22",
    time: "17:00",
    stage: "Group I",
    team1: { name: "Senegal", code: "SEN", flag: "🇸🇳" },
    team2: { name: "Norway", code: "NOR", flag: "🇳🇴" },
    venue: "MetLife Stadium, New York/New Jersey"
  },
  {
    id: 53,
    date: "2026-06-26",
    time: "12:00",
    stage: "Group I",
    team1: { name: "France", code: "FRA", flag: "🇫🇷" },
    team2: { name: "Norway", code: "NOR", flag: "🇳🇴" },
    venue: "Gillette Stadium, Boston"
  },
  {
    id: 54,
    date: "2026-06-26",
    time: "12:00",
    stage: "Group I",
    team1: { name: "Senegal", code: "SEN", flag: "🇸🇳" },
    team2: { name: "Iraq", code: "IRQ", flag: "🇮🇶" },
    venue: "BMO Field, Toronto"
  },

  // ===== GROUP J: Argentina, Algeria, Austria, Jordan =====
  {
    id: 55,
    date: "2026-06-16",
    time: "18:00",
    stage: "Group J",
    team1: { name: "Argentina", code: "ARG", flag: "🇦🇷" },
    team2: { name: "Algeria", code: "ALG", flag: "🇩🇿" },
    venue: "Arrowhead Stadium, Kansas City"
  },
  {
    id: 56,
    date: "2026-06-16",
    time: "21:00",
    stage: "Group J",
    team1: { name: "Austria", code: "AUT", flag: "🇦🇹" },
    team2: { name: "Jordan", code: "JOR", flag: "🇯🇴" },
    venue: "Levi's Stadium, San Francisco Bay Area"
  },
  {
    id: 57,
    date: "2026-06-22",
    time: "10:00",
    stage: "Group J",
    team1: { name: "Argentina", code: "ARG", flag: "🇦🇷" },
    team2: { name: "Austria", code: "AUT", flag: "🇦🇹" },
    venue: "AT&T Stadium, Dallas"
  },
  {
    id: 58,
    date: "2026-06-22",
    time: "20:00",
    stage: "Group J",
    team1: { name: "Algeria", code: "ALG", flag: "🇩🇿" },
    team2: { name: "Jordan", code: "JOR", flag: "🇯🇴" },
    venue: "Levi's Stadium, San Francisco Bay Area"
  },
  {
    id: 59,
    date: "2026-06-27",
    time: "19:00",
    stage: "Group J",
    team1: { name: "Argentina", code: "ARG", flag: "🇦🇷" },
    team2: { name: "Jordan", code: "JOR", flag: "🇯🇴" },
    venue: "AT&T Stadium, Dallas"
  },
  {
    id: 60,
    date: "2026-06-27",
    time: "19:00",
    stage: "Group J",
    team1: { name: "Algeria", code: "ALG", flag: "🇩🇿" },
    team2: { name: "Austria", code: "AUT", flag: "🇦🇹" },
    venue: "Arrowhead Stadium, Kansas City"
  },

  // ===== GROUP K: Portugal, DR Congo, Uzbekistan, Colombia =====
  {
    id: 61,
    date: "2026-06-17",
    time: "10:00",
    stage: "Group K",
    team1: { name: "Portugal", code: "POR", flag: "🇵🇹" },
    team2: { name: "DR Congo", code: "COD", flag: "🇨🇩" },
    venue: "NRG Stadium, Houston"
  },
  {
    id: 62,
    date: "2026-06-17",
    time: "19:00",
    stage: "Group K",
    team1: { name: "Uzbekistan", code: "UZB", flag: "🇺🇿" },
    team2: { name: "Colombia", code: "COL", flag: "🇨🇴" },
    venue: "Estadio Azteca, Mexico City"
  },
  {
    id: 63,
    date: "2026-06-23",
    time: "10:00",
    stage: "Group K",
    team1: { name: "Portugal", code: "POR", flag: "🇵🇹" },
    team2: { name: "Uzbekistan", code: "UZB", flag: "🇺🇿" },
    venue: "NRG Stadium, Houston"
  },
  {
    id: 64,
    date: "2026-06-23",
    time: "19:00",
    stage: "Group K",
    team1: { name: "DR Congo", code: "COD", flag: "🇨🇩" },
    team2: { name: "Colombia", code: "COL", flag: "🇨🇴" },
    venue: "Estadio Guadalajara"
  },
  {
    id: 65,
    date: "2026-06-27",
    time: "16:30",
    stage: "Group K",
    team1: { name: "Portugal", code: "POR", flag: "🇵🇹" },
    team2: { name: "Colombia", code: "COL", flag: "🇨🇴" },
    venue: "Hard Rock Stadium, Miami"
  },
  {
    id: 66,
    date: "2026-06-27",
    time: "16:30",
    stage: "Group K",
    team1: { name: "DR Congo", code: "COD", flag: "🇨🇩" },
    team2: { name: "Uzbekistan", code: "UZB", flag: "🇺🇿" },
    venue: "Mercedes-Benz Stadium, Atlanta"
  },

  // ===== GROUP L: England, Croatia, Ghana, Panama =====
  {
    id: 67,
    date: "2026-06-17",
    time: "13:00",
    stage: "Group L",
    team1: { name: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    team2: { name: "Croatia", code: "CRO", flag: "🇭🇷" },
    venue: "AT&T Stadium, Dallas"
  },
  {
    id: 68,
    date: "2026-06-17",
    time: "16:00",
    stage: "Group L",
    team1: { name: "Ghana", code: "GHA", flag: "🇬🇭" },
    team2: { name: "Panama", code: "PAN", flag: "🇵🇦" },
    venue: "BMO Field, Toronto"
  },
  {
    id: 69,
    date: "2026-06-23",
    time: "13:00",
    stage: "Group L",
    team1: { name: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    team2: { name: "Ghana", code: "GHA", flag: "🇬🇭" },
    venue: "Gillette Stadium, Boston"
  },
  {
    id: 70,
    date: "2026-06-23",
    time: "16:00",
    stage: "Group L",
    team1: { name: "Croatia", code: "CRO", flag: "🇭🇷" },
    team2: { name: "Panama", code: "PAN", flag: "🇵🇦" },
    venue: "BMO Field, Toronto"
  },
  {
    id: 71,
    date: "2026-06-27",
    time: "14:00",
    stage: "Group L",
    team1: { name: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    team2: { name: "Panama", code: "PAN", flag: "🇵🇦" },
    venue: "MetLife Stadium, New York/New Jersey"
  },
  {
    id: 72,
    date: "2026-06-27",
    time: "14:00",
    stage: "Group L",
    team1: { name: "Croatia", code: "CRO", flag: "🇭🇷" },
    team2: { name: "Ghana", code: "GHA", flag: "🇬🇭" },
    venue: "Lincoln Financial Field, Philadelphia"
  },

  // ===== ROUND OF 32 (16 matches) =====
  {
    id: 73,
    date: "2026-07-04",
    time: "13:00",
    stage: "Round of 32",
    team1: { name: "Winner Group A", code: "W-A", flag: "🏆" },
    team2: { name: "Runner-up Group B", code: "R-B", flag: "🥈" },
    venue: "Lincoln Financial Field, Philadelphia"
  },
  {
    id: 74,
    date: "2026-07-04",
    time: "16:00",
    stage: "Round of 32",
    team1: { name: "Winner Group C", code: "W-C", flag: "🏆" },
    team2: { name: "Runner-up Group D", code: "R-D", flag: "🥈" },
    venue: "Lumen Field, Seattle"
  },
  {
    id: 75,
    date: "2026-07-04",
    time: "19:00",
    stage: "Round of 32",
    team1: { name: "Winner Group E", code: "W-E", flag: "🏆" },
    team2: { name: "Runner-up Group F", code: "R-F", flag: "🥈" },
    venue: "AT&T Stadium, Dallas"
  },
  {
    id: 76,
    date: "2026-07-05",
    time: "13:00",
    stage: "Round of 32",
    team1: { name: "Winner Group G", code: "W-G", flag: "🏆" },
    team2: { name: "Runner-up Group H", code: "R-H", flag: "🥈" },
    venue: "Arrowhead Stadium, Kansas City"
  },
  {
    id: 77,
    date: "2026-07-05",
    time: "16:00",
    stage: "Round of 32",
    team1: { name: "Winner Group I", code: "W-I", flag: "🏆" },
    team2: { name: "Runner-up Group J", code: "R-J", flag: "🥈" },
    venue: "NRG Stadium, Houston"
  },
  {
    id: 78,
    date: "2026-07-05",
    time: "19:00",
    stage: "Round of 32",
    team1: { name: "Winner Group K", code: "W-K", flag: "🏆" },
    team2: { name: "Runner-up Group L", code: "R-L", flag: "🥈" },
    venue: "SoFi Stadium, Los Angeles"
  },
  {
    id: 79,
    date: "2026-07-06",
    time: "13:00",
    stage: "Round of 32",
    team1: { name: "Winner Group B", code: "W-B", flag: "🏆" },
    team2: { name: "Runner-up Group A", code: "R-A", flag: "🥈" },
    venue: "MetLife Stadium, New York/New Jersey"
  },
  {
    id: 80,
    date: "2026-07-06",
    time: "16:00",
    stage: "Round of 32",
    team1: { name: "Winner Group D", code: "W-D", flag: "🏆" },
    team2: { name: "Runner-up Group C", code: "R-C", flag: "🥈" },
    venue: "Mercedes-Benz Stadium, Atlanta"
  },
  {
    id: 81,
    date: "2026-07-06",
    time: "19:00",
    stage: "Round of 32",
    team1: { name: "Winner Group F", code: "W-F", flag: "🏆" },
    team2: { name: "Runner-up Group E", code: "R-E", flag: "🥈" },
    venue: "Hard Rock Stadium, Miami"
  },
  {
    id: 82,
    date: "2026-07-07",
    time: "13:00",
    stage: "Round of 32",
    team1: { name: "Winner Group H", code: "W-H", flag: "🏆" },
    team2: { name: "Runner-up Group G", code: "R-G", flag: "🥈" },
    venue: "BMO Field, Toronto"
  },
  {
    id: 83,
    date: "2026-07-07",
    time: "16:00",
    stage: "Round of 32",
    team1: { name: "Winner Group J", code: "W-J", flag: "🏆" },
    team2: { name: "Runner-up Group I", code: "R-I", flag: "🥈" },
    venue: "BC Place, Vancouver"
  },
  {
    id: 84,
    date: "2026-07-07",
    time: "19:00",
    stage: "Round of 32",
    team1: { name: "Winner Group L", code: "W-L", flag: "🏆" },
    team2: { name: "Runner-up Group K", code: "R-K", flag: "🥈" },
    venue: "Estadio Azteca, Mexico City"
  },
  {
    id: 85,
    date: "2026-07-08",
    time: "13:00",
    stage: "Round of 32",
    team1: { name: "Third Place Group A/B/C/D", code: "3rd-ABCD", flag: "🥉" },
    team2: { name: "Third Place Group E/F/G/H", code: "3rd-EFGH", flag: "🥉" },
    venue: "Gillette Stadium, Boston"
  },
  {
    id: 86,
    date: "2026-07-08",
    time: "16:00",
    stage: "Round of 32",
    team1: { name: "Third Place Group I/J/K/L", code: "3rd-IJKL", flag: "🥉" },
    team2: { name: "Best Third Place", code: "3rd-Best", flag: "🥉" },
    venue: "Levi's Stadium, San Francisco"
  },
  {
    id: 87,
    date: "2026-07-08",
    time: "19:00",
    stage: "Round of 32",
    team1: { name: "Third Place Qualifier 1", code: "3rd-Q1", flag: "🥉" },
    team2: { name: "Third Place Qualifier 2", code: "3rd-Q2", flag: "🥉" },
    venue: "Lincoln Financial Field, Philadelphia"
  },
  {
    id: 88,
    date: "2026-07-09",
    time: "13:00",
    stage: "Round of 32",
    team1: { name: "Third Place Qualifier 3", code: "3rd-Q3", flag: "🥉" },
    team2: { name: "Third Place Qualifier 4", code: "3rd-Q4", flag: "🥉" },
    venue: "AT&T Stadium, Dallas"
  },

  // ===== ROUND OF 16 (8 matches) =====
  {
    id: 89,
    date: "2026-07-11",
    time: "13:00",
    stage: "Round of 16",
    team1: { name: "Winner Match 73", code: "W73", flag: "⚽" },
    team2: { name: "Winner Match 74", code: "W74", flag: "⚽" },
    venue: "MetLife Stadium, New York/New Jersey"
  },
  {
    id: 90,
    date: "2026-07-11",
    time: "16:00",
    stage: "Round of 16",
    team1: { name: "Winner Match 75", code: "W75", flag: "⚽" },
    team2: { name: "Winner Match 76", code: "W76", flag: "⚽" },
    venue: "SoFi Stadium, Los Angeles"
  },
  {
    id: 91,
    date: "2026-07-11",
    time: "19:00",
    stage: "Round of 16",
    team1: { name: "Winner Match 77", code: "W77", flag: "⚽" },
    team2: { name: "Winner Match 78", code: "W78", flag: "⚽" },
    venue: "AT&T Stadium, Dallas"
  },
  {
    id: 92,
    date: "2026-07-12",
    time: "13:00",
    stage: "Round of 16",
    team1: { name: "Winner Match 79", code: "W79", flag: "⚽" },
    team2: { name: "Winner Match 80", code: "W80", flag: "⚽" },
    venue: "Arrowhead Stadium, Kansas City"
  },
  {
    id: 93,
    date: "2026-07-12",
    time: "16:00",
    stage: "Round of 16",
    team1: { name: "Winner Match 81", code: "W81", flag: "⚽" },
    team2: { name: "Winner Match 82", code: "W82", flag: "⚽" },
    venue: "Mercedes-Benz Stadium, Atlanta"
  },
  {
    id: 94,
    date: "2026-07-12",
    time: "19:00",
    stage: "Round of 16",
    team1: { name: "Winner Match 83", code: "W83", flag: "⚽" },
    team2: { name: "Winner Match 84", code: "W84", flag: "⚽" },
    venue: "Hard Rock Stadium, Miami"
  },
  {
    id: 95,
    date: "2026-07-13",
    time: "13:00",
    stage: "Round of 16",
    team1: { name: "Winner Match 85", code: "W85", flag: "⚽" },
    team2: { name: "Winner Match 86", code: "W86", flag: "⚽" },
    venue: "Lumen Field, Seattle"
  },
  {
    id: 96,
    date: "2026-07-13",
    time: "16:00",
    stage: "Round of 16",
    team1: { name: "Winner Match 87", code: "W87", flag: "⚽" },
    team2: { name: "Winner Match 88", code: "W88", flag: "⚽" },
    venue: "NRG Stadium, Houston"
  },

  // ===== QUARTERFINALS (4 matches) =====
  {
    id: 97,
    date: "2026-07-15",
    time: "13:00",
    stage: "Quarterfinal",
    team1: { name: "Winner Match 89", code: "W89", flag: "⚽" },
    team2: { name: "Winner Match 90", code: "W90", flag: "⚽" },
    venue: "Mercedes-Benz Stadium, Atlanta"
  },
  {
    id: 98,
    date: "2026-07-15",
    time: "19:00",
    stage: "Quarterfinal",
    team1: { name: "Winner Match 91", code: "W91", flag: "⚽" },
    team2: { name: "Winner Match 92", code: "W92", flag: "⚽" },
    venue: "SoFi Stadium, Los Angeles"
  },
  {
    id: 99,
    date: "2026-07-16",
    time: "13:00",
    stage: "Quarterfinal",
    team1: { name: "Winner Match 93", code: "W93", flag: "⚽" },
    team2: { name: "Winner Match 94", code: "W94", flag: "⚽" },
    venue: "Hard Rock Stadium, Miami"
  },
  {
    id: 100,
    date: "2026-07-16",
    time: "19:00",
    stage: "Quarterfinal",
    team1: { name: "Winner Match 95", code: "W95", flag: "⚽" },
    team2: { name: "Winner Match 96", code: "W96", flag: "⚽" },
    venue: "AT&T Stadium, Dallas"
  },

  // ===== SEMIFINALS (2 matches) =====
  {
    id: 101,
    date: "2026-07-18",
    time: "16:00",
    stage: "Semifinal",
    team1: { name: "Winner Match 97", code: "W97", flag: "⚽" },
    team2: { name: "Winner Match 98", code: "W98", flag: "⚽" },
    venue: "AT&T Stadium, Dallas"
  },
  {
    id: 102,
    date: "2026-07-19",
    time: "16:00",
    stage: "Semifinal",
    team1: { name: "Winner Match 99", code: "W99", flag: "⚽" },
    team2: { name: "Winner Match 100", code: "W100", flag: "⚽" },
    venue: "Mercedes-Benz Stadium, Atlanta"
  },

  // ===== THIRD PLACE (1 match) =====
  {
    id: 103,
    date: "2026-07-21",
    time: "15:00",
    stage: "Third Place",
    team1: { name: "Loser Match 101", code: "L101", flag: "🥉" },
    team2: { name: "Loser Match 102", code: "L102", flag: "🥉" },
    venue: "Hard Rock Stadium, Miami"
  },

  // ===== FINAL (1 match) =====
  {
    id: 104,
    date: "2026-07-22",
    time: "15:00",
    stage: "Final",
    team1: { name: "Winner Match 101", code: "W101", flag: "🏆" },
    team2: { name: "Winner Match 102", code: "W102", flag: "🏆" },
    venue: "MetLife Stadium, New York/New Jersey"
  }
];

export const friends = [
  "Sid",
  "Alex",
  "Mike",
  "Michael Stewart",
  "Kevin",
  "Carly",
  "Marc",
  "Trin",
  "Stewart",
  "John",
  "Shaafi",
  "Eric E",
  "Alan",
  "Prajwal",
  "Devan",
  "Jasper",
  "🐕 Benny",
  "🐕 Chester",
  "🐕 Islay",
];

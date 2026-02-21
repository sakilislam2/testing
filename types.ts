
export interface TranslationSet {
  home: string;
  aboutUs: string;
  busSkins: string;
  leaderboard: string;
  tripSchedule: string;
  tournament: string;
  adminPanel: string;
  browseSkins: string;
  joinCommunity: string;
  members: string;
  dailyTrips: string;
  monthlyRanking: string;
  customSkins: string;
  history: string;
  ourStaff: string;
  free: string;
  private: string;
  special: string;
  downloadPaint: string;
  downloadGlass: string;
  enterPassword: string;
  cancel: string;
  submit: string;
  comingSoon: string;
  previousTournaments: string;
  winner: string;
  runnerUp: string;
  leader: string;
  saveChanges: string;
  login: string;
  password: string;
  author: string;
  route: string;
  chassis: string;
  published: string;
  downloads: string;
}

export interface AppData {
  marqueeText: string;
  aboutHistory: {
    en: string;
    bn: string;
  };
  stats: {
    members: number;
    dailyTrips: number;
    monthlyRanking: string;
    customSkinsCount: number;
  };
  staff: any[];
  models: any[];
  skins: any[];
  leaderboard: any[];
  trips: any[];
  tournaments: any[];
  viewerCount: number;
}

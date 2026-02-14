
import { TranslationSet, AppData } from './types';

export const TRANSLATIONS: Record<'en' | 'bn', TranslationSet> = {
  en: {
    home: "Home",
    aboutUs: "About Us",
    busSkins: "Bus Skins",
    leaderboard: "Leaderboard",
    tripSchedule: "Trip Schedule & Rules",
    tournament: "Tournament",
    adminPanel: "Admin Panel",
    browseSkins: "Browse Skins",
    joinCommunity: "Join Community",
    members: "Members",
    dailyTrips: "Daily Trips",
    monthlyRanking: "Monthly Ranking",
    customSkins: "Custom Skins",
    history: "History",
    ourStaff: "Our Staff",
    free: "FREE",
    private: "Private",
    special: "Special",
    downloadPaint: "Download Paint",
    downloadGlass: "Download Glass",
    enterPassword: "Enter Skin Password",
    cancel: "Cancel",
    submit: "Submit",
    comingSoon: "Coming Soon",
    previousTournaments: "Previous Tournaments",
    winner: "Winner",
    runnerUp: "Runner Up",
    leader: "Leader",
    saveChanges: "Save Changes",
    login: "Login",
    password: "Password",
    author: "Author",
    route: "Route",
    chassis: "Chassis",
    published: "Published",
    downloads: "Downloads"
  },
  bn: {
    home: "হোম",
    aboutUs: "আমাদের সম্পর্কে",
    busSkins: "বাস স্কিন",
    leaderboard: "লিডারবোর্ড",
    tripSchedule: "ট্রিপ সময়সূচী",
    tournament: "টুর্নামেন্ট",
    adminPanel: "অ্যাডমিন প্যানেল",
    browseSkins: "স্কিন দেখুন",
    joinCommunity: "কমিউনিটিতে যুক্ত হন",
    members: "সদস্য",
    dailyTrips: "প্রতিদিনের ট্রিপ",
    monthlyRanking: "মাসিক র‍্যাংকিং",
    customSkins: "কাস্টম স্কিন",
    history: "ইতিহাস",
    ourStaff: "আমাদের স্টাফ",
    free: "ফ্রি",
    private: "প্রাইভেট",
    special: "স্পেশাল",
    downloadPaint: "পেইন্ট ডাউনলোড",
    downloadGlass: "গ্লাস ডাউনলোড",
    enterPassword: "স্কিন পাসওয়ার্ড দিন",
    cancel: "বাতিল",
    submit: "জমা দিন",
    comingSoon: "শীঘ্রই আসছে",
    previousTournaments: "পূর্ববর্তী টুর্নামেন্ট",
    winner: "বিজয়ী",
    runnerUp: "রানার আপ",
    leader: "লিডার",
    saveChanges: "পরিবর্তন সংরক্ষণ করুন",
    login: "লগইন",
    password: "পাসওয়ার্ড",
    author: "লেখক",
    route: "রুট",
    chassis: "চ্যাসিস",
    published: "প্রকাশিত",
    downloads: "ডাউনলোড"
  }
};

export const INITIAL_DATA: AppData = {
  marqueeText: "Welcome to BSBDOMG - Bus Simulator Bangladesh Official Multiplayer Group! Stay tuned for upcoming trips and tournaments.",
  aboutHistory: {
    en: "BSBDOMG was founded with the vision to bring all Bus Simulator Bangladesh enthusiasts under one roof. We organize daily trips, competitive tournaments, and provide the highest quality bus skins for our community.",
    bn: "বাস সিমুলেটর বাংলাদেশ প্রেমীদের এক ছাদের নিচে আনার লক্ষ্যে BSBDOMG প্রতিষ্ঠিত হয়েছিল। আমরা প্রতিদিনের ট্রিপ, প্রতিযোগিতামূলক টুর্নামেন্ট আয়োজন করি এবং আমাদের কমিউনিটির জন্য উচ্চ মানের বাস স্কিন প্রদান করি।"
  },
  stats: {
    members: 1500,
    dailyTrips: 12,
    monthlyRanking: "#1 Worldwide",
    customSkinsCount: 307
  },
  staff: [
    { id: '1', name: "Sakil Islam", role: { en: "Founder & Lead Dev", bn: "প্রতিষ্ঠাতা ও প্রধান ডেভেলপার" }, socialLinks: { facebook: "#", discord: "#" } },
    { id: '2', name: "Admin Khan", role: { en: "Community Manager", bn: "কমিউনিটি ম্যানেজার" }, socialLinks: { facebook: "#" } }
  ],
  models: [
    { id: 'm1', name: "Mercedes Benz OF 1623", image: "https://picsum.photos/seed/bus1/400/250" },
    { id: 'm2', name: "Hino AK1J", image: "https://picsum.photos/seed/bus2/400/250" }
  ],
  skins: [
    { id: 's1', modelId: 'm1', title: "Sakura Green Line", route: "Dhaka - Barishal", author: "Sakil Islam", chassis: "Mercedes Benz OF 1623", type: 'FREE', downloadPaintUrl: "#", downloadGlassUrl: "#", downloads: 450, publishDate: "2023-10-15", image: "https://picsum.photos/seed/skin1/500/300" },
    { id: 's2', modelId: 'm1', title: "Ena Transport", route: "Dhaka - Sylhet", author: "Sakil Islam", chassis: "Mercedes Benz OF 1623", type: 'PRIVATE', password: '123', downloadPaintUrl: "#", downloadGlassUrl: "#", downloads: 120, publishDate: "2023-11-01", image: "https://picsum.photos/seed/skin2/500/300" }
  ],
  leaderboard: [
    { id: 'p1', rank: 1, name: "TopDriver_01", playerId: "BSB12345", trips: 450 },
    { id: 'p2', rank: 2, name: "RoadKing", playerId: "BSB98765", trips: 412 },
    { id: 'p3', rank: 3, name: "BusMaster", playerId: "BSB54321", trips: 389 }
  ],
  trips: [
    { id: 't1', time: "10:00 PM", tripMaster: "Sakil Islam", gameId: "BSB_TRIP_A1" },
    { id: 't2', time: "11:30 PM", tripMaster: "Admin Khan", gameId: "BSB_TRIP_B2" }
  ],
  tournaments: [
    { id: 'tour1', season: "Season 2", status: 'COMPLETED', winner: { teamName: "Thunder Riders", members: "Driver1, Driver2, Driver3", leader: "LeaderX", image: "https://picsum.photos/seed/win/400/200" }, runnerUp: { teamName: "Storm Seekers", members: "S1, S2, S3", leader: "LeaderY" }, description: { en: "A fierce battle across the highways of Bangladesh.", bn: "বাংলাদেশের মহাসড়ক জুড়ে এক তীব্র লড়াই।" } },
    { id: 'tour2', season: "Season 3", status: 'COMING_SOON', description: { en: "Get ready for the biggest event of the year. Registration starts soon!", bn: "বছরের সবচেয়ে বড় ইভেন্টের জন্য প্রস্তুত হন। রেজিস্ট্রেশন শীঘ্রই শুরু হবে!" } }
  ],
  viewerCount: 307
};

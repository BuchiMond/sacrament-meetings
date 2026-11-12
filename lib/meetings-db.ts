import type { SacramentMeeting } from "./types";

// Temporary in-memory data. A real database replaces this in a later week.
const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-10-04",
    meetingType: "general",
    presiding: "Bishop David Okafor",
    conducting: "Brother Samuel Adeyemi",
    announcements: ["Watch General Conference at the stake center or at home."],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Grace Nwosu",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      {
        name: "General Conference Broadcast",
        topic: "Sunday morning session",
        type: "speaker",
      },
    ],
    closingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
    closingPrayer: "Brother Peter Obi",
  },
  {
    id: 2,
    date: "2026-10-11",
    meetingType: "regular",
    presiding: "Bishop David Okafor",
    conducting: "Brother Samuel Adeyemi",
    announcements: [
      "Young Women and Young Men activity on Wednesday at 6:00 PM.",
      "Ward choir practice after the meeting.",
    ],
    openingHymn: { number: 85, title: "How Firm a Foundation" },
    openingPrayer: "Brother Emeka Eze",
    wardBusiness: [
      { description: "Release of Sister Ada Obi as Primary pianist." },
      { description: "Sustaining of Sister Joy Bello as Primary pianist." },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [
      { name: "Sister Ngozi Ibe", topic: "Faith in Jesus Christ", type: "speaker" },
      {
        name: "Primary Children",
        topic: "I Am a Child of God",
        type: "musical-number",
      },
      { name: "Brother Tunde Bakare", topic: "Ministering", type: "speaker" },
    ],
    closingHymn: { number: 98, title: "Come, Follow Me" },
    closingPrayer: "Sister Amaka Eze",
  },
  {
    id: 3,
    date: "2026-10-18",
    meetingType: "regular",
    presiding: "Bishop David Okafor",
    conducting: "Brother Samuel Adeyemi",
    announcements: ["Ward temple trip next Saturday. Sign up with the elders quorum."],
    openingHymn: { number: 5, title: "High on the Mountain Top" },
    openingPrayer: "Brother Chidi Anozie",
    wardBusiness: [{ description: "Sustaining of new ward missionaries." }],
    stakeBusiness: true,
    sacramentHymn: { number: 181, title: "O Lord of Hosts" },
    speakers: [
      { name: "Brother Femi Ojo", topic: "Repentance", type: "speaker" },
      { name: "Sister Blessing Udo", topic: "Gratitude", type: "speaker" },
    ],
    closingHymn: { number: 70, title: "Come, Ye Thankful People, Come" },
    closingPrayer: "Sister Ify Okeke",
  },
  {
    id: 4,
    date: "2026-10-25",
    meetingType: "stake",
    presiding: "President Michael Adebayo",
    conducting: "Brother Samuel Adeyemi",
    announcements: ["Stake conference. There are no ward meetings this Sunday."],
    openingHymn: { number: 1, title: "The Morning Breaks" },
    openingPrayer: "Brother John Akpan",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
    speakers: [
      {
        name: "Stake Presidency",
        topic: "Gathering Israel on both sides of the veil",
        type: "speaker",
      },
    ],
    closingHymn: { number: 3, title: "Praise to the Lord, the Almighty" },
    closingPrayer: "Sister Linda Johnson",
  },
  {
    id: 5,
    date: "2026-11-01",
    meetingType: "testimony",
    presiding: "Bishop David Okafor",
    conducting: "Brother Samuel Adeyemi",
    announcements: [
      "Fast Sunday. Please give a generous fast offering.",
      "Ward council meets Tuesday at 7:00 PM.",
    ],
    openingHymn: { number: 138, title: "Come, Ye Children of God" },
    openingPrayer: "Brother Kelechi Nze",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 183, title: "Upon the Cross of Calvary" },
    speakers: [
      {
        name: "Open to the congregation",
        topic: "Bearing of testimonies",
        type: "speaker",
      },
    ],
    closingHymn: { number: 155, title: "Let Us All Press On" },
    closingPrayer: "Sister Mercy Etim",
  },
  {
    id: 6,
    date: "2026-11-08",
    meetingType: "regular",
    presiding: "Bishop David Okafor",
    conducting: "Brother Samuel Adeyemi",
    announcements: ["Ward Christmas party signup sheet is in the foyer."],
    openingHymn: { number: 62, title: "Praise to the Man" },
    openingPrayer: "Sister Chioma Duru",
    wardBusiness: [{ description: "Sustaining of Brother Ike Mba as ward clerk." }],
    stakeBusiness: false,
    sacramentHymn: { number: 175, title: "O God, the Eternal Father" },
    speakers: [
      { name: "Sister Titi Lawal", topic: "The Book of Mormon", type: "speaker" },
      { name: "Ward Choir", topic: "Choose the Right", type: "musical-number" },
      { name: "Brother Segun Alabi", topic: "Temple covenants", type: "speaker" },
    ],
    closingHymn: { number: 243, title: "Choose the Right" },
    closingPrayer: "Brother Ben Okoro",
  },
  {
    id: 7,
    date: "2026-11-15",
    meetingType: "regular",
    presiding: "Bishop David Okafor",
    conducting: "Brother Samuel Adeyemi",
    announcements: ["Youth fireside next Sunday at 5:00 PM."],
    openingHymn: { number: 4, title: "Come, Come, Ye Saints" },
    openingPrayer: "Brother Isaac Udoh",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 190, title: "Behold the Great Redeemer Die" },
    speakers: [
      { name: "Sister Hope Ekpo", topic: "Prayer", type: "speaker" },
      { name: "Brother Daniel Oye", topic: "Service", type: "speaker" },
    ],
    closingHymn: { number: 220, title: "Because I Have Been Given Much" },
    closingPrayer: "Sister Rita Ogbu",
  },
];

/** Returns all meetings, newest first. Pass an ISO date to filter to that Sunday. */
export function getMeetings(date?: string | null): SacramentMeeting[] {
  const sorted = [...meetings].sort((a, b) => b.date.localeCompare(a.date));
  if (!date) return sorted;
  return sorted.filter((meeting) => meeting.date === date);
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}

export function getMeetingByDate(date: string): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.date === date);
}

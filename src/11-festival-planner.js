export function createFestivalManager() {
  let festivals = [];
  const validTypes = ["religious", "national", "cultural"];

  return {
    addFestival(name, date, type) {
      if (!name || typeof date !== "string" || !validTypes.includes(type)) return -1;
      if (festivals.find(f => f.name === name)) return -1;
      festivals.push({ name, date, type });
      return festivals.length;
    },
    removeFestival(name) {
      const idx = festivals.findIndex(f => f.name === name);
      if (idx === -1) return false;
      festivals.splice(idx, 1);
      return true;
    },
    getAll() {
      return festivals.map(f => ({ ...f }));
    },
    getByType(type) {
      return festivals.filter(f => f.type === type).map(f => ({ ...f }));
    },
    getUpcoming(currentDate, n = 3) {
      return festivals
        .filter(f => f.date >= currentDate)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, n)
        .map(f => ({ ...f }));
    },
    getCount() {
      return festivals.length;
    }
  };
}

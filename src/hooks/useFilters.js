export const useFilters = (filters, setFilters) => {
  const toggle = (key, value) => {
    const cur = filters[key];
    setFilters({ ...filters, [key]: cur === value ? '' : value });
  };

  const toggleVibe = (v) => {
    const cur = filters.vibe || [];
    setFilters({
      ...filters,
      vibe: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v],
    });
  };

  return { toggle, toggleVibe };
};

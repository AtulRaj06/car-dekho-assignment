const BUDGET_MAX = {
  'under-6': 6,
  '6-10': 10,
  '10-15': 15,
  '15-25': 25,
  'above-25': 100,
};

const BUDGET_LABELS = {
  'under-6': 'Under ₹6L',
  '6-10': '₹6–10L',
  '10-15': '₹10–15L',
  '15-25': '₹15–25L',
  'above-25': 'Above ₹25L',
};

// Points per segment per use case (out of 20)
const SEGMENT_USE_SCORE = {
  city:      { hatchback: 20, sedan: 16, 'compact-suv': 14, 'mid-suv': 10, mpv: 9,  ev: 18 },
  highway:   { hatchback: 10, sedan: 18, 'compact-suv': 16, 'mid-suv': 18, mpv: 17, ev: 12 },
  family:    { hatchback: 8,  sedan: 14, 'compact-suv': 17, 'mid-suv': 20, mpv: 20, ev: 16 },
  adventure: { hatchback: 4,  sedan: 4,  'compact-suv': 14, 'mid-suv': 20, mpv: 8,  ev: 6  },
};

export function scoreCar(car, prefs) {
  let score = 0;
  const highlights = [];

  // Budget (30 pts)
  const maxBudget = BUDGET_MAX[prefs.budget] ?? 100;
  if (car.price <= maxBudget) {
    score += 30;
    highlights.push(`₹${car.price}L — fits your budget`);
  } else if (car.price <= maxBudget * 1.15) {
    score += 15;
  } else if (car.price <= maxBudget * 1.30) {
    score += 5;
  }

  // Use case segment match (20 pts)
  const useScores = SEGMENT_USE_SCORE[prefs.useCase] ?? {};
  score += useScores[car.segment] ?? 8;

  // Group size (10 pts)
  if (prefs.groupSize === 'large') {
    if (car.seatingCapacity >= 7) {
      score += 10;
      highlights.push(`${car.seatingCapacity}-seater for large family`);
    } else if (car.seatingCapacity >= 6) {
      score += 6;
    } else {
      score += 3;
    }
  } else {
    score += 10;
  }

  // Top priority (25 pts)
  switch (prefs.priority) {
    case 'fuel': {
      if (car.fuelType === 'electric') {
        const s = Math.min(25, Math.round((car.mileage / 500) * 25));
        score += s;
        highlights.push(`${car.mileage} km EV range`);
      } else {
        const s = Math.min(25, Math.round((car.mileage / 26) * 25));
        score += s;
        if (car.mileage >= 20) highlights.push(`${car.mileage} kmpl fuel efficiency`);
      }
      break;
    }
    case 'space': {
      const s = Math.min(25, Math.round((car.bootSpace / 500) * 15 + (car.seatingCapacity / 7) * 10));
      score += s;
      if (car.bootSpace >= 380) highlights.push(`${car.bootSpace}L boot space`);
      if (car.seatingCapacity >= 7) highlights.push(`${car.seatingCapacity} seats`);
      break;
    }
    case 'safety': {
      score += Math.round((car.safetyRating / 5) * 25);
      if (car.safetyRating >= 4) highlights.push(`${car.safetyRating}-star NCAP safety`);
      else if (car.safetyRating === 0) highlights.push('Safety rating pending');
      break;
    }
    case 'performance': {
      const s = Math.min(25, Math.round((car.powerBHP / 200) * 25));
      score += s;
      if (car.powerBHP >= 100) highlights.push(`${car.powerBHP} BHP engine`);
      break;
    }
    case 'value': {
      const composite = car.mileage * 0.5 + car.powerBHP * 0.1 + car.safetyRating * 2 + car.bootSpace * 0.01;
      const s = Math.min(25, Math.round((composite / car.price) * 2.5));
      score += s;
      break;
    }
  }

  // Fuel preference (10 pts)
  if (prefs.fuelType === 'any' || car.fuelType === prefs.fuelType) {
    score += 10;
    if (prefs.fuelType !== 'any') highlights.push(`${prefs.fuelType} as preferred`);
  }

  // Safety baseline (5 pts)
  score += Math.round((car.safetyRating / 5) * 5);

  return {
    score: Math.min(100, score),
    highlights: highlights.slice(0, 3),
  };
}

export function getBudgetLabel(b) {
  return BUDGET_LABELS[b] ?? b;
}

export function getUseCaseLabel(u) {
  return { city: 'City commute', highway: 'Highway travel', family: 'Family trips', adventure: 'Off-road / Adventure' }[u] ?? u;
}

export function getGroupLabel(g) {
  return { solo: 'Just me', couple: 'Me & partner', small: 'Small family', large: 'Large family' }[g] ?? g;
}

export function getPriorityLabel(p) {
  return { fuel: 'Fuel efficiency', space: 'Cabin space', safety: 'Safety', performance: 'Performance', value: 'Value for money' }[p] ?? p;
}

export function getFuelLabel(f) {
  return { any: 'No preference', petrol: 'Petrol', diesel: 'Diesel', electric: 'Electric', cng: 'CNG' }[f] ?? f;
}

export function getScoreColor(score) {
  if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (score >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
  if (score >= 40) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-slate-500 bg-slate-50 border-slate-200';
}

export function getSegmentColor(segment) {
  const map = {
    hatchback: 'from-blue-500 to-blue-700',
    sedan: 'from-purple-500 to-purple-700',
    'compact-suv': 'from-orange-400 to-orange-600',
    'mid-suv': 'from-green-500 to-green-700',
    mpv: 'from-teal-500 to-teal-700',
    ev: 'from-emerald-400 to-emerald-600',
  };
  return map[segment] ?? 'from-slate-400 to-slate-600';
}

export function getSegmentLabel(segment) {
  return {
    hatchback: 'Hatchback',
    sedan: 'Sedan',
    'compact-suv': 'Compact SUV',
    'mid-suv': 'SUV',
    mpv: 'MPV',
    ev: 'Electric',
  }[segment] ?? segment;
}

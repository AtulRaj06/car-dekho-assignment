import { prisma } from '@/lib/prisma';
import {
  scoreCar,
  getBudgetLabel,
  getUseCaseLabel,
  getGroupLabel,
  getPriorityLabel,
  getFuelLabel,
} from '@/lib/scoring';
import { getCarImage } from '@/lib/carImages';
import ResultsClient from './ResultsClient';

export default async function ResultsPage({ searchParams }) {
  const prefs = {
    budget: searchParams.budget || '10-15',
    useCase: searchParams.useCase || 'city',
    groupSize: searchParams.groupSize || 'small',
    priority: searchParams.priority || 'value',
    fuelType: searchParams.fuelType || 'any',
  };

  const cars = await prisma.car.findMany({
    include: { reviews: true },
  });

  const scored = cars
    .map((car) => {
      const { score, highlights } = scoreCar(car, prefs);
      const pros = JSON.parse(car.pros);
      const cons = JSON.parse(car.cons);
      const avgRating =
        car.reviews.length > 0
          ? (car.reviews.reduce((a, r) => a + r.rating, 0) / car.reviews.length).toFixed(1)
          : null;
      const imageUrl = getCarImage(car.make, car.model);
      return { ...car, pros, cons, score, highlights, avgRating, imageUrl };
    })
    .sort((a, b) => b.score - a.score);

  const prefLabels = {
    budget: getBudgetLabel(prefs.budget),
    useCase: getUseCaseLabel(prefs.useCase),
    groupSize: getGroupLabel(prefs.groupSize),
    priority: getPriorityLabel(prefs.priority),
    fuelType: getFuelLabel(prefs.fuelType),
  };

  return <ResultsClient cars={scored} prefs={prefs} prefLabels={prefLabels} />;
}

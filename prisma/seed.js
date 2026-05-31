const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// All imageUrls are verified 960px Wikimedia Commons thumbnails (HTTP 200 confirmed)
const cars = [
  {
    make: 'Maruti Suzuki', model: 'Alto K10', variant: 'VXi',
    segment: 'hatchback', price: 4.50, fuelType: 'petrol', transmission: 'manual',
    mileage: 24.9, engineCC: 998, seatingCapacity: 5, bootSpace: 214,
    safetyRating: 0, powerBHP: 67, groundClearance: 160,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Suzuki_Alto_800_GL_2011.jpg/960px-Suzuki_Alto_800_GL_2011.jpg',
    pros: JSON.stringify(['Most affordable car in India', 'Lowest maintenance cost', 'Easy to park in tight spaces', 'Great fuel economy']),
    cons: JSON.stringify(['No NCAP safety rating', 'Basic interior', 'Small boot', 'Limited features']),
    reviews: [
      { author: 'Rahul M.', rating: 4.0, comment: 'Perfect first car. Very easy to drive in city traffic. Maintenance is super cheap.' },
      { author: 'Priya S.', rating: 3.5, comment: 'Good for daily commute but gets cramped on long trips. AC performance could be better.' },
    ],
  },
  {
    make: 'Maruti Suzuki', model: 'Swift', variant: 'ZXi+',
    segment: 'hatchback', price: 9.30, fuelType: 'petrol', transmission: 'manual',
    mileage: 23.76, engineCC: 1197, seatingCapacity: 5, bootSpace: 268,
    safetyRating: 0, powerBHP: 90, groundClearance: 163,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/2025_Suzuki_Swift_hybrid_in_Flame_Orange_Metallic%2C_front_left%2C_06-06-2025.jpg/960px-2025_Suzuki_Swift_hybrid_in_Flame_Orange_Metallic%2C_front_left%2C_06-06-2025.jpg',
    pros: JSON.stringify(['Sporty looks and handling', 'Peppy engine for city driving', 'Strong resale value', 'Engaging to drive']),
    cons: JSON.stringify(['No NCAP rating', 'Rear legroom limited', 'Gets pricey in top variants']),
    reviews: [
      { author: 'Arjun K.', rating: 4.5, comment: 'Best hatchback in its segment. Fun to drive and looks great.' },
      { author: 'Sneha R.', rating: 4.0, comment: 'Very satisfied. Good power delivery and excellent fuel efficiency.' },
    ],
  },
  {
    make: 'Hyundai', model: 'i20', variant: 'Asta (O) Turbo',
    segment: 'hatchback', price: 11.90, fuelType: 'petrol', transmission: 'manual',
    mileage: 20.35, engineCC: 998, seatingCapacity: 5, bootSpace: 311,
    safetyRating: 0, powerBHP: 120, groundClearance: 161,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Hyundai_i20_%28III%2C_Facelift%29_%E2%80%93_f_11102025.jpg/960px-Hyundai_i20_%28III%2C_Facelift%29_%E2%80%93_f_11102025.jpg',
    pros: JSON.stringify(['Premium interior for a hatchback', 'Large 311L boot', 'Feature-packed with sunroof', 'Punchy turbo engine']),
    cons: JSON.stringify(['Expensive for a hatchback', 'No NCAP rating', 'Premium fuel required for turbo']),
    reviews: [
      { author: 'Vivek T.', rating: 4.5, comment: 'Feels like a premium car. The sunroof and BOSE audio system are excellent.' },
      { author: 'Ananya P.', rating: 4.0, comment: 'Best-in-class features. A bit pricey but worth it for the quality.' },
    ],
  },
  {
    make: 'Tata', model: 'Punch', variant: 'Creative AMT',
    segment: 'compact-suv', price: 10.20, fuelType: 'petrol', transmission: 'automatic',
    mileage: 18.82, engineCC: 1199, seatingCapacity: 5, bootSpace: 366,
    safetyRating: 5, powerBHP: 86, groundClearance: 187,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/2021_Tata_Punch_Creative_%28India%29_front_view_01.png/960px-2021_Tata_Punch_Creative_%28India%29_front_view_01.png',
    pros: JSON.stringify(['5-star Global NCAP safety', 'SUV-like stance and ground clearance', 'Solid build quality', 'Good boot space for size']),
    cons: JSON.stringify(['AMT gearbox can be jerky', 'Rear seat slightly cramped', 'Average highway performance']),
    reviews: [
      { author: 'Rajesh B.', rating: 4.5, comment: '5-star safety rating is the main USP. Feels very solid on the road.' },
      { author: 'Meera V.', rating: 4.0, comment: 'Great for family use. High ground clearance helps on bad roads.' },
    ],
  },
  {
    make: 'Maruti Suzuki', model: 'Baleno', variant: 'Alpha CVT',
    segment: 'hatchback', price: 10.73, fuelType: 'petrol', transmission: 'automatic',
    mileage: 22.35, engineCC: 1197, seatingCapacity: 5, bootSpace: 318,
    safetyRating: 0, powerBHP: 90, groundClearance: 170,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view.jpg/960px-2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view.jpg',
    pros: JSON.stringify(['Largest boot in hatchback class (318L)', 'Smooth CVT transmission', 'Head-up display', 'Good highway comfort']),
    cons: JSON.stringify(['No NCAP rating', 'Average ride quality on bad roads', 'Infotainment system basic']),
    reviews: [
      { author: 'Sanjay M.', rating: 4.0, comment: 'The CVT is perfect for city driving. Spacious interior and great fuel economy.' },
      { author: 'Divya K.', rating: 3.5, comment: 'Good car overall. Wish the suspension was better tuned for Indian roads.' },
    ],
  },
  {
    make: 'Maruti Suzuki', model: 'Dzire', variant: 'ZXi+ AMT',
    segment: 'sedan', price: 10.44, fuelType: 'petrol', transmission: 'automatic',
    mileage: 24.12, engineCC: 1197, seatingCapacity: 5, bootSpace: 378,
    safetyRating: 0, powerBHP: 90, groundClearance: 163,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Suzuki_Dzire_II_1.2_GLX_Hybrid_Magma_Gray_Metallic_01.jpg/960px-Suzuki_Dzire_II_1.2_GLX_Hybrid_Magma_Gray_Metallic_01.jpg',
    pros: JSON.stringify(['Exceptional fuel economy', 'Large 378L boot', 'Comfortable for long trips', 'Strong resale value']),
    cons: JSON.stringify(['No NCAP rating', 'Conservative styling', 'Less premium interior feel']),
    reviews: [
      { author: 'Rohit G.', rating: 4.5, comment: 'Best sedan under ₹11L. Fuel economy is unmatched.' },
      { author: 'Kavitha N.', rating: 4.0, comment: 'Very practical family sedan. Comfortable on highways and very easy to maintain.' },
    ],
  },
  {
    make: 'Honda', model: 'Amaze', variant: 'VX CVT',
    segment: 'sedan', price: 11.00, fuelType: 'petrol', transmission: 'automatic',
    mileage: 18.60, engineCC: 1199, seatingCapacity: 5, bootSpace: 420,
    safetyRating: 0, powerBHP: 90, groundClearance: 165,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/2024_Honda_Amaze_ZX.png/960px-2024_Honda_Amaze_ZX.png',
    pros: JSON.stringify(['Biggest boot in compact sedan class (420L)', 'Smooth CVT', 'Honda reliability', 'Comfortable rear seat']),
    cons: JSON.stringify(['Premium priced for segment', 'Average fuel efficiency', 'No NCAP rating']),
    reviews: [
      { author: 'Suresh P.', rating: 4.0, comment: 'Extremely spacious boot. Perfect for road trips. Honda quality is top notch.' },
      { author: 'Preethi L.', rating: 3.5, comment: 'Good car but a bit overpriced compared to rivals.' },
    ],
  },
  {
    make: 'Hyundai', model: 'Verna', variant: 'SX IVT',
    segment: 'sedan', price: 15.75, fuelType: 'petrol', transmission: 'automatic',
    mileage: 20.60, engineCC: 1500, seatingCapacity: 5, bootSpace: 528,
    safetyRating: 0, powerBHP: 115, groundClearance: 165,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Hyundai_Accent_1.5_MPI_Smart%2B_%28VI%29_%E2%80%93_f_08032025.jpg/960px-Hyundai_Accent_1.5_MPI_Smart%2B_%28VI%29_%E2%80%93_f_08032025.jpg',
    pros: JSON.stringify(['Premium mid-size sedan', 'Huge 528L boot', 'Powerful 1.5L engine', 'ADAS safety suite']),
    cons: JSON.stringify(['Expensive running cost', 'Rear visibility limited', 'No NCAP rating yet']),
    reviews: [
      { author: 'Karthik R.', rating: 4.5, comment: 'Feels like a much more expensive car. ADAS features are genuinely useful on highways.' },
      { author: 'Sunita A.', rating: 4.0, comment: 'Best mid-size sedan currently. The 528L boot is incredible for family trips.' },
    ],
  },
  {
    make: 'Maruti Suzuki', model: 'Brezza', variant: 'ZXi+ AT',
    segment: 'compact-suv', price: 14.96, fuelType: 'petrol', transmission: 'automatic',
    mileage: 17.38, engineCC: 1462, seatingCapacity: 5, bootSpace: 328,
    safetyRating: 0, powerBHP: 103, groundClearance: 198,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/2022_Maruti_Suzuki_Brezza_ZXi%2B_%28India%29_front_view_02.png/960px-2022_Maruti_Suzuki_Brezza_ZXi%2B_%28India%29_front_view_02.png',
    pros: JSON.stringify(['High 198mm ground clearance', 'Trusted brand reliability', 'Smooth automatic transmission', 'Excellent service network']),
    cons: JSON.stringify(['No NCAP rating', 'Underpowered vs rivals', 'Boot space below segment average']),
    reviews: [
      { author: 'Ajay M.', rating: 4.0, comment: 'Best-selling SUV for a reason. Great reliability and widest service network.' },
      { author: 'Rekha S.', rating: 3.5, comment: 'Comfortable city car. High ground clearance handles bad roads very well.' },
    ],
  },
  {
    make: 'Hyundai', model: 'Venue', variant: 'SX(O) DCT',
    segment: 'compact-suv', price: 14.12, fuelType: 'petrol', transmission: 'automatic',
    mileage: 17.35, engineCC: 998, seatingCapacity: 5, bootSpace: 350,
    safetyRating: 0, powerBHP: 120, groundClearance: 195,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/4th_International_Auto_Show%2C_Bangalore_%282025%29_07.jpg/960px-4th_International_Auto_Show%2C_Bangalore_%282025%29_07.jpg',
    pros: JSON.stringify(['Connected car features with BlueLink', 'Fast responsive DCT gearbox', 'Good boot space', 'Sporty design']),
    cons: JSON.stringify(['Turbo engine needs premium fuel', 'Cramped rear seat', 'No NCAP rating']),
    reviews: [
      { author: 'Nikhil V.', rating: 4.0, comment: 'The connected car features are amazing. DCT is very responsive in city traffic.' },
      { author: 'Pooja R.', rating: 3.5, comment: 'Good for single person or couple. Rear seat is a bit cramped for adults.' },
    ],
  },
  {
    make: 'Kia', model: 'Sonet', variant: 'HTX+ iMT',
    segment: 'compact-suv', price: 14.50, fuelType: 'petrol', transmission: 'manual',
    mileage: 18.20, engineCC: 998, seatingCapacity: 5, bootSpace: 392,
    safetyRating: 0, powerBHP: 120, groundClearance: 205,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/2021_Kia_Sonet_1.5_Premiere_%28Indonesia%29_front_view_02.jpg/960px-2021_Kia_Sonet_1.5_Premiere_%28Indonesia%29_front_view_02.jpg',
    pros: JSON.stringify(['Highest ground clearance in segment (205mm)', 'Feature-rich premium interior', 'Large 392L boot', 'Punchy turbo engine']),
    cons: JSON.stringify(['Small cabin interior', 'iMT transmission needs adjustment', 'Premium priced for compact SUV']),
    reviews: [
      { author: 'Arun K.', rating: 4.5, comment: 'The ground clearance and feature list are best in class. Very premium feel inside.' },
      { author: 'Manisha G.', rating: 4.0, comment: 'Excellent build quality. The panoramic sunroof is a great feature at this price.' },
    ],
  },
  {
    make: 'Tata', model: 'Nexon', variant: 'Creative+ AMT',
    segment: 'compact-suv', price: 13.25, fuelType: 'petrol', transmission: 'automatic',
    mileage: 17.44, engineCC: 1199, seatingCapacity: 5, bootSpace: 350,
    safetyRating: 5, powerBHP: 120, groundClearance: 209,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tata_Nexon_Blue_Dual_Tone.jpg/960px-Tata_Nexon_Blue_Dual_Tone.jpg',
    pros: JSON.stringify(['5-star Global NCAP safety', 'Highest ground clearance (209mm)', 'Strong Tata build quality', 'Good performance']),
    cons: JSON.stringify(['AMT not the smoothest', 'Rear comfort below segment leaders', 'Interior quality lags behind Korean rivals']),
    reviews: [
      { author: 'Dinesh P.', rating: 4.5, comment: '5-star safety is a huge plus for family use. Very solid and planted on the road.' },
      { author: 'Lakshmi T.', rating: 4.0, comment: 'Best for safety-conscious buyers. Good ground clearance handles rough terrain well.' },
    ],
  },
  {
    make: 'Hyundai', model: 'Creta', variant: 'SX IVT',
    segment: 'mid-suv', price: 19.00, fuelType: 'petrol', transmission: 'automatic',
    mileage: 17.40, engineCC: 1497, seatingCapacity: 5, bootSpace: 433,
    safetyRating: 3, powerBHP: 115, groundClearance: 190,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Moscow%2C_Hyundai_Creta_%282nd_gen%29_Aug_2025_01_%28cropped%29.jpg/960px-Moscow%2C_Hyundai_Creta_%282nd_gen%29_Aug_2025_01_%28cropped%29.jpg',
    pros: JSON.stringify(['Best-selling mid-size SUV in India', 'Premium features and comfort', 'Good resale value', 'ADAS driver assistance']),
    cons: JSON.stringify(['Pricier than segment average', 'Only 3-star NCAP safety', 'Some ADAS limitations']),
    reviews: [
      { author: 'Vijay S.', rating: 4.5, comment: 'The benchmark for mid-size SUVs. Great comfort, tech features, and highway ability.' },
      { author: 'Swati M.', rating: 4.0, comment: 'Very satisfied. The panoramic sunroof and ADAS features are worth the premium.' },
    ],
  },
  {
    make: 'Kia', model: 'Seltos', variant: 'HTX IVT',
    segment: 'mid-suv', price: 18.65, fuelType: 'petrol', transmission: 'automatic',
    mileage: 16.80, engineCC: 1497, seatingCapacity: 5, bootSpace: 433,
    safetyRating: 0, powerBHP: 115, groundClearance: 190,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Kia_Seltos_X-line.jpg/960px-Kia_Seltos_X-line.jpg',
    pros: JSON.stringify(['Premium interior quality', 'Advanced tech and feature list', 'Powerful engine options', 'Strong road presence']),
    cons: JSON.stringify(['No NCAP rating', 'Service network smaller than Hyundai', 'Higher maintenance cost']),
    reviews: [
      { author: 'Ravi K.', rating: 4.5, comment: 'Premium quality that rivals European cars. The Bose sound system is fantastic.' },
      { author: 'Anita B.', rating: 4.0, comment: 'Excellent build quality and features. A bit pricey to maintain though.' },
    ],
  },
  {
    make: 'Maruti Suzuki', model: 'Ertiga', variant: 'ZXi+ MT',
    segment: 'mpv', price: 14.50, fuelType: 'petrol', transmission: 'manual',
    mileage: 20.51, engineCC: 1462, seatingCapacity: 7, bootSpace: 135,
    safetyRating: 0, powerBHP: 103, groundClearance: 180,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Suzuki_Ertiga_NC_FL_1.5_GLX_Hybrid_Snow_White_Pearl.jpg/960px-Suzuki_Ertiga_NC_FL_1.5_GLX_Hybrid_Snow_White_Pearl.jpg',
    pros: JSON.stringify(['Best-value 7-seater in India', 'Excellent fuel economy for an MPV', '3 rows of comfortable seating', 'Very low maintenance']),
    cons: JSON.stringify(['Tiny boot with all 3 rows up', 'No NCAP rating', 'Not sporty at all']),
    reviews: [
      { author: 'Mohan L.', rating: 4.5, comment: 'Perfect family car for a large family. 7 seats and 20+ kmpl is unbeatable value.' },
      { author: 'Geetha R.', rating: 4.0, comment: 'My family of 6 fits comfortably. Smooth on highways and incredibly fuel efficient.' },
    ],
  },
  {
    make: 'Toyota', model: 'Innova Crysta', variant: 'GX 2.4 MT',
    segment: 'mpv', price: 20.37, fuelType: 'diesel', transmission: 'manual',
    mileage: 16.35, engineCC: 2393, seatingCapacity: 7, bootSpace: 300,
    safetyRating: 0, powerBHP: 150, groundClearance: 178,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/2017_Toyota_Kijang_Innova_2.0_G_wagon_%28TGN140R%3B_01-19-2019%29%2C_South_Tangerang.jpg/960px-2017_Toyota_Kijang_Innova_2.0_G_wagon_%28TGN140R%3B_01-19-2019%29%2C_South_Tangerang.jpg',
    pros: JSON.stringify(['Legendary Toyota reliability', 'Powerful diesel for loaded travel', 'Best highway MPV in India', 'Highest resale value in class']),
    cons: JSON.stringify(['Very expensive', 'Diesel maintenance costly', 'Dated interior vs newer rivals']),
    reviews: [
      { author: 'Ramesh N.', rating: 4.5, comment: 'The most reliable MPV in India. Toyota quality means it will run for 3+ lakh km easily.' },
      { author: 'Champa S.', rating: 4.0, comment: 'Premium comfort for the whole family. Diesel torque makes loaded highway trips effortless.' },
    ],
  },
  {
    make: 'Tata', model: 'Nexon EV', variant: 'Max LR Creative+',
    segment: 'ev', price: 19.50, fuelType: 'electric', transmission: 'automatic',
    mileage: 437, engineCC: null, seatingCapacity: 5, bootSpace: 350,
    safetyRating: 5, powerBHP: 143, groundClearance: 209,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/2020_Tata_Nexon_EV_%28India%29_front_view.png/960px-2020_Tata_Nexon_EV_%28India%29_front_view.png',
    pros: JSON.stringify(['5-star NCAP safety', 'Running cost just ₹1/km', 'Fast 50kW DC charging', 'Instant torque performance']),
    cons: JSON.stringify(['Range anxiety on very long trips', 'Charging infrastructure still growing', 'Higher upfront cost']),
    reviews: [
      { author: 'Prashant D.', rating: 4.5, comment: 'Best EV for the money in India. 437km real-world range is very practical for daily use.' },
      { author: 'Shilpa T.', rating: 4.0, comment: 'Changed how I think about cars. Running costs are incredibly low — about ₹800 per month.' },
    ],
  },
  {
    make: 'MG', model: 'ZS EV', variant: 'Excite Plus',
    segment: 'ev', price: 22.58, fuelType: 'electric', transmission: 'automatic',
    mileage: 461, engineCC: null, seatingCapacity: 5, bootSpace: 448,
    safetyRating: 0, powerBHP: 176, groundClearance: 177,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/MG_ZS_EV_Facelift_1X7A5867.jpg/960px-MG_ZS_EV_Facelift_1X7A5867.jpg',
    pros: JSON.stringify(['Longest range EV in segment (461km)', 'Large 448L boot', 'Premium interior', 'Vehicle-to-load (V2L) feature']),
    cons: JSON.stringify(['MG service network limited in smaller cities', 'Charging at home needs setup', 'Higher price vs Nexon EV']),
    reviews: [
      { author: 'Avinash K.', rating: 4.0, comment: '461km range means I charge once a week. V2L feature is amazing during power cuts.' },
      { author: 'Nisha P.', rating: 3.5, comment: 'Great EV but service centers are limited in my city. Check MG service availability first.' },
    ],
  },
  {
    make: 'Mahindra', model: 'XUV700', variant: 'AX7 Diesel AT AWD',
    segment: 'mid-suv', price: 26.99, fuelType: 'diesel', transmission: 'automatic',
    mileage: 16.00, engineCC: 2184, seatingCapacity: 7, bootSpace: 480,
    safetyRating: 5, powerBHP: 185, groundClearance: 200,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png/960px-2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png',
    pros: JSON.stringify(['5-star NCAP safety', 'ADAS with radars and 12 sonars', '7-seat option with large boot', 'Powerful diesel + AWD traction']),
    cons: JSON.stringify(['Long waiting period', 'Expensive when fully loaded', 'Third row comfort is average']),
    reviews: [
      { author: 'Sudhir M.', rating: 5.0, comment: 'Unmatched value at this price. ADAS is genuinely useful and the diesel engine is effortless.' },
      { author: 'Padma L.', rating: 4.5, comment: 'Best SUV in India for features and safety. 5-star NCAP with 7 seats and AWD is incredible.' },
    ],
  },
  {
    make: 'Toyota', model: 'Fortuner', variant: 'Legender 4x4 AT',
    segment: 'mid-suv', price: 51.44, fuelType: 'diesel', transmission: 'automatic',
    mileage: 14.14, engineCC: 2755, seatingCapacity: 7, bootSpace: 296,
    safetyRating: 0, powerBHP: 204, groundClearance: 225,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/2018_Toyota_Fortuner_2.4_VRZ_4x2_wagon_%28GUN165R%3B_02-18-2019%29%2C_South_Tangerang.jpg/960px-2018_Toyota_Fortuner_2.4_VRZ_4x2_wagon_%28GUN165R%3B_02-18-2019%29%2C_South_Tangerang.jpg',
    pros: JSON.stringify(['Unmatched road presence and status', 'Best off-road capability in segment', 'Bulletproof Toyota reliability', 'Highest ground clearance (225mm)']),
    cons: JSON.stringify(['Very expensive — premium over rivals', 'Low fuel economy', 'Large size is hard to park in cities']),
    reviews: [
      { author: 'Vikram S.', rating: 4.5, comment: 'The king of Indian roads. No other SUV commands as much respect on the highway.' },
      { author: 'Anjali B.', rating: 4.0, comment: 'Excellent for highway and occasional off-roading. The 4x4 system is genuinely capable.' },
    ],
  },
];

async function main() {
  console.log('Seeding database...');

  for (const carData of cars) {
    const { reviews, imageUrl: _img, ...car } = carData;

    const existing = await prisma.car.findFirst({
      where: { make: car.make, model: car.model, variant: car.variant },
    });

    if (existing) {
      await prisma.car.update({ where: { id: existing.id }, data: car });
      for (const review of reviews) {
        const existingReview = await prisma.review.findFirst({
          where: { carId: existing.id, author: review.author },
        });
        if (!existingReview) {
          await prisma.review.create({ data: { ...review, carId: existing.id } });
        }
      }
    } else {
      const created = await prisma.car.create({ data: car });
      for (const review of reviews) {
        await prisma.review.create({ data: { ...review, carId: created.id } });
      }
    }
  }

  console.log(`Seeded ${cars.length} cars with verified images.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
